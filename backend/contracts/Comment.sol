// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Input.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Comment is ERC721, ERC721Burnable, Input {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter; 

    event commentMinted(uint tokenId);

    constructor() ERC721("Comment", "CMT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _tokenIdCounter.increment();
    }  
    
    // Overrides interface
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, Input) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function safeMint(address to) internal returns(uint) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        return tokenId;
    }

    function mintComment(
            uint userId, 
            string memory text,
            address to
        ) public onlyRole(MINTER_ROLE) returns(uint) {
        uint tokenId = safeMint(to);
        uint[] memory temp;
        InputStruct memory comment = InputStruct(userId, block.number, '', '', text, "", 0, 0, temp);
        emit commentMinted(tokenId);
        return tokenId;
    }

}