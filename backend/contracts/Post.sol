// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Input.sol";
import "./Comment.sol";

contract Post is Input { 
    Comment comments;

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct Stake {
        uint256 blockNumber;
        uint256 userId;
        uint256 postId;
        uint256 amountStaked;
        uint256 stakingTip;
    }

    uint[] public postIds;
    mapping(uint => Stake) public stakeIdToStake;
    Stake[] public stakeIds;
    uint256 public totalStaked;

    event postMinted(InputStruct post, address sender); 
    event userStaked(InputStruct post, uint userId, address sender);
    event userUnstaked(InputStruct post, uint userId, address sender);

    constructor(Comment _comments) ERC721("Post", "PST") {
        comments = _comments;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _tokenIdCounter.increment();
    }    

    function safeMint(address to) internal returns(uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        return tokenId;
    }

    function mintPost(
            uint userId, 
            string memory username,
            string memory category, 
            string memory title, 
            string memory text, 
            string memory link,
            address to,
            uint stakingTip,
            bool isNSFW
        ) public onlyRole(MINTER_ROLE) 
    {
        uint postId = safeMint(to);
        uint[] memory emptyList;
        RewardValues memory emptyRewards;
        emptyRewards.stakingTip = stakingTip;
        InputStruct memory post = InputStruct(
            postId, username, userId, block.number, category, title, text, link, 
            emptyList, emptyList, emptyRewards, isNSFW
        );
        idToInput[postId] = post;
        postIds.push(postId);
        emit postMinted(post, to);
    }

    function stake(
            uint userId, uint postId, uint numTokens, uint userScore, address sender
        ) public onlyRole(MINTER_ROLE) {

        // require(stake.blockNumber == 0, "You have already staked this post");
        // bytes32 stakeHash = keccak256(abi.encodePacked(userId, postId));
        // Stake memory stake = stakes[stakeHash];
        // stakes[stakeHash] = Stake(block.number, userId, postId, numTokens);
        idToInput[postId].usersStaked.push(userId);
        totalStaked += numTokens;
        emit userStaked(idToInput[postId], userId, sender);
    }

    function unstake(uint userId, address sender) public onlyRole(MINTER_ROLE) returns(bytes32[] memory) {
        // UserStruct memory user = userIdToUser[userId];
        // bytes32[] memory temp;
        // userIdToUser[userId].stakedHashes = temp;
        // emit userUnstaked(idToInput[postId], userId, sender);
        // return idToInput[postId].usersStaked;
    }

    function scorePost(uint postId) public view returns(uint) {
        InputStruct memory post = idToInput[postId];

        uint totalPostVotes = (post.rewardValues.postUpvotes + post.rewardValues.postDownvotes);
        uint postActivity = 
            (totalPostVotes * 2) + 
            (post.usersStaked.length * 5) +
            (post.rewardValues.totalComments * 3) +
            (post.rewardValues.totalCommentUpvotes * 1) +
            (post.rewardValues.totalCommentDownvotes * 1);

        int voteWeight = 1 + (int(post.rewardValues.postUpvotes) - int(post.rewardValues.postDownvotes)) / int(totalPostVotes);
        
        return postActivity * uint(voteWeight);
    }

    //Functions to get all comments and their children from a post
    function getChildData(uint256 commentId, uint256 n) public view returns (string memory) {
        // Get ids of all child comments and their children
        uint256[] memory postComments = comments.getInputComments(commentId);
        bytes memory result = abi.encodePacked(', "comments": [');
        for (uint256 i; i < postComments.length; i++) {
            string memory comma;
            if (i > 0) {comma = ',';}
            result = abi.encodePacked(
                result, comma,
                '{"id": ',
                Strings.toString(postComments[i]),
                getChildData(postComments[i], n + 1),
                "}"
            );
        }
        result = abi.encodePacked(result, "]");
        return string(result);
    }

    function getPostData(uint256 postId) public view returns (string memory) {
        // Get ids of all comments and their children on a post
        bytes memory result = abi.encodePacked(
            '{"post": {"id": ',
            Strings.toString(postId),
            ', "comments": ['
        );
        uint256[] memory postComments = getInputComments(postId);
        for (uint256 i; i < postComments.length; i++) {
            string memory comma;
            if (i > 0) {comma = ',';}
            result = abi.encodePacked(
                result, comma, '{"id": ',
                Strings.toString(postComments[i]),
                getChildData(postComments[i], 1),
                "}"
            );
        }
        result = abi.encodePacked(string(result), "]}}");
        return string(result);
    }


    // The following are functions used on comments on a post
    function upvoteComment(uint commentId, address sender) public onlyRole(MINTER_ROLE) {
        comments.upvote(commentId, sender);
    }

    function downvoteComment(uint commentId, address sender) public onlyRole(MINTER_ROLE) {
        comments.upvote(commentId, sender);
    }

    function makeComment(
            uint userId, 
            string memory username,
            string memory text, 
            uint parentId,
            bool onPost,
            address sender,
            bool isNSFW
        ) public onlyRole(MINTER_ROLE) 
    {
        uint commentId = comments.mintComment(userId, username, text, sender, isNSFW);
        if (onPost) {
            addComment(parentId, commentId);
        } else {
            comments.addComment(parentId, commentId);
        }
    }

    function setAsNSFW(uint inputId, bool onPost) public onlyRole(MINTER_ROLE) {
        if (onPost) {
            idToInput[inputId].isNSFW = true;
        } else {
            comments.setCommentAsNSFW(inputId);
        }
    }
}