// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721Sendable.sol";
import { ByteHasher } from './ByteHasher.sol';
import { ISemaphore } from './ISemaphore.sol';
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract User is ERC721, ERC721Burnable, ERC721Sendable, AccessControl {
    using ByteHasher for bytes;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    /// @dev The Semaphore instance that will be used for managing groups and verifying proofs
    ISemaphore internal immutable semaphore;
    /// @dev The Semaphore group ID whose participants can claim this airdrop
    uint256 internal immutable groupId;
    mapping(uint256 => bool) internal nullifierHashes;
    event ProofVerified(uint groupId, bytes32 signal);
    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    struct UserStruct {
        uint256 userId;
        uint256 blockMinted;
        string username;
        uint[] followers;
        uint[] following;
        uint256 totalUpvotes;
        uint256 totalDownvotes;
        uint256 dailyQuest;
        uint256 experience;
        uint256 level;
        uint256 expToNextLvl;
        uint256 captureRate;
        // Centralities combine to determine a multiplier for the user
        // Degree is how many followers a user has
        uint256 degreeCentrality;
        // farness is how far away each user its connected to is
        uint256 farnessCentrality;
        // betweenness is how much a user connects their following to their followers
        uint256 betweennessCentrality;
    }

    // Users receive exp rewards for completing certain tasks
    struct Rewards {
        uint worldID;
        uint email;
        uint twoStepVerification;
        uint postVote;
        uint commentVote;
        uint daoVote;
    }

    struct ShortestPath {
        uint size;
        uint[] prev;
    }

    event userEvent(UserStruct user, address sender);

    // events used for testing    
    event centralitiesUpdated(uint userIdStarting, uint userIdCurrent, uint userIdFollower, ShortestPath SP);
    event fired(uint iter);
    event betweennessUpdate(uint iter, uint userId, uint newBetweenness);
    event printStartCurrent(uint startingUserId, uint currentUserId, uint followerUserId, uint depth, uint p);

    uint public numNodes;
    uint public numDigits = 10**(9-1);
    mapping(uint => UserStruct) public userIdToUser;
    mapping(address => uint) public numUsersMinted;
    uint public maxMintsPerWallet = 1;
    Rewards public rewards;

    // mapping to be used when graphing
    mapping(uint => mapping(uint => ShortestPath)) public shortestPath;
    mapping(uint => mapping(uint => bool)) public prevFollowingUsers;
    mapping(uint => mapping(uint => mapping(uint => mapping(uint => uint)))) public prevFollowerUsersDepth;
    uint public prevFollowingIter;
    uint public prevFollowerIter;

    // constructor(ISemaphore _semaphore) ERC721("User", "USR") {
    constructor(ISemaphore _semaphore) ERC721("User", "USR") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _tokenIdCounter.increment();
        
        semaphore = _semaphore;
        groupId = 1;
        
        rewards = Rewards(1000, 100, 100, 1, 1, 5);
    }

    // Overrides interface
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function grantMinterRole(address minter) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, minter);
    }

    function safeMint(address to) internal returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        return tokenId;
    }

    function mintUser(string memory username, address sender) public onlyRole(MINTER_ROLE) {
        // require(
        //     numUsersMinted[to] < maxMintsPerWallet, 
        //     "You have minted the max amount of profiles!"
        // );
        uint256 tokenId = safeMint(sender);
        uint[] memory emptyFollow;
        UserStruct memory user = UserStruct(
            tokenId, block.number, username, emptyFollow, emptyFollow, 
            0, 0, 0, 0, 83, 100, 0, 0, 0, 0
        );
        userIdToUser[tokenId] = user;
        numUsersMinted[sender]++;
        emit userEvent(user, sender);
    }

    function getUser(uint userId) public view returns(UserStruct memory) {
        UserStruct memory user = userIdToUser[userId];
        return user;
    }

    function setMaxMintsPerWallet(uint newMax) public onlyRole(DEFAULT_ADMIN_ROLE) {
        maxMintsPerWallet = newMax;
    }

    function calculateCentralityValues(
            uint startingUserId, uint currentUserId, uint followerUserId, uint depth
        ) public returns(bool) {

        // if (startingUserId == 5 && currentUserId == 2) {
        //     uint p = prevFollowerUsersDepth[prevFollowerIter][startingUserId][currentUserId][followerUserId];
        //     emit printStartCurrent(startingUserId, currentUserId, followerUserId, depth, p);
        // }

        // If we have already encountered this user then move on
        uint p = prevFollowerUsersDepth[prevFollowerIter][startingUserId][currentUserId][followerUserId];
        if (p != 0 && depth >= p) {
            return true;
        }
        if (startingUserId == followerUserId || startingUserId == currentUserId) {
            prevFollowerUsersDepth[prevFollowerIter][startingUserId][currentUserId][followerUserId] = depth;
            return true;
        }

        prevFollowerUsersDepth[prevFollowerIter][startingUserId][currentUserId][followerUserId] = depth;

        ShortestPath memory SP = shortestPath[startingUserId][followerUserId];
        // If shortest path has been found before and its shorter then move on
        if (SP.size != 0 && SP.size < depth) {
            return false;
        }

        if (SP.size == 0) {
            // we found our first shortest path
            userIdToUser[startingUserId].farnessCentrality += depth;
            shortestPath[startingUserId][followerUserId].size = depth;
            shortestPath[startingUserId][followerUserId].prev.push(currentUserId);
            if (depth > 1) {
                userIdToUser[currentUserId].betweennessCentrality += (numDigits / (SP.prev.length + 1));
                // emit betweennessUpdate(0, currentUserId, userIdToUser[currentUserId].betweennessCentrality);
            }
        } else if (SP.size == depth) {
            // we have a tie for shortest path so betweenness gets shared
            if (depth > 1) {
                bool stop = false;
                for (uint256 i; i < SP.prev.length; i++) {
                    if (SP.prev[i] == currentUserId) {
                        stop = true;
                    }
                }
                
                if (!stop) {
                    uint oldBetweenness = (numDigits / SP.prev.length);
                    uint newBetweenness = (numDigits / (SP.prev.length + 1));
                    userIdToUser[currentUserId].betweennessCentrality += newBetweenness;
                    // emit betweennessUpdate(1, currentUserId, userIdToUser[currentUserId].betweennessCentrality);
                    for (uint256 i; i < SP.prev.length; i++) {
                        userIdToUser[SP.prev[i]].betweennessCentrality -= oldBetweenness;
                        userIdToUser[SP.prev[i]].betweennessCentrality += newBetweenness;
                        // emit betweennessUpdate(1, SP.prev[i], userIdToUser[SP.prev[i]].betweennessCentrality);
                    }
                    shortestPath[startingUserId][followerUserId].size = depth;
                    shortestPath[startingUserId][followerUserId].prev.push(currentUserId);
                }
            }
        } else if (SP.size > depth) {
            // We've found a new shortest path
            userIdToUser[startingUserId].farnessCentrality -= SP.size * numDigits;
            userIdToUser[startingUserId].farnessCentrality += depth * numDigits;

            uint oldBetweenness = (numDigits / SP.prev.length);
            userIdToUser[currentUserId].betweennessCentrality += numDigits;
            // emit betweennessUpdate(2, currentUserId, userIdToUser[currentUserId].betweennessCentrality);
            for (uint256 i; i < SP.prev.length; i++) {
                userIdToUser[SP.prev[i]].betweennessCentrality -= oldBetweenness;
                // emit betweennessUpdate(2, SP.prev[i], userIdToUser[SP.prev[i]].betweennessCentrality);
            }
            delete shortestPath[startingUserId][followerUserId].prev;
            shortestPath[startingUserId][followerUserId].size = depth;
            shortestPath[startingUserId][followerUserId].prev.push(currentUserId);
        } 
        // emit centralitiesUpdated(startingUserId, currentUserId, followerUserId, shortestPath[startingUserId][followerUserId]);
        return false;
    }

    function updateCentrality(uint startingUserId, uint currentUserId, uint depth) public { 
        UserStruct memory user = userIdToUser[currentUserId];
        // if (startingUserId == 5 && currentUserId == 2) {
        //     printStartCurrent(user);
        // }
        if (depth == 1) {
            calculateCentralityValues(startingUserId, currentUserId, currentUserId, 1);
        }
        if (user.followers.length > 0) {
            for (uint256 i; i < user.followers.length; i++) {
                // if (startingUserId == 5 && currentUserId == 2) {
                //     printStartFollower(user, userIdToUser[currentUserId]);
                // }
                bool done = calculateCentralityValues(startingUserId, currentUserId, user.followers[i], depth + 1);

                if (!done) {
                    // Run recursions for this user and starting user
                    updateCentrality(currentUserId, user.followers[i], 1);
                    updateCentrality(startingUserId, user.followers[i], depth + 1);
                }
            }
        } else if (depth == 1) {
            // calculateCentralityValues(startingUserId, currentUserId, currentUserId, depth);
        }
    }

    function updateFromFollowHead(uint userId) public {
        // Gets you to top of following tree
        UserStruct memory user = userIdToUser[userId];

        prevFollowingUsers[prevFollowingIter][userId] = true;
        
        if (user.following.length > 0) {
            for (uint256 i; i < user.following.length; i++) {
                // once at top start going down tree starting at following
                if (!prevFollowingUsers[prevFollowingIter][user.following[i]]) {
                    updateFromFollowHead(user.following[i]);
                } else {
                    updateCentrality(user.following[i], userId, 1);
                }
            }
        } else {
            for (uint256 i; i < user.followers.length; i++) {
                updateCentrality(userId, user.followers[i], 1);
            }
        }
    }

    function follow( 
            uint userIdProtagonist, 
            uint userIdAntagonist,
            address sender
        ) public onlyRole(MINTER_ROLE) {
        UserStruct memory user = userIdToUser[userIdProtagonist];
        uint followingLength = userIdToUser[userIdProtagonist].following.length;
        for (uint256 i; i < followingLength; i++) {
            require(userIdAntagonist != user.following[i], "You already follow this user");
        }
        // If this is a users first follow it becomes a node in the graph
        if (followingLength == 0) {
            numNodes++;
        }
        userIdToUser[userIdProtagonist].following.push(userIdAntagonist);
        userIdToUser[userIdAntagonist].followers.push(userIdProtagonist);

        // update followers (and thier followers etc) centralities
        userIdToUser[userIdAntagonist].degreeCentrality += numDigits;

        // go up following branches until you reach head
        // updateFromFollowHead(userIdAntagonist);
        prevFollowerIter++;
        prevFollowingIter++;
        emit userEvent(userIdToUser[userIdProtagonist], sender);
    }

    function unFollow(
            uint userIdProtagonist,
            uint userIdAntagonist, 
            address sender
        ) public onlyRole(MINTER_ROLE) {
        UserStruct memory user = userIdToUser[userIdProtagonist];
        uint256 l = user.following.length;
        bool unfollowed;
        for (uint256 i; i < l; i++) {
            if (user.following[i] == userIdAntagonist) {
                userIdToUser[userIdProtagonist].following[i] = userIdToUser[
                    userIdProtagonist
                ].following[l - 1];
                userIdToUser[userIdProtagonist].following.pop();
                unfollowed = true;
                break;
            }
        }
        require(unfollowed, "You have not followed this user");
        uint followersAfter = userIdToUser[userIdProtagonist].following.length;
        emit userEvent(userIdToUser[userIdProtagonist], sender);
    }

    function getsCentralitiesNormalized(uint userId) public view returns(uint[3] memory) {
        uint[3] memory result = [uint(0), uint(0), uint(0)];
        if (numNodes == 0) {
            return result;
        }
        // These are numbers between 0 and 1 so multiply by numDigits
        UserStruct memory user = userIdToUser[userId];
        uint degree = user.degreeCentrality / (numNodes * numDigits);
        uint closeness = 0;
        if (user.farnessCentrality != 0) {
            closeness = ((numNodes - 1) * numDigits) / (user.farnessCentrality);
        }
        uint betweenness = 0;
        if (numNodes > 2) {
            betweenness = user.betweennessCentrality / ((numNodes-1) * (numNodes - 2) * numDigits) ;
        }
        result = [degree, closeness, betweenness];
        return result;
    }

    function getCentralityScore(uint userId) public view returns(uint) {
        // take weighted average of centralities with weights higher for smaller numbers
        // this is because we want all centralities to be similar to each other
        uint256[3] memory centralities = getsCentralitiesNormalized(userId);
        uint256[3] memory weights = [uint(1), uint(1), uint(1)];
        if (centralities[0] < centralities[1]) {weights[0]++;} else {weights[1]++;}
        if (centralities[0] < centralities[2]) {weights[0]++;} else {weights[2]++;}
        if (centralities[1] < centralities[2]) {weights[1]++;} else {weights[2]++;}

        uint result;
        for (uint256 i; i < 3; i++) {
            result += centralities[i] * weights[i];
        }

        return result / 6;
    }

    function addExp(uint exp, uint userId, address sender) public { //onlyRole(MINTER_ROLE) onlySender(userId, sender) {
        /* 
        Adds exp to user and checks if they have increased their level
        Levels are calculated using Runescapes leveling, which requires
        10.4% more exp each level
        */ 
        UserStruct memory user = userIdToUser[userId];
        user.experience += exp;
        if (user.experience >= user.expToNextLvl) {
            user.level++;
            user.expToNextLvl += (user.expToNextLvl * uint(1104)) / uint(1000);
        }
        userIdToUser[userId] = user;
        emit userEvent(user, sender);
    }    
    
    // For world ID
    function claim(
        address receiver,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
    // ) public onlyRole(MINTER_ROLE) onlySender(userId, receiver) {
        /*
        This function is called by JS dapp. 
        If verification passes, then the user is awarded exp
        */
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();
        semaphore.verifyProof(
            root,
            groupId,
            abi.encodePacked(receiver).hashToField(),
            nullifierHash,
            abi.encodePacked(address(this)).hashToField(),
            proof
        );

        nullifierHashes[nullifierHash] = true;
        addExp(rewards.worldID, 1, receiver);
    }

    function changeRewards(Rewards memory _rewards) public onlyRole(DEFAULT_ADMIN_ROLE) {
        rewards = _rewards;
    }

    function getLevelAndExpNeeded(uint userId) public view returns(uint, uint) {
        UserStruct memory user = userIdToUser[userId];
        return (user.level, user.expToNextLvl);
    }

    function getScore(uint userId) public view returns(uint) {
        // uint centralityScore = getCentralityScore(userId);
        uint centralityScore = 5 * numDigits / 10;
        uint userLevel = userIdToUser[userId].level;
        uint userCaptureRate = userIdToUser[userId].captureRate;

        return (userLevel * centralityScore * userCaptureRate) / numDigits / 100;
    }

    function setUserQuest(uint userId, uint questId) public onlyRole(MINTER_ROLE) {
        userIdToUser[userId].dailyQuest = questId;
    }

    function getUserQuest(uint userId) public view returns(uint) {
        return userIdToUser[userId].dailyQuest;
    }
}
