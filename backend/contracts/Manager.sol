// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Block.sol";
import "./Post.sol";
import "./User.sol";
import "./DAO.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Manager is Ownable {
    Block blcks;
    NTBlock ntblcks;
    Post posts;
    User users;
    DAO dao;

    address public communityWallet;
    address public devWallet;
    uint public devFee;
    uint public numDigits;
    uint public targetPercentageRewardPerDay;

    struct Values {
        uint256 mintUser;
        uint256 follow;
        uint256 unFollow;
        uint256 upvotePost;
        uint256 upvoteComment;
        uint256 downvotePost;
        uint256 downvoteComment;
        uint256 post;
        uint256 comment;
        uint256 stake;
        uint256 propose;
    }

    Values public costs;
    Values public rewards;
    uint blockOfLastPost;
    uint blocksInADay = 430000;
    uint blockSize = 25;
    uint prevTargetReward;
    uint adjustmentPercentage = (125 * numDigits) / 1000;
    mapping(uint => uint) public blockToPostCount;

    event tokensCollected(address sender, uint256 numTokens);
    event postStaked(uint256 userId, uint256 postId, uint256 numTokens);

    constructor(
        Block _blcks,
        NTBlock _ntblcks,
        Post _posts,
        User _users,
        DAO _dao,
        address _communityWallet,
        address _devWallet
    ) {
        blcks = _blcks;
        ntblcks = _ntblcks;
        posts = _posts;
        users = _users;
        dao = _dao;
        communityWallet = _communityWallet;
        devWallet = _devWallet;
        devFee = 25;

        numDigits = 10**(9-1);
        targetPercentageRewardPerDay = (1 * numDigits) / 100;
        prevTargetReward = getTargetReward();

        costs = Values(1000, 20, 5, 10, 10, 5, 5, 100, 50, 30, 100);
        rewards = Values(1000, 20, 5, 10, 10, 5, 5, 100, 50, 30, 100);
    }

    function getTargetReward() public view returns(uint) {
        return targetPercentageRewardPerDay * blcks.totalSupply() / blocksInADay / blockSize / numDigits;
    }

    function updateBaseFee() public {
        uint blocksSinceLastPost = (blockOfLastPost - block.number) / blockSize;
        if (blocksSinceLastPost == 0) {return;}
        uint postCount = blockToPostCount[blocksSinceLastPost];
        uint targetReward = getTargetReward() / postCount;

        if (blocksSinceLastPost > 1) {
            // for each empty block since the last post, increase the target reward by 12.5%
            // and decrease the base cost by 12.5%
            targetReward *= (numDigits + adjustmentPercentage)**(blocksSinceLastPost - 1);
        } else if (prevTargetReward > targetReward) {
            // if total earned last block was higher than target
            // decrease the target reward by 12.5%
            targetReward *= (numDigits - adjustmentPercentage);
        }
        prevTargetReward = targetReward;
    }

    // check user has funcds and if so sends them
    modifier sendFunds(uint256 cost, address sender) {
        uint bBlckBalance = ntblcks.balanceOf(sender);
        uint blcksBalance = blcks.balanceOf(sender);
        require(
            bBlckBalance + blcksBalance >= cost, 
            "You do not have enough tokens to do that"
        );

        if (bBlckBalance >= cost) {
            ntblcks.burnFrom(sender, cost);
        } else {
            uint amountLeft = cost - bBlckBalance;
            if (bBlckBalance != 0) {
                ntblcks.burnFrom(sender, cost);
            }

            // Fee that goes to the devs
            uint fee = amountLeft * devFee / 1000;
            blcks.transferFrom(sender, communityWallet, amountLeft - fee);
            blcks.transferFrom(sender, devWallet, fee);
        }
        _;
    }

    function changeCosts(Values memory _costs) public onlyOwner {
        costs = _costs;
    }

    function changeDevFee(uint _devFee) public onlyOwner {
        devFee = _devFee;
    }

    function upvotePost(uint postId) public sendFunds(costs.upvotePost, msg.sender) {
        posts.upvote(postId, msg.sender);
    }

    function downvotePost(uint postId) public sendFunds(costs.downvotePost, msg.sender) {
        posts.downvote(postId, msg.sender);
    }

    function upvoteComment(uint commentId) public sendFunds(costs.upvoteComment, msg.sender) {
        posts.upvoteComment(commentId, msg.sender);
    }

    function downvoteComment(uint commentId) public sendFunds(costs.downvoteComment, msg.sender) {
        posts.downvote(commentId, msg.sender);
    }

    function mintUser(string memory userName) public sendFunds(costs.mintUser, msg.sender) {
        users.mintUser(userName, msg.sender);
    }

    function follow(uint256 userIdToFollow, uint256 userIdThatFollowed)
        public sendFunds(costs.follow, msg.sender)
    {
        users.follow(userIdToFollow, userIdThatFollowed, msg.sender);
    }

    function unFollow(uint256 userIdToUnFollowed, uint256 userIdThatUnFollowed)
        public sendFunds(costs.unFollow, msg.sender)
    {
        users.unFollow(userIdToUnFollowed, userIdThatUnFollowed, msg.sender);
    }

    function mintPost(
            uint userId,
            string memory username,
            string memory category, 
            string memory title, 
            string memory text, 
            string memory link,
            uint stakingTip,
            bool isNSFW
        ) public sendFunds(costs.post, msg.sender) 
    {    
        posts.mintPost(userId, username, category, title, text, link, msg.sender, stakingTip, isNSFW);
        blockOfLastPost = block.number;
        blockToPostCount[block.number/blockSize]++;
    }

    function makeComment(
            uint userId, 
            string memory username,
            string memory text, 
            uint parentId,
            bool onPost,
            bool isNSFW
        ) public sendFunds(costs.comment, msg.sender) 
    {
        posts.makeComment(userId, username, text, parentId, onPost, msg.sender, isNSFW);
    }

    function stakeOnPost(
            uint256 userId,
            uint256 postId,
            uint256 numTokens
        ) public sendFunds(costs.stake, msg.sender) 
    {
        uint userScore = users.getScore(userId);
        posts.stake(userId, postId, numTokens, userScore, msg.sender);
    }

    function mintProposal(
        uint userId, string memory description, bytes memory parameters, string[] memory votingOptions
    ) public sendFunds(costs.propose, msg.sender) 
    {
        dao.mintProposal(userId, description, parameters, votingOptions, msg.sender);
    } 

    function voteOnProposal(
        uint proposalId, uint userId, uint optionNumber, uint numVotes
        ) public sendFunds(costs.propose, msg.sender) 
    {
        dao.voteOnProposal(proposalId, userId, optionNumber, numVotes);
    }

    function implementProposal(uint proposalId) 
        public sendFunds(dao.getBounty(proposalId), msg.sender) 
    {
        (uint winningOptionId, string memory winningOption, bytes memory parameters) = dao.getPurposalResult(proposalId);
        
        // hard code every function DAO can call
        bytes32 winningOptionHashed = keccak256(abi.encodePacked(winningOption));
        if (winningOptionHashed == keccak256(abi.encodePacked("setAsNSFW"))) {
            (uint inputId, bool onPost) = abi.decode(parameters, (uint, bool));
            posts.setAsNSFW(inputId, onPost);
        } 
    }

    function calculateEarnings(uint256 postId) public returns (uint256) {
        uint256 s = posts.scorePost(postId);
        return s;
    }

    function collect(uint256 userId) public {
        // bytes32[] memory stakedHashes = users.unstake(userId, msg.sender);
        // // get earnings from users posts
        // uint256 numTokens;
        // for (uint256 i; i < stakedHashes.length; i++) {
        //     numTokens += calculateEarnings(stakes[stakedHashes[i]].postId);
        //     // clear stake
        //     stakes[stakedHashes[i]] = emptyStake;
        // }

        // totalStaked -= numTokens;
        // blcks.mint(msg.sender, numTokens);

        // emit tokensCollected(msg.sender, numTokens);
    }

    function faucet(uint256 numTokens) public {
        // faucet for testing purposes
        blcks.mint(msg.sender, numTokens);
    }
}
