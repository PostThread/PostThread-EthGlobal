// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Post is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct CommentStruct {
        bytes32 userHash;
        uint blockNumber;
        string text;
        string link;
        uint upvotes;
        uint downvotes;
        bytes32[] childCommentHeads;
        bytes32 hash;
    }

    struct PostStruct {
        bytes32 userHash;
        uint blockNumber;
        string subreddit;
        string text;
        string link;
        uint upvotes;
        uint downvotes;
        bytes32[] commentsHead;
        bytes32 hash;
    }    

    PostStruct[] public posts;
    // CommentStruct[] emptyComments;

    mapping(bytes32 => PostStruct) public hashToPost;
    mapping(bytes32 => CommentStruct) public hashToComment;
    mapping(bytes32 => uint) public userPostUpvoteCount;
    mapping(bytes32 => uint) public userPostDownvoteCount;
    
    event postMinted(PostStruct post);
    event upvoteHappened(PostStruct post);
    event downvoteHappened(PostStruct post);
    event commentCreated(CommentStruct comment);

    constructor() ERC721("Post", "PST") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function mintPost(bytes32 userHash, string memory subreddit, string memory text, string memory link) public {
        safeMint(msg.sender);
        bytes32 hash = keccak256(abi.encode(block.number, userHash));
        bytes32[] memory temp;
        PostStruct memory post = PostStruct(userHash, block.number, subreddit, text, link, 0, 0, temp, hash);
        hashToPost[hash] = post;
        posts.push(post);
        emit postMinted(post);
    }

    function upvote(bytes32 hash) public {
        require(userPostUpvoteCount[hash] == 0, "You have already upvoted this post");
        // Check if user has already downvoted this post
        if (userPostDownvoteCount[hash] != 0) {
            hashToPost[hash].downvotes--;
            userPostDownvoteCount[hash]--;
        }
        hashToPost[hash].upvotes++;
        userPostUpvoteCount[hash]++;
        emit upvoteHappened(hashToPost[hash]);
    }

    function downvote(bytes32 hash) public {
        require(userPostDownvoteCount[hash] == 0, "You have already downvoted this post");
        // Check if user has already upvoted this post
        if (userPostUpvoteCount[hash] != 0) {
            hashToPost[hash].upvotes--;
            userPostUpvoteCount[hash]--;
        }
        hashToPost[hash].downvotes++;
        userPostDownvoteCount[hash]++;
        emit downvoteHappened(hashToPost[hash]);
    }

    function commentOnPost(bytes32 usernameHash, string memory text, string memory link, bytes32 postHash) public {
        bytes32[] memory temp;
        bytes32 hash = keccak256(abi.encode(usernameHash, block.number, text, link));
        CommentStruct memory comment = CommentStruct(usernameHash, block.number, text, link, 0, 0, temp, hash);
        hashToComment[hash] = comment;
        hashToPost[postHash].commentsHead.push(hash);
        emit commentCreated(comment);
    }

    function commentOnComment(bytes32 usernameHash, string memory text, string memory link, bytes32 commentHash) public {
        bytes32[] memory temp;
        bytes32 hash = keccak256(abi.encode(usernameHash, block.number, text, link));
        CommentStruct memory comment = CommentStruct(usernameHash, block.number, text, link, 0, 0, temp, hash);
        hashToComment[hash] = comment;
        hashToComment[commentHash].childCommentHeads.push(hash);
        emit commentCreated(comment);
    }
}