// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721Sendable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract Input is ERC721, ERC721Burnable, ERC721Sendable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    struct MetaData {
        string username;
        string category;
        string title;
        string text;
        string link;
    }
    
    struct InputStruct {
        MetaData metaData;
        uint inputId;
        uint userId;
        uint blockMint;
        uint[] commentsHead;
        uint[] usersStaked;
        bool isNSFW;
        uint upvotes;
        uint downvotes;
        uint totalStaked;
        uint totalReward;
        bool stakesClaimed;
    }  

    mapping(uint => InputStruct) public idToInput;
    mapping(address => mapping(uint => uint)) userInputIdVoteCount;
    
    event inputEvent(InputStruct input, MetaData metaData, address sender);
    
    // Overrides interface
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function grantMinterRole(address minter) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, minter);
    }

    function voteOnInput(uint inputId, address sender, bool isUp) public onlyRole(MINTER_ROLE) {
        InputStruct storage input = idToInput[inputId];
        // require(inputId !=0 && inputId <= _tokenIdCounter.current(), "Bad inputId");
        require(userInputIdVoteCount[sender][inputId] == 0, "You have already voted on this input");
        if (isUp) {
            idToInput[inputId].upvotes++;
        } else {
            idToInput[inputId].downvotes++;
        }
        userInputIdVoteCount[sender][inputId]++;
        emit inputEvent(idToInput[inputId], idToInput[inputId].metaData, sender);
    }

    function getInput(uint inputId) public view returns(InputStruct memory) {
        return idToInput[inputId];
    }

    function getInputComments(uint inputId) public view returns(uint[] memory) {
        return idToInput[inputId].commentsHead;
    }

    function addComment(uint parentId, uint commentId, address sender) public onlyRole(MINTER_ROLE) {
        idToInput[parentId].commentsHead.push(commentId);
        emit inputEvent(idToInput[parentId], idToInput[parentId].metaData, sender);
    }

    function labelInputAsNSFW(uint inputId, address sender) public onlyRole(MINTER_ROLE) {
        idToInput[inputId].isNSFW = true;
        emit inputEvent(idToInput[inputId], idToInput[inputId].metaData, sender);
    }

    function removeIdFromCommentList(uint commentId, uint parentId, address sender) public {
        uint[] memory comments = idToInput[parentId].commentsHead;
        for (uint256 i; i < comments.length; i++) {
            if (commentId == comments[i]) {
                idToInput[parentId].commentsHead[i] = comments[comments.length - 1];
                idToInput[parentId].commentsHead.pop();
            }
        }
        emit inputEvent(idToInput[parentId], idToInput[parentId].metaData, sender);
    }
}