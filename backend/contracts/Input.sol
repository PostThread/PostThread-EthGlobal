// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721Sendable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract Input is ERC721, ERC721Burnable, ERC721Sendable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // struct RewardValues {
    //     uint totalComments;
    //     uint totalCommentUpvotes;
    //     uint totalCommentDownvotes;
    //     uint postUpvotes;
    //     uint postDownvotes;
    //     uint amountStaked;
    //     uint stakingTip;
    // }
    
    struct InputStruct {
        uint inputId;
        string username;
        uint userId;
        uint blockMint;
        string category;
        string title;
        string text;
        string link;
        uint[] commentsHead;
        uint[] usersStaked;
        RewardValues rewardValues;
        bool isNSFW;

        //rewards
        uint totalComments;
        uint totalCommentUpvotes;
        uint totalCommentDownvotes;
        uint postUpvotes;
        uint postDownvotes;
        uint amountStaked;
        uint stakingTip;
    }  

    mapping(uint => InputStruct) public idToInput;
    mapping(address => mapping(uint => uint)) userInputIdUpvoteCount;
    mapping(address => mapping(uint => uint)) userInputIdDownvoteCount;
    
    event upvoteHappened(InputStruct input, address sender);
    event downvoteHappened(InputStruct input, address sender); 
    event upvoteUndone(uint inputId, uint numUpvotes, address sender);
    event downvoteUndone(uint inputId, uint numDownvotes, address sender); 
    
    // Overrides interface
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function grantMinterRole(address minter) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, minter);
    }

    function upvote(uint inputId, address sender) public onlyRole(MINTER_ROLE) {
        InputStruct storage input = idToInput[inputId];
        // require(inputId !=0 && inputId <= _tokenIdCounter.current(), "Bad inputId");
        require(userInputIdUpvoteCount[sender][inputId] == 0, "You have already upvoted this input");
        // Check if user has already downvoted this input
        if (userInputIdDownvoteCount[sender][inputId] != 0) {
            idToInput[inputId].rewardValues.postDownvotes--;
            userInputIdDownvoteCount[sender][inputId]--;
            emit downvoteUndone(inputId, idToInput[inputId].rewardValues.postDownvotes, sender);
        }
        idToInput[inputId].rewardValues.postUpvotes++;
        userInputIdUpvoteCount[sender][inputId]++;
        emit upvoteHappened(idToInput[inputId], sender);
    }

    function downvote(uint inputId, address sender) public onlyRole(MINTER_ROLE) {
        InputStruct storage input = idToInput[inputId];
        // require(inputId !=0 && inputId <= _tokenIdCounter.current(), "Bad inputId");
        require(userInputIdDownvoteCount[sender][inputId] == 0, "You have already downvoted this input");
        // Check if user has already upvoted this input
        if (userInputIdUpvoteCount[sender][inputId] != 0) {
            idToInput[inputId].rewardValues.postUpvotes--;
            userInputIdUpvoteCount[sender][inputId]--;
            emit upvoteUndone(inputId, idToInput[inputId].rewardValues.postUpvotes, sender);
        }
        idToInput[inputId].rewardValues.postDownvotes++;
        userInputIdDownvoteCount[sender][inputId]++;
        emit downvoteHappened(idToInput[inputId], sender);
    }

    function getInput(uint inputId) public view returns(InputStruct memory) {
        return idToInput[inputId];
    }

    function getInputComments(uint inputId) public view returns(uint[] memory) {
        return idToInput[inputId].commentsHead;
    }

    function addComment(uint parentId, uint commentId) public onlyRole(MINTER_ROLE) {
        idToInput[parentId].commentsHead.push(commentId);
    }

    function labelInputAsNSFW(uint inputId) public onlyRole(MINTER_ROLE) {
        idToInput[inputId].isNSFW = true;
    }
}