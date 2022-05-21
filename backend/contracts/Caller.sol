// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Block.sol";
import "./Post.sol";
import "./User.sol";
import "./DAO.sol";
import "./Manager.sol";

contract Caller {
    Block blcks;
    NTBlock ntblcks;
    Post posts;
    User users;
    DAO dao;
    Manager manager;
    
    constructor(
        Block _blcks,
        NTBlock _ntblcks,
        Post _posts,
        User _users,
        DAO _dao,
        Manager _manager
    ) {
        blcks = _blcks;
        ntblcks = _ntblcks;
        posts = _posts;
        users = _users;
        dao = _dao;
        manager = _manager;
    }

    function setDailyQuest(uint userId) public {
        manager.setDailyQuest(userId);
    }

    function getUserQuest(uint userId) public returns(uint) {
        return users.getUserQuest(userId);
    }

    function getGasFee() public view returns(uint) {
        return manager.gasFee();
    }

    function upvotePost(uint userIdOfInteractor, uint postId) public {
        manager.upvotePost(userIdOfInteractor, postId, msg.sender);
    }

    function downvotePost(uint userIdOfInteractor, uint postId) public {
        manager.downvotePost(userIdOfInteractor, postId, msg.sender);
    }

    function upvoteComment(uint userIdOfInteractor, uint commentId, uint postId) public {
        manager.upvoteComment(userIdOfInteractor, commentId, postId, msg.sender);
    }

    function downvoteComment(uint userIdOfInteractor, uint commentId, uint postId) public {
        manager.downvoteComment(userIdOfInteractor, commentId, postId, msg.sender);
    }

    function mintUser(string memory userName) public {
        manager.mintUser(userName, msg.sender);
    }

    function follow(uint256 userIdProtagonist, uint256 userIdAntagonist) public {
        manager.follow(userIdProtagonist, userIdAntagonist, msg.sender);
    }

    function unFollow(uint256 userIdProtagonist, uint256 userIdAntagonist) public {
        manager.unFollow(userIdProtagonist, userIdAntagonist, msg.sender);
    }

    function mintPost(
            uint userId,
            string memory username,
            string memory category, 
            string memory title, 
            string memory text, 
            string memory link,
            uint stakingTip,
            bool isNSFW
        ) public
    {    
        manager.mintPost(
            userId, username, category, title, text, link, 
            stakingTip, isNSFW, msg.sender
        );
    }

    function makeComment(
            uint userId, 
            string memory username,
            string memory text, 
            uint parentId,
            bool onPost,
            bool isNSFW
        ) public 
    {
        manager.makeComment(
            userId, username, text, parentId, onPost, isNSFW, msg.sender
        );
    }    
    
    function stakeOnPost(uint256 userId, uint256 postId, uint256 numTokens) public {
        manager.stakeOnPost(userId, postId, numTokens, msg.sender);
    }

    function collectAllStakes(uint postId) public {
        manager.collectAllStakes(postId, msg.sender);
    }

    function mintProposal(
        uint userId, string memory description, bytes memory parameters, 
        string[] memory votingOptions
    ) public {
        manager.mintProposal(userId, description, parameters, votingOptions, msg.sender);
    } 

    function voteOnProposal(
            uint proposalId, uint userId, 
            uint optionNumber, uint numVotes
        ) public  
    {
        manager.voteOnProposal(proposalId, userId, optionNumber, numVotes, msg.sender);
    }

    function implementProposal(uint userIdOfInteractor, uint proposalId) public {
        manager.implementProposal(userIdOfInteractor, proposalId, msg.sender);
    }

    function faucet(uint256 numTokens) public {
        manager.faucet(numTokens, msg.sender);
    }
}