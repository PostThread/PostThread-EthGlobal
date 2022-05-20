// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract baseBlock is ERC20, ERC20Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    address[] whitelistedAddresses;

    event tokensMinted(address sender, uint256 numTokens);

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
        emit tokensMinted(to, amount);
    }

    function grantMinterRole(address minter) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(MINTER_ROLE, minter);
    }

    function whitelistAddress(address whitelist) public onlyRole(DEFAULT_ADMIN_ROLE) {
        whitelistedAddresses.push(whitelist);
    }
    
    function checkAddressForWhitelist() public view returns(bool) {
        for (uint256 i; i < whitelistedAddresses.length; i++) {
            if (msg.sender == whitelistedAddresses[i]) {
                return true;
            }
        }
        return false;
    }

    function burnFrom(address account, uint256 amount) public virtual override {
        if (checkAddressForWhitelist()) {
            _burn(account, amount);
        } else {
            _spendAllowance(account, _msgSender(), amount);
            _burn(account, amount);
        }
    }
}

contract Block is baseBlock {
    constructor() ERC20("Block", "BLK") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        if (checkAddressForWhitelist()) {
            address spender = _msgSender();
            // _spendAllowance(from, spender, amount);
            _transfer(from, to, amount);
            return true;
        } else {
            address spender = _msgSender();
            _spendAllowance(from, spender, amount);
            _transfer(from, to, amount);
            return true;
        }
    }
}

// Non-transferable version of regular Block token
contract NTBlock is baseBlock {
    constructor() ERC20("bBlock", "bBLK") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }
    
    // Override transfer function to always fail
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(false, "This is a non-transferable token");
        // address owner = _msgSender();
        // _transfer(owner, to, amount);
        // return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        require(false, "This is a non-transferable token");
        // address spender = _msgSender();
        // _spendAllowance(from, spender, amount);
        // _transfer(from, to, amount);
        // return true;
    }
}