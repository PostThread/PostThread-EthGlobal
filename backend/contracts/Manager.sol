// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Block.sol";
import "./Post.sol";
import "./Comment.sol";
import "./User.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract Manager is Ownable {
    Block blcks;
    Post posts;
    Comment comments;
    User users;

    struct Costs {
        uint mintUser;
        uint follow;
        uint unFollow;
        uint upvotePost;
        uint upvoteComment;
        uint downvotePost;
        uint downvoteComment;
        uint post;
        uint comment;
    }

    struct Stake {
        uint blockNumber;
        uint userId;
        uint postId;
        uint numTokens;
    }

    Costs public costs;
    Stake emptyStake;
    mapping(bytes32 => Stake) public stakes;
    uint totalStaked;
    // Each interation increases weight of user by 1/1000th of a point
    uint interactionWeightReward = 1000000;

    event tokensCollected(address sender, uint numTokens);
    event postStaked(uint userId, uint postId, uint numTokens);

    constructor(
        Block _blcks,
        Post _posts,
        Comment _comments,
        User _users
    ) {
        blcks = _blcks;
        posts = _posts;
        comments = _comments;
        users = _users;

        costs = Costs(1000, 20, 5, 10, 10, 5, 5, 100, 50);
    }
    
    // check that address that is owner
    modifier hasFunds(uint cost, address sender) {        
        require(
            blcks.balanceOf(sender) >= cost, 
            "You do not have enough tokens to do that"
        );
        _;
    }

    function changeCosts(Costs memory _costs) public onlyOwner {
        costs = _costs;
    }

    function upvotePost(uint postId) public hasFunds(costs.upvotePost, msg.sender) {
        posts.upvote(postId, msg.sender);
        blcks.burnFrom(msg.sender, costs.upvotePost);
    }

    function upvoteComment(uint commentId) public hasFunds(costs.upvoteComment, msg.sender) {
        comments.upvote(commentId, msg.sender);
        blcks.burnFrom(msg.sender, costs.upvoteComment);
    }

    function downvotePost(uint postId) public hasFunds(costs.downvotePost, msg.sender) {
        posts.downvote(postId, msg.sender);
        blcks.burnFrom(msg.sender, costs.downvotePost);
    }

    function downvoteComment(uint commentId) public hasFunds(costs.downvoteComment, msg.sender) {
        comments.downvote(commentId, msg.sender);
        blcks.burnFrom(msg.sender, costs.downvoteComment);
    }

    function mintUser(string memory userName) public hasFunds(costs.mintUser, msg.sender) {
        users.mintUser(userName, msg.sender);
        blcks.burnFrom(msg.sender, costs.mintUser);
    }

    function follow(
            uint userIdToFollow, 
            uint userIdThatFollowed
        ) public hasFunds(costs.follow, msg.sender) {
        users.follow(userIdToFollow, userIdThatFollowed, msg.sender);
    }

    function unFollow(
            uint userIdToUnFollowed, 
            uint userIdThatUnFollowed
        ) public hasFunds(costs.unFollow, msg.sender) {
        users.unFollow(userIdToUnFollowed, userIdThatUnFollowed, msg.sender);
    }

    function mintPost(
            uint userId,
            string memory username,
            string memory category, 
            string memory title, 
            string memory text, 
            string memory link
        ) public hasFunds(costs.post, msg.sender) {
        posts.mintPost(userId, username, category, title, text, link, msg.sender);
        blcks.burnFrom(msg.sender, costs.post);
    }

    function makeComment(
            uint userId, 
            string memory username,
            string memory text, 
            string memory link, 
            uint parentId,
            bool onPost
        ) public hasFunds(costs.comment, msg.sender) {
        uint commentId = comments.mintComment(userId, username, text, msg.sender);
        if (onPost) {
            posts.addComment(parentId, commentId);
        } else {
            comments.addComment(parentId, commentId);
        }
        blcks.burnFrom(msg.sender, costs.post);
    }

    function stakeOnPost(uint userId, uint postId, uint numTokens) public hasFunds(numTokens, msg.sender) {
        bytes32 stakeHash = keccak256(abi.encodePacked(userId, postId));
        Stake memory stake = stakes[stakeHash];
        require(stake.blockNumber == 0, "You have already staked this post");

        stakes[stakeHash] = Stake(block.number, userId, postId, numTokens);
        users.stake(userId, stakeHash, msg.sender);

        totalStaked += numTokens;
        emit postStaked(userId, postId, numTokens);
    }

    function calculateEarnings(uint postId) public returns(uint) {
        int s = posts.scoreInput(postId);
        return uint(s);
    }

    function collect(uint userId) public {
        bytes32[] memory stakedHashes = users.unstake(userId, msg.sender);
        // get earnings from users posts
        uint numTokens;
        for(uint i; i < stakedHashes.length; i++) {
            numTokens += calculateEarnings(stakes[stakedHashes[i]].postId);
            // clear stake
            stakes[stakedHashes[i]] = emptyStake;
        }

        totalStaked -= numTokens;
        blcks.mint(msg.sender, numTokens);

        emit tokensCollected(msg.sender, numTokens);
    }

    //Functions to get all comments and their children from a post
    function getChildData(uint commentId, uint n) public view returns(string memory) {
        // Get ides of all child comments and their children
        uint[] memory postComments = comments.getInputComments(commentId);
        if (postComments.length == 0) {
            return '';
        }
        
        bytes memory result = abi.encodePacked(', "comments', Strings.toString(n), '": [');
        for(uint i; i < postComments.length; i++) {
            result = abi.encodePacked(
                result, '{"id": ', 
                postComments[i],  
                getChildData(postComments[i], n+1),
                '}'
            );
        }
        result = abi.encodePacked(result, ']');
        return string(result);
    }

    function getPostData(uint postId) public view returns(string memory) {
        // Get ides of all comments and their children on a post        
        bytes memory result = abi.encodePacked(
            '{"post": {', 
            '"id": ', postId,
            ',',
            '"comments0": ['
        );
        uint[] memory postComments = posts.getInputComments(postId);
        for(uint i; i < postComments.length; i++) {
            result = abi.encodePacked(
                result, '{"id": ', postComments[i],  
                getChildData(postComments[i], 1),
                '}'
            );
        }
        result = abi.encodePacked(result, ']}}');
        return string(result);
    }

    function faucet(uint numTokens) public {
        // faucet for testing purposes
        blcks.mint(msg.sender, numTokens);
    }
}