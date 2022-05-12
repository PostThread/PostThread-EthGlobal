// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
    
struct UserStruct {
    uint256 blockNumber;
    uint256 tokenId;
    string username;
    bytes32 hash;
    bytes32[] followers;
    bytes32[] following;
    uint256 numPosts;
    uint256 numComments;
    uint256 totalUpvotes;
    uint256 totalDownvotes;
    bytes32[] stakedHashes;
    uint weight;
    uint captureRate;
}

contract User is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    event userMinted(UserStruct user);
    event followHappened(UserStruct user);
    event unFollowHappened(UserStruct user);

    uint256 usernameCount;
    mapping(bytes32 => UserStruct) public hashToUser;
    mapping(string => bytes32) public usernameToHash;
    mapping(address => uint) public userMinted;
    uint maxMintsPerWallet = 1;

    constructor() ERC721("User", "USR") {}

    function safeMint(address to) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        return tokenId;
    }

    function mintUser(string memory username) public {
        require(
            userMinted[msg.sender] < maxMintsPerWallet, 
            "You have minted the max amount of profiles!"
        );
        uint256 tokenId = safeMint(msg.sender);
        bytes32 hash = keccak256(abi.encode(username));
        bytes32[] memory temp;
        UserStruct memory user = UserStruct(
            block.number, tokenId, username, hash, temp, temp, 
            0, 0, 0, 0, temp, 1000000000, 1000000000
        );
        hashToUser[hash] = user;
        usernameToHash[username] = hash;
        usernameCount++;
        userMinted[msg.sender]++;
        emit userMinted(user);
    }

    function setMaxMintsPerWallet(uint newMax) public onlyOwner {
        maxMintsPerWallet = newMax;
    }

    function follow(bytes32 hashToFollow, bytes32 hashThatFollowed) public {
        hashToUser[hashThatFollowed].following.push(hashToFollow);
        hashToUser[hashToFollow].followers.push(hashThatFollowed);
        emit followHappened(hashToUser[hashThatFollowed]);
    }

    function unFollow(bytes32 hashToUnFollowed, bytes32 hashThatUnFollowed)
        public
    {
        UserStruct memory user = hashToUser[hashThatUnFollowed];
        uint256 l = user.following.length;
        for (uint256 i; i < l; i++) {
            if (user.following[i] == hashToUnFollowed) {
                hashToUser[hashThatUnFollowed].following[i] = hashToUser[
                    hashThatUnFollowed
                ].following[l - 1];
                hashToUser[hashThatUnFollowed].following.pop();
                emit unFollowHappened(user);
            }
        }
    }

    function stake(bytes32 userHash, bytes32 stakeHash) public {
        hashToUser[userHash].stakedHashes.push(stakeHash);
    }

    function unstake(bytes32 userHash) public returns(bytes32[] memory) {
        UserStruct memory user = hashToUser[userHash];
        require(
            ownerOf(user.tokenId) == msg.sender, 
            "You do not own this profile"
        );
        bytes32[] memory temp;
        hashToUser[userHash].stakedHashes = temp;
        return user.stakedHashes;
    }
}
