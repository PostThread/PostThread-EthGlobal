// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Block.sol";
import "./Post.sol";
import "./User.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Manager is Ownable {
    Block blcks;
    Post posts;
    User users;

    struct Costs {
        uint upvote;
        uint downvote;
        uint post;
        uint comment;
    }

    struct Stake {
        uint blockNumber;
        bytes32 userHashes;
        bytes32 postHashes;
        uint numTokens;
    }

    Costs public costs;
    Stake emptyStake;
    mapping(bytes32 => Stake) public stakes;
    uint totalStaked;

    event tokensCollected(address sender, uint numTokens);
    event postStaked(bytes32 userHash, bytes32 postHash, uint numTokens);

    constructor(
        Block _blcks,
        Post _posts,
        User _users
    ) {
        blcks = _blcks;
        posts = _posts;
        users = _users;

        costs = Costs(10, 10, 100, 50);
    }

    function changeCosts(Costs memory _costs) public onlyOwner {
        costs = _costs;
    }

    function upvote(bytes32 postHash) public {
        require(blcks.balanceOf(msg.sender) >= costs.upvote, "You do not have enough tokens to upvote");
        posts.upvote(postHash);
        blcks.burn(costs.upvote);
    }

    function downvote(bytes32 postHash) public {
        require(
            blcks.balanceOf(msg.sender) >= costs.downvote, 
            "You do not have enough tokens to downvote"
        );
        posts.downvote(postHash);
        blcks.burn(costs.downvote);
    }

    function mintPost(
            bytes32 userHash,
            string memory category, 
            string memory title, 
            string memory text, 
            string memory link
        ) public {
        require(
            blcks.balanceOf(msg.sender) >= costs.post, 
            "You do not have enough tokens to post"
        );
        posts.mintPost(userHash, category, title, text, link);
        blcks.burn(costs.post);
    }

    function makeComment(
            bytes32 userHash, 
            string memory text, 
            string memory link, 
            bytes32 parentHash,
            bool onPost
        ) public {
        require(
            blcks.balanceOf(msg.sender) >= costs.comment, 
            "You do not have enough tokens to post"
        );
        posts.makeComment(userHash, text, link, parentHash, onPost);
        blcks.burn(costs.comment);
    }

    function stakeOnPost(bytes32 userHash, bytes32 postHash, uint numTokens) public {
        bytes32 hash = keccak256(abi.encodePacked(userHash, postHash));
        Stake memory stake = stakes[hash];
        require(stake.blockNumber == 0, "You have already staked this post");

        stakes[hash] = Stake(block.number, userHash, postHash, numTokens);
        users.stake(userHash, hash);

        totalStaked += numTokens;
        emit postStaked(userHash, postHash, numTokens);
    }

    function calculateEarnings(bytes32 postHash) public returns(uint) {
        // Post memory post = posts.hashToPost(postHash);
        int s = posts.scorePost(postHash);
        return uint(s);
    }

    function collect(bytes32 userHash) public {
        bytes32[] memory stakedHashes = users.unstake(userHash);
        // get earnings from users posts
        uint numTokens;
        for(uint i; i < stakedHashes.length; i++) {
            bytes32 hash = stakedHashes[i];
            numTokens += calculateEarnings(hash);
            stakes[hash] = emptyStake;
        }

        totalStaked -= numTokens;
        blcks.mint(msg.sender, numTokens);

        emit tokensCollected(msg.sender, numTokens);
    }
}