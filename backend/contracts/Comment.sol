// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Input.sol";

contract Comment is Input {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    event commentMinted(InputStruct comment, address sender); 

    constructor() ERC721("Comment", "CMT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _tokenIdCounter.increment();
    }  

    function safeMint(address to) internal returns(uint) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        return tokenId;
    }

    function mintComment(
            uint userId, 
            string memory username,
            string memory text,
            address to,
            bool isNSFW, address sender
        ) public onlyRole(MINTER_ROLE) returns(uint) {
        uint tokenId = safeMint(to);
        uint[] memory emptyList;
        MetaData memory metaData = MetaData(username, '', '', text, '');
        InputStruct memory comment = InputStruct(
            metaData, tokenId, userId, block.number, emptyList, emptyList, isNSFW, 
            0, 0, 0, 0, false
        );
        emit inputEvent(comment, metaData, sender);
        return tokenId;
    }

    function setCommentAsNSFW(uint inputId, address sender) public onlyRole(MINTER_ROLE) {
        idToInput[inputId].isNSFW = true;
        emit inputEvent(idToInput[inputId], idToInput[inputId].metaData, sender);
    }

}