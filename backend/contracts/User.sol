// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721Sendable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract User is ERC721, ERC721Burnable, ERC721Sendable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct UserStruct {
        uint256 userId;
        uint256 blockMinted;
        string username;
        uint[] followers;
        uint[] following;
        uint256 totalUpvotes;
        uint256 totalDownvotes;
        uint experience;
        uint level;
        uint expToNextLvl;
        uint captureRate;
        // Centralities combine to determine a multiplier for the user
        // Degree is how many followers a user has
        uint degreeCentrality;
        // farness is how far away each user its connected to is
        uint farnessCentrality;
        // betweenness is how much a user connects their following to their followers
        uint betweennessCentrality;
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

    event userMinted(UserStruct user, address sender);
    event followHappened(UserStruct user, address sender);
    event unFollowHappened(UserStruct user, address sender);
    event centralitiesUpdated(uint userIdStarting, uint userIdCurrent, uint userIdFollower, ShortestPath SP);
    event fired(uint iter);
    event betweennessUpdate(uint iter, uint userId, uint newBetweenness);
    event printStartCurrent(uint startingUserId, uint currentUserId, uint followerUserId, uint depth, uint p);

    uint public numNodes;
    uint public numDigits;
    uint256 public usernameCount;
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

    constructor() ERC721("User", "USR") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _tokenIdCounter.increment();
        
        rewards = Rewards(1000, 100, 100, 1, 1, 5);
        numDigits = 10**(9-1);
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

    function mintUser(string memory username, address to) public onlyRole(MINTER_ROLE) {
        // require(
        //     numUsersMinted[to] < maxMintsPerWallet, 
        //     "You have minted the max amount of profiles!"
        // );
        uint256 tokenId = safeMint(to);
        uint[] memory emptyFollow;
        UserStruct memory user = UserStruct(
            tokenId, block.number, username, emptyFollow, emptyFollow, 
            0, 0, 0, 0, 83, 100, 0, 0, 0
        );
        userIdToUser[tokenId] = user;
        usernameCount++;
        numUsersMinted[to]++;
        emit userMinted(user, to);
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
                emit betweennessUpdate(0, currentUserId, userIdToUser[currentUserId].betweennessCentrality);
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
                    emit betweennessUpdate(1, currentUserId, userIdToUser[currentUserId].betweennessCentrality);
                    for (uint256 i; i < SP.prev.length; i++) {
                        userIdToUser[SP.prev[i]].betweennessCentrality -= oldBetweenness;
                        userIdToUser[SP.prev[i]].betweennessCentrality += newBetweenness;
                        emit betweennessUpdate(1, SP.prev[i], userIdToUser[SP.prev[i]].betweennessCentrality);
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
            emit betweennessUpdate(2, currentUserId, userIdToUser[currentUserId].betweennessCentrality);
            for (uint256 i; i < SP.prev.length; i++) {
                userIdToUser[SP.prev[i]].betweennessCentrality -= oldBetweenness;
                emit betweennessUpdate(2, SP.prev[i], userIdToUser[SP.prev[i]].betweennessCentrality);
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
            uint userIdThatFollowed, 
            uint userIdToFollow,
            address sender
        ) public onlyRole(MINTER_ROLE) {
        UserStruct memory user = userIdToUser[userIdThatFollowed];
        uint followingLength = userIdToUser[userIdThatFollowed].following.length;
        for (uint256 i; i < followingLength; i++) {
            require(userIdToFollow != user.following[i], "You already follow this user");
        }
        // If this is a users first follow it becomes a node in the graph
        if (followingLength == 0) {
            numNodes++;
        }
        userIdToUser[userIdThatFollowed].following.push(userIdToFollow);
        userIdToUser[userIdToFollow].followers.push(userIdThatFollowed);

        // update followers (and thier followers etc) centralities
        userIdToUser[userIdToFollow].degreeCentrality += numDigits;

        // go up following branches until you reach head
        updateFromFollowHead(userIdToFollow);
        prevFollowerIter++;
        prevFollowingIter++;
        // emit followHappened(userIdToUser[userIdToFollow], sender);
    }

    function unFollow(
            uint userIdToUnFollowed, 
            uint userIdThatUnFollowed,
            address sender
        ) public onlyRole(MINTER_ROLE) {
        UserStruct memory user = userIdToUser[userIdThatUnFollowed];
        uint256 l = user.following.length;
        bool unfollowed;
        for (uint256 i; i < l; i++) {
            if (user.following[i] == userIdToUnFollowed) {
                userIdToUser[userIdThatUnFollowed].following[i] = userIdToUser[
                    userIdThatUnFollowed
                ].following[l - 1];
                userIdToUser[userIdThatUnFollowed].following.pop();
                unfollowed = true;
                break;
            }
        }
        require(unfollowed, "You have not followed this user");
        uint followersAfter = userIdToUser[userIdThatUnFollowed].following.length;
        emit unFollowHappened(userIdToUser[userIdThatUnFollowed], sender);
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
        uint betweenness = user.farnessCentrality / ((numNodes-1) * (numNodes - 2) * numDigits) ;
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

    function addExp(uint exp, uint userId, address sender) public onlyRole(MINTER_ROLE) onlySender(userId, sender) {
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
    }    
    
    // For world ID
    // function claim(
    //     uint userId,
    //     address sender,
    //     uint256 nullifierHash,
    //     uint256[8] calldata proof
    // ) public onlyRole(MINTER_ROLE) onlySender(userId, sender) {
    //     /*
    //     This function is called by JS dapp. 
    //     If verification passes, then the user is awarded exp
    //     */
    //     if (nullifierHashes[nullifierHash]) revert InvalidNullifier();
    //     semaphore.verifyProof(
    //         root,
    //         groupId,
    //         abi.encodePacked(receiver).hashToField(),
    //         nullifierHash,
    //         abi.encodePacked(address(this)).hashToField(),
    //         proof
    //     );

    //     nullifierHashes[nullifierHash] = true;

    //     SafeTransferLib.safeTransferFrom(token, holder, receiver, airdropAmount);


    // }

    function changeRewards(Rewards memory _rewards) public onlyRole(DEFAULT_ADMIN_ROLE) {
        rewards = _rewards;
    }

    function getLevel(uint userId) public view returns(uint) {
        return userIdToUser[userId].level;
    }

    function getScore(uint userId) public view returns(uint) {
        uint centralityScore = getCentralityScore(userId);
        uint userLevel = userIdToUser[userId].level;
        uint userCaptureRate = userIdToUser[userId].captureRate;

        return userLevel * centralityScore * userCaptureRate;
    }
}
