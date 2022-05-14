// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Input.sol";

contract Post is Input { 
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    InputStruct[] public posts;

    event postMinted(InputStruct post, address sender); 

    constructor() ERC721("Post", "PST") {
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
            address to
        ) public onlyRole(MINTER_ROLE) {
        uint tokenId = safeMint(to);
        uint[] memory temp;
        InputStruct memory post = InputStruct(tokenId, username, userId, block.number, category, title, text, link, 0, 0, temp);
        idToInput[tokenId] = post;
        posts.push(post);
        emit postMinted(post, to);
    }
}