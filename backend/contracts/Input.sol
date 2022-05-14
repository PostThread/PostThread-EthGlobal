// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721Sendable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract Input is ERC721, ERC721Burnable, ERC721Sendable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    
    struct InputStruct {
        uint inputId;
        string username;
        uint userId;
        uint blockMint;
        string category;
        string title;
        string text;
        string link;
        uint upvotes;
        uint downvotes;
        uint[] commentsHead;
        // mapping(address => uint) userInputUpvoteCount;
        // mapping(address => uint) userInputDownvoteCount;
    }  

    mapping(uint => InputStruct) public idToInput;
    
    event upvoteHappened(InputStruct input, address sender);
    event downvoteHappened(InputStruct input, address sender); 
    // event upvoteUndone(uint inputId, uint numUpvotes, address sender);
    // event downvoteUndone(uint inputId, uint numDownvotes, address sender); 
    
    // Overrides interface
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function grantMinterRole(address minter) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, minter);
    }

    function upvote(uint inputId, address sender) public onlyRole(MINTER_ROLE) onlySender(inputId, sender) {
        InputStruct storage input = idToInput[inputId];
        // require(inputId !=0 && inputId <= _tokenIdCounter.current(), "Bad inputId");
        // require(input.userInputUpvoteCount[sender] == 0, "You have already upvoted this input");
        // Check if user has already downvoted this input
        // if (input.userInputDownvoteCount[sender] != 0) {
        //     idToInput[inputId].downvotes--;
        //     input.userInputDownvoteCount[sender]--;
        //     emit downvoteUndone(inputId, idToInput[inputId].downvotes, sender);
        // }
        idToInput[inputId].upvotes++;
        // input.userInputUpvoteCount[sender]++;
        emit upvoteHappened(idToInput[inputId], sender);
    }

    function downvote(uint inputId, address sender) public onlyRole(MINTER_ROLE) onlySender(inputId, sender) {
        InputStruct storage input = idToInput[inputId];
        // require(inputId !=0 && inputId <= _tokenIdCounter.current(), "Bad inputId");
        // require(input.userInputDownvoteCount[sender] == 0, "You have already downvoted this input");
        // Check if user has already upvoted this input
        // if (input.userInputUpvoteCount[sender] != 0) {
        //     idToInput[inputId].upvotes--;
        //     input.userInputUpvoteCount[sender]--;
        //     emit upvoteUndone(inputId, idToInput[inputId].upvotes, sender);
        // }
        idToInput[inputId].downvotes++;
        // input.userInputDownvoteCount[sender]++;
        emit downvoteHappened(idToInput[inputId], sender);
    }

    function getInput(uint inputId) public view returns(InputStruct memory) {
        return idToInput[inputId];
    }

    function getInputComments(uint inputId) public view returns(uint[] memory) {
        return idToInput[inputId].commentsHead;
    }

    function addComment(uint parentId, uint commentId) public {
        idToInput[parentId].commentsHead.push(commentId);
    }

    function scoreInput(uint inputId) public view returns(int) {
        // scores using the hot algorithm from reddit
        InputStruct storage input = idToInput[inputId];
        // multiplier from 1 to 100 depending on what %age of tokens are staked in input
        // int multiplier = (stake.numTokens * 100) / totalStaked;
        // multiplier = multiplier > 1 ? multiplier : 1;
        int multiplier = 1;
        int s = (int(input.upvotes) - int(input.downvotes)) * multiplier;
        // order = log(max(abs(s), 1), 10);
        return s;
    }


}