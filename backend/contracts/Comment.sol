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
            bool isNSFW
        ) public onlyRole(MINTER_ROLE) returns(uint) {
        uint tokenId = safeMint(to);
        uint[] memory emptyList;
        RewardValues memory emptyRewards;
        InputStruct memory comment = InputStruct(
            tokenId, username, userId, block.number, '', '', text, "", emptyList, emptyList, 
            emptyRewards, isNSFW
        );
        emit commentMinted(comment, to);
        return tokenId;
    }

    function setCommentAsNSFW(uint inputId) public onlyRole(MINTER_ROLE) {
        idToInput[inputId].isNSFW = true;
    }

}