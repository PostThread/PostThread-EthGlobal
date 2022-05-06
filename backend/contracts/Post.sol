// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyToken is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct Post {
        uint256 block;
        string subreddit;
        string text;
        string link;
    }    
    
    event postMinted(uint256 block, string subreddit, string text, string link);
    Post[] public posts;

    mapping(string => address) public postToOwner;
    mapping(address => uint256) ownerPostCount;

    constructor() ERC721("Post", "PST") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function mintPost(string subreddit, string text, string link) {
        safeMint(msg.sender);
        posts.push(Post(block.number, subreddit, text, link));
        postToOwner[coor_str] = msg.sender;
        ownerPostCount[msg.sender]++;
        emit postMinted(block.number, subreddit, text, link);
    }
}