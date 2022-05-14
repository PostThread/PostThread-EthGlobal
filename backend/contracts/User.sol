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
        bytes32[] stakedHashes;
        uint weight;
        uint weightMultiplier;
        uint captureRate;
    }

    event userMinted(UserStruct user, address sender);
    event followHappened(UserStruct user, address sender);
    event unFollowHappened(UserStruct user, address sender);
    event userStaked(UserStruct user, address sender);
    event userUnstaked(UserStruct user, address sender);

    
    uint256 usernameCount;
    mapping(uint => UserStruct) public userIdToUser;
    mapping(address => uint) public numUsersMinted;
    uint maxMintsPerWallet = 1;

    constructor() ERC721("User", "USR") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _tokenIdCounter.increment();
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
        require(
            numUsersMinted[to] < maxMintsPerWallet, 
            "You have minted the max amount of profiles!"
        );
        uint256 tokenId = safeMint(to);
        bytes32[] memory emptyStake;
        uint[] memory emptyFollow;
        UserStruct memory user = UserStruct(
            tokenId, block.number, username, emptyFollow, emptyFollow, 
            0, 0, emptyStake, 1000000000, 1000000000, 1000000000
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

    function follow(
            uint userIdToFollow, 
            uint userIdThatFollowed, 
            address sender
        ) public onlyRole(MINTER_ROLE) onlySender(userIdThatFollowed, sender) {
        uint followersBefore = userIdToUser[userIdThatFollowed].following.length;
        userIdToUser[userIdThatFollowed].following.push(userIdToFollow);
        userIdToUser[userIdToFollow].followers.push(userIdThatFollowed);
        uint followersAfter = userIdToUser[userIdThatFollowed].following.length;
        emit followHappened(userIdToUser[userIdThatFollowed], sender);
    }

    function unFollow(
            uint userIdToUnFollowed, 
            uint userIdThatUnFollowed,
            address sender
        ) public onlyRole(MINTER_ROLE) onlySender(userIdThatUnFollowed, sender) {
        UserStruct memory user = userIdToUser[userIdThatUnFollowed];
        uint256 l = user.following.length;
        for (uint256 i; i < l; i++) {
            if (user.following[i] == userIdToUnFollowed) {
                userIdToUser[userIdThatUnFollowed].following[i] = userIdToUser[
                    userIdThatUnFollowed
                ].following[l - 1];
                userIdToUser[userIdThatUnFollowed].following.pop();
                break;
            }
        }
        uint followersAfter = userIdToUser[userIdThatUnFollowed].following.length;
        emit unFollowHappened(userIdToUser[userIdThatUnFollowed], sender);
    }

    function stake(uint userId, bytes32 stakeHash, address sender) public onlyRole(MINTER_ROLE) onlySender(userId, sender) {
        userIdToUser[userId].stakedHashes.push(stakeHash);
        emit userStaked(userIdToUser[userId], sender);
    }

    function unstake(uint userId, address sender) public onlyRole(MINTER_ROLE) onlySender(userId, sender) returns(bytes32[] memory) {
        UserStruct memory user = userIdToUser[userId];
        bytes32[] memory temp;
        userIdToUser[userId].stakedHashes = temp;
        emit userUnstaked(userIdToUser[userId], sender);
        return user.stakedHashes;
    }
}
