// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

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
    string category;
    string title;
    string text;
    string link;
    uint upvotes;
    uint downvotes;
    bytes32[] commentsHead;
    bytes32 hash;
} 

contract Post is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;   

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

    function mintPost(
            bytes32 userHash, 
            string memory category, 
            string memory title, 
            string memory text, 
            string memory link
        ) public {
        safeMint(msg.sender);
        bytes32 hash = keccak256(abi.encode(block.number, title, text, userHash));
        bytes32[] memory temp;
        PostStruct memory post = PostStruct(userHash, block.number, category, title, text, link, 0, 0, temp, hash);
        hashToPost[hash] = post;
        posts.push(post);
        emit postMinted(post);
    }

    function upvote(bytes32 postHash) public {
        require(userPostUpvoteCount[postHash] == 0, "You have already upvoted this post");
        // Check if user has already downvoted this post
        if (userPostDownvoteCount[postHash] != 0) {
            hashToPost[postHash].downvotes--;
            userPostDownvoteCount[postHash]--;
        }
        hashToPost[postHash].upvotes++;
        userPostUpvoteCount[postHash]++;
        emit upvoteHappened(hashToPost[postHash]);
    }

    function downvote(bytes32 postHash) public {
        require(userPostDownvoteCount[postHash] == 0, "You have already downvoted this post");
        // Check if user has already upvoted this post
        if (userPostUpvoteCount[postHash] != 0) {
            hashToPost[postHash].upvotes--;
            userPostUpvoteCount[postHash]--;
        }
        hashToPost[postHash].downvotes++;
        userPostDownvoteCount[postHash]++;
        emit downvoteHappened(hashToPost[postHash]);
    }

    function makeComment(
            bytes32 usernameHash, 
            string memory text, 
            string memory link, 
            bytes32 parentHash,
            bool onPost
        ) public {
        bytes32[] memory temp;
        bytes32 hash = keccak256(abi.encode(usernameHash, block.number, text, link));
        CommentStruct memory comment = CommentStruct(usernameHash, block.number, text, link, 0, 0, temp, hash);
        hashToComment[hash] = comment;
        if (onPost) {
            hashToPost[parentHash].commentsHead.push(hash);
        } else {
            hashToComment[parentHash].childCommentHeads.push(hash);
        }
        emit commentCreated(comment);
    }

    function getChildData(bytes32 commentHash, uint n) public view returns(string memory) {
        // Get hashes of all child comments and their children

        CommentStruct memory comment = hashToComment[commentHash];

        if (comment.childCommentHeads.length == 0) {
            return '';
        }
        
        bytes memory result = abi.encodePacked(', "comments', Strings.toString(n), '": [');
        for(uint i; i < comment.childCommentHeads.length; i++) {
            result = abi.encodePacked(
                result, '{"hash": ', 
                Strings.toHexString(uint256(comment.childCommentHeads[i])),  
                getChildData(comment.childCommentHeads[i], n+1),
                '}'
            );
        }
        result = abi.encodePacked(result, ']');
        return string(result);
    }

    function getPostData(bytes32 postHash) public view returns(string memory) {
        // Get hashes of all comments and their children on a post
        
        PostStruct memory post = hashToPost[postHash];
        
        bytes memory result = abi.encodePacked(
            '{"post": {', 
            '"hash": ',
            Strings.toHexString(uint256(post.hash)),
            ',',
            '"comments0": ['
        );
        for(uint i; i < post.commentsHead.length; i++) {
            result = abi.encodePacked(
                result, '{"hash": ', 
                Strings.toHexString(uint256(post.commentsHead[i])),  
                getChildData(post.commentsHead[i], 1),
                '}'
            );
        }
        result = abi.encodePacked(result, ']}}');
        return string(result);
    }

    function getPost(bytes32 postHash) public view returns(PostStruct memory) {
        return hashToPost[postHash];
    }

    function getComment(bytes32 commentHash) public view returns(CommentStruct memory) {
        return hashToComment[commentHash];
    }

    function getPostComments(bytes32 postHash) public view returns(bytes32[] memory) {
        return hashToPost[postHash].commentsHead;
    }

    function getCommentComments(bytes32 commentHash) public view returns(bytes32[] memory) {
        return hashToComment[commentHash].childCommentHeads;
    }

    function scorePost(bytes32 postHash) public returns(int) {
        // scores using the hot algorithm from reddit
        PostStruct memory post = hashToPost[postHash];
        // multiplier from 1 to 100 depending on what %age of tokens are staked in post
        // int multiplier = (stake.numTokens * 100) / totalStaked;
        // multiplier = multiplier > 1 ? multiplier : 1;
        int multiplier = 1;
        int s = (int(post.upvotes) - int(post.downvotes)) * multiplier;
        // order = log(max(abs(s), 1), 10);
        return s;
    }
}