// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


abstract contract ERC721Sendable is Context, ERC721 {
    // check that address is owner
    modifier onlySender(uint userId, address sender) {        
        require(
            ownerOf(userId) == sender, 
            "You do not own this profile"
        );
        _;
    }
}