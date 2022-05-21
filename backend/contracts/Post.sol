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
        uint256 amountStaked;
        uint256 userScore;
    }

    uint public numBlocksForRewards = 100;
    uint[] public postIds;
    mapping(uint => mapping(uint => Stake)) postIdUserIdToStake;
    uint numPostsStaked;
    uint public numDigits = 10**(9-1);

    event postMinted(InputStruct post, address sender); 
    event stakedEvent(InputStruct post, uint userId, address sender, bool isStaked);

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
            address sender,
            uint stakingTip,
            bool isNSFW
        ) public onlyRole(MINTER_ROLE) 
    {
        uint postId = safeMint(sender);
        uint[] memory emptyList;
        MetaData memory metaData = MetaData(username, category, title, text, link);
        InputStruct memory input = InputStruct(
            metaData, postId, userId, block.number, emptyList, emptyList, isNSFW, 
            0, 0, 0, 0, false
        );
        idToInput[postId] = input;
        postIds.push(postId);
        rewardPost(postId, stakingTip);
        emit inputEvent(input, input.metaData, sender);
    }

    function stakeOnPost(
            uint userId, uint postId, uint numTokens, uint userScore, address sender
        ) public onlyRole(MINTER_ROLE) 
    {
        Stake memory stake = postIdUserIdToStake[postId][userId];
        require(stake.blockNumber == 0, "You have already staked this post");
        InputStruct memory input = idToInput[postId];
        require(input.blockMint + numBlocksForRewards > block.number, "Post is no longer stakable");

        postIdUserIdToStake[postId][userId] = Stake(block.number, numTokens, userScore);
        idToInput[postId].usersStaked.push(userId);
        idToInput[postId].totalStaked += numTokens;
        emit inputEvent(idToInput[postId], idToInput[postId].metaData, sender);
    }

    function getStakedReward(uint userId, uint postId) public view returns(uint) {
        // ToDo: This doesn't account for 100% of the rewards. Need to keep track of first staked block
        Stake memory stake = postIdUserIdToStake[postId][userId];
        require(stake.blockNumber != 0, "You are not staking this post");
        InputStruct memory post = idToInput[postId];
        uint timeMultiplier = (numBlocksForRewards - (stake.blockNumber - post.blockMint))**2 * numDigits / numBlocksForRewards**2;
        uint stakedMultiplier = stake.amountStaked * numDigits / post.totalStaked;
        return timeMultiplier * stakedMultiplier * post.totalStaked / numDigits**2;
    }

    function unstakeAll(uint postId, address sender) 
        public onlyRole(MINTER_ROLE) returns(uint[] memory) 
    {    
        InputStruct memory input = idToInput[postId];
        require(input.blockMint + numBlocksForRewards < block.number, "Not unstakable yet");
        require(!idToInput[postId].stakesClaimed, "Stake claimed already");
        idToInput[postId].stakesClaimed = true;
        idToInput[postId].totalStaked = 0;
        emit inputEvent(idToInput[postId], idToInput[postId].metaData, sender);
        return idToInput[postId].usersStaked;
    }

    function rewardPost(uint postId, uint reward) public {
        idToInput[postId].totalReward += reward;
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
    function voteOnComment(uint commentId, address sender, bool isUp) public onlyRole(MINTER_ROLE) {
        comments.voteOnInput(commentId, sender, false);
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
        uint commentId = comments.mintComment(userId, username, text, sender, isNSFW, sender);
        if (onPost) {
            addComment(parentId, commentId, sender);
        } else {
            comments.addComment(parentId, commentId, sender);
        }
    }

    function burnComment(uint commentId, uint parentId, bool onPost, address sender) public {
        comments.burn(commentId);
        if (onPost) {
            removeIdFromCommentList(commentId, parentId, sender);
        } else {
            comments.removeIdFromCommentList(commentId, parentId, sender);
        }
    }

    function setAsNSFW(uint inputId, bool onPost, address sender) public onlyRole(MINTER_ROLE) {
        if (onPost) {
            idToInput[inputId].isNSFW = true;
            emit inputEvent(idToInput[inputId], idToInput[inputId].metaData, sender);
        } else {
            comments.setCommentAsNSFW(inputId, sender);
        }
    }
}