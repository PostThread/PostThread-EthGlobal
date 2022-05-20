// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Block.sol";

abstract contract FundManager {
    Block blcks;
    NTBlock ntblcks;
    address communityWallet;
    address devWallet;
    uint public devFee;

    constructor(
        Block _blcks,
        NTBlock _ntblcks,
        address _communityWallet,
        address _devWallet
    ) {
        blcks = _blcks;
        ntblcks = _ntblcks;
        communityWallet = _communityWallet;
        devWallet = _devWallet;

        devFee = 25;
    }

    // check user has funds and if so sends them
    modifier sendFunds(uint256 cost, address sender) {
        uint bBlckBalance = ntblcks.balanceOf(sender);
        uint blcksBalance = blcks.balanceOf(sender);
        require(bBlckBalance + blcksBalance >= cost,  "You do not have enough tokens to do that");

        if (bBlckBalance >= cost) {
            ntblcks.burnFrom(sender, cost);
        } else {
            uint amountLeft = cost - bBlckBalance;
            if (bBlckBalance != 0) {
                ntblcks.burnFrom(sender, cost);
            }

            // Fee that goes to the devs
            uint fee = amountLeft * devFee / 1000;
            blcks.transferFrom(sender, devWallet, fee);
            // The rest is converted into ntblcks
            blcks.burnFrom(sender, amountLeft - fee);
            ntblcks.mint(communityWallet, amountLeft - fee);
        }
        _;
    }

    function changeDevFee(uint _devFee) public {
        devFee = _devFee;
    }
}