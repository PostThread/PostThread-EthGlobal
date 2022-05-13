// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Input.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Post is ERC721, ERC721Burnable, Input {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;  

    InputStruct[] public posts;

    event postMinted(uint tokenId);

    constructor() ERC721("Post", "PST") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _tokenIdCounter.increment();
    }    
    
    // Overrides interface
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, Input) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function safeMint(address to) internal returns(uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        return tokenId;
    }

    function mintPost(
            uint userId, 
            string memory category, 
            string memory title, 
            string memory text, 
            string memory link,
            address to
        ) public onlyRole(MINTER_ROLE) {
        uint tokenId = safeMint(to);
        uint[] memory temp;
        InputStruct memory post = InputStruct(userId, block.number, category, title, text, link, 0, 0, temp);
        idToInput[userId] = post;
        posts.push(post);
        emit postMinted(tokenId);
    }
}