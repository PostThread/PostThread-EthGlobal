// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract User is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

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
    }

    event userMinted(UserStruct user);
    event followHappened(UserStruct user);
    event unFollowHappened(UserStruct user);
    UserStruct[] public users;

    uint256 usernameCount;
    mapping(bytes32 => UserStruct) public hashToUser;
    mapping(string => bytes32) public usernameToHash;

    constructor() ERC721("User", "USR") {}

    function safeMint(address to) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        return tokenId;
    }

    function mintUser(string memory username) public {
        uint256 tokenId = safeMint(msg.sender);
        bytes32 hash = keccak256(abi.encode(username));
        bytes32[] memory temp;
        UserStruct memory user = UserStruct(
            block.number,
            tokenId,
            username,
            hash,
            temp,
            temp,
            0,
            0,
            0,
            0
        );
        users.push(user);
        hashToUser[hash] = user;
        usernameToHash[username] = hash;
        usernameCount++;
        emit userMinted(user);
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
}
