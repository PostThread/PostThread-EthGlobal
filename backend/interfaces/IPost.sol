//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

interface IPost {
    function mintPost(
        bytes32 userHash,
        string memory category,
        string memory title,
        string memory text,
        string memory link
    ) external;
}
