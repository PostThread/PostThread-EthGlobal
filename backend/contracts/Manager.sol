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
        uint256 mintUser;
        uint256 follow;
        uint256 unFollow;
        uint256 upvotePost;
        uint256 upvoteComment;
        uint256 downvotePost;
        uint256 downvoteComment;
        uint256 post;
        uint256 comment;
    }

    struct Stake {
        uint256 blockNumber;
        uint256 userId;
        uint256 postId;
        uint256 numTokens;
    }

    Costs public costs;
    Stake emptyStake;
    mapping(bytes32 => Stake) public stakes;
    uint256 totalStaked;
    // Each interation increases weight of user by 1/1000th of a point
    uint256 interactionWeightReward = 1000000;

    event tokensCollected(address sender, uint256 numTokens);
    event postStaked(uint256 userId, uint256 postId, uint256 numTokens);

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
    modifier hasFunds(uint256 cost, address sender) {
        require(
            blcks.balanceOf(msg.sender) >= costs.upvotePost, //why is always upvotePost?
            "You do not have enough tokens to do that"
        );
        _;
    }

    function changeCosts(Costs memory _costs) public onlyOwner {
        costs = _costs;
    }

    function upvotePost(uint256 postId)
        public
        hasFunds(costs.upvotePost, msg.sender)
    {
        posts.upvote(postId);
        blcks.burn(costs.upvotePost);
    }

    function upvoteComment(uint256 commentId)
        public
        hasFunds(costs.upvoteComment, msg.sender)
    {
        comments.upvote(commentId);
        blcks.burn(costs.upvoteComment);
    }

    function downvotePost(uint256 postId)
        public
        hasFunds(costs.downvotePost, msg.sender)
    {
        posts.downvote(postId);
        blcks.burn(costs.downvotePost);
    }

    function downvoteComment(uint256 commentId)
        public
        hasFunds(costs.downvoteComment, msg.sender)
    {
        comments.downvote(commentId);
        blcks.burn(costs.downvoteComment);
    }

    function mintUser(string memory userName)
        public
        hasFunds(costs.mintUser, msg.sender)
    {
        users.mintUser(userName, msg.sender);
        blcks.burnFrom(msg.sender, costs.mintUser);
    }

    function follow(uint256 userIdToFollow, uint256 userIdThatFollowed)
        public
        hasFunds(costs.follow, msg.sender)
    {
        users.follow(userIdToFollow, userIdThatFollowed, msg.sender);
    }

    function unFollow(uint256 userIdToUnFollowed, uint256 userIdThatUnFollowed)
        public
        hasFunds(costs.unFollow, msg.sender)
    {
        users.unFollow(userIdToUnFollowed, userIdThatUnFollowed, msg.sender);
    }

    function mintPost(
        uint256 userId,
        string memory category,
        string memory title,
        string memory text,
        string memory link
    ) public hasFunds(costs.post, msg.sender) {
        posts.mintPost(userId, category, title, text, link, msg.sender);
        blcks.burnFrom(msg.sender, costs.post);
    }

    function makeComment(
        uint256 userId,
        string memory text,
        string memory link,
        uint256 parentId,
        bool onPost
    ) public hasFunds(costs.comment, msg.sender) {
        uint256 commentId = comments.mintComment(userId, text, msg.sender);
        if (onPost) {
            posts.addComment(parentId, commentId);
        } else {
            comments.addComment(parentId, commentId);
        }
        blcks.burnFrom(msg.sender, costs.post);
    }

    function stakeOnPost(
        uint256 userId,
        uint256 postId,
        uint256 numTokens
    ) public hasFunds(numTokens, msg.sender) {
        bytes32 stakeHash = keccak256(abi.encodePacked(userId, postId));
        Stake memory stake = stakes[stakeHash];
        require(stake.blockNumber == 0, "You have already staked this post");

        stakes[stakeHash] = Stake(block.number, userId, postId, numTokens);
        users.stake(userId, stakeHash, msg.sender);

        totalStaked += numTokens;
        emit postStaked(userId, postId, numTokens);
    }

    function calculateEarnings(uint256 postId) public returns (uint256) {
        int256 s = posts.scoreInput(postId);
        return uint256(s);
    }

    function collect(uint256 userId) public {
        bytes32[] memory stakedHashes = users.unstake(userId, msg.sender);
        // get earnings from users posts
        uint256 numTokens;
        for (uint256 i; i < stakedHashes.length; i++) {
            numTokens += calculateEarnings(stakes[stakedHashes[i]].postId);
            // clear stake
            stakes[stakedHashes[i]] = emptyStake;
        }

        totalStaked -= numTokens;
        blcks.mint(msg.sender, numTokens);

        emit tokensCollected(msg.sender, numTokens);
    }

    //Functions to get all comments and their children from a post
    function getChildData(uint256 commentId, uint256 n)
        public
        view
        returns (string memory)
    {
        // Get ides of all child comments and their children
        uint256[] memory postComments = comments.getInputComments(commentId);
        if (postComments.length == 0) {
            return "";
        }

        bytes memory result = abi.encodePacked(
            ', "comments',
            Strings.toString(n),
            '": ['
        );
        for (uint256 i; i < postComments.length; i++) {
            result = abi.encodePacked(
                result,
                '{"id": ',
                postComments[i],
                getChildData(postComments[i], n + 1),
                "}"
            );
        }
        result = abi.encodePacked(result, "]");
        return string(result);
    }

    function getPostData(uint256 postId) public view returns (string memory) {
        // Get ides of all comments and their children on a post
        bytes memory result = abi.encodePacked(
            '{"post": {',
            '"id": ',
            postId,
            ",",
            '"comments0": ['
        );
        uint256[] memory postComments = posts.getInputComments(postId);
        for (uint256 i; i < postComments.length; i++) {
            result = abi.encodePacked(
                result,
                '{"id": ',
                postComments[i],
                getChildData(postComments[i], 1),
                "}"
            );
        }
        result = abi.encodePacked(result, "]}}");
        return string(result);
    }

    function faucet(uint256 numTokens) public {
        // faucet for testing purposes
        blcks.mint(msg.sender, numTokens);
    }
}
