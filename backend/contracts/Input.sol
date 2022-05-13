// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Input is AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    
    struct InputStruct {
        uint userId;
        uint blockMint;
        string category;
        string title;
        string text;
        string link;
        uint upvotes;
        uint downvotes;
        uint[] commentsHead;
    }  

    mapping(uint => InputStruct) public idToInput;
    mapping(uint => uint) public userInputUpvoteCount;
    mapping(uint => uint) public userInputDownvoteCount;
    
    event upvoteHappened(uint upvotesBefore, uint upvotesAfter);
    event downvoteHappened(uint downvotesBefore, uint downvotesAfter); 
    
    function supportsInterface(bytes4 interfaceId) public view virtual override(AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function grantMinterRole(address minter) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, minter);
    }

    function upvote(uint inputId) public onlyRole(MINTER_ROLE) {
        require(userInputUpvoteCount[inputId] == 0, "You have already upvoted this input");
        uint upvotesBefore = userInputUpvoteCount[inputId];
        // Check if user has already downvoted this input
        if (userInputDownvoteCount[inputId] != 0) {
            idToInput[inputId].downvotes--;
            userInputDownvoteCount[inputId]--;
        }
        idToInput[inputId].upvotes++;
        userInputUpvoteCount[inputId]++;
        uint upvotesAfter = userInputUpvoteCount[inputId];
        emit upvoteHappened(upvotesBefore, upvotesAfter);
    }

    function downvote(uint inputId) public onlyRole(MINTER_ROLE) {
        require(userInputDownvoteCount[inputId] == 0, "You have already downvoted this input");
        uint downvotesBefore = userInputUpvoteCount[inputId];
        // Check if user has already upvoted this input
        if (userInputUpvoteCount[inputId] != 0) {
            idToInput[inputId].upvotes--;
            userInputUpvoteCount[inputId]--;
        }
        idToInput[inputId].downvotes++;
        userInputDownvoteCount[inputId]++;
        uint downvotesAfter = userInputUpvoteCount[inputId];
        emit downvoteHappened(downvotesBefore, downvotesAfter);
    }

    function getInput(uint inputId) public view returns(InputStruct memory) {
        return idToInput[inputId];
    }

    function getInputComments(uint inputId) public view returns(uint[] memory) {
        return idToInput[inputId].commentsHead;
    }

    function addComment(uint inputId, uint commentId) public onlyRole(MINTER_ROLE) {
        idToInput[inputId].commentsHead.push(commentId);
    }

    function scoreInput(uint inputId) public view returns(int) {
        // scores using the hot algorithm from reddit
        InputStruct memory input = idToInput[inputId];
        // multiplier from 1 to 100 depending on what %age of tokens are staked in input
        // int multiplier = (stake.numTokens * 100) / totalStaked;
        // multiplier = multiplier > 1 ? multiplier : 1;
        int multiplier = 1;
        int s = (int(input.upvotes) - int(input.downvotes)) * multiplier;
        // order = log(max(abs(s), 1), 10);
        return s;
    }


}