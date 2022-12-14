// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Block.sol";
import "./Post.sol";
import "./User.sol";
import "./DAO.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

contract Manager is Ownable, VRFConsumerBaseV2 {
    Block blcks;
    NTBlock ntblcks;
    Post posts;
    User users;
    DAO dao;

    enum Quests {
        vote,
        post,
        comment,
        follow,
        end 
    }

    struct Weights {
        uint256 proposalVote;
        uint256 upvoteComment;
        uint256 downvoteComment;
        uint256 upvotePost;
        uint256 downvotePost;
        uint256 follow;
        uint256 unFollow;
        uint256 comment;
        uint256 stake;
        uint256 post;
        uint256 propose;
        uint256 mintUser;
    }

    struct Activity {
        uint parent;
        uint postId;
        uint amount;
        uint child;
    }

    address public communityWallet;
    address public devWallet;
    uint public devFee;
    uint public numDigits = 10**(9-1);
    uint public targetPercentageRewardPerDay = (1 * numDigits) / 100;

    // Weights are how much interactions cost as well as how much weight they have in rewards
    Weights public weights = Weights(1, 1, 1, 5, 5, 50, 25, 200, 200, 1000, 5000, 50000);
    // Gas fee starts at 1 and increases based on site usage
    uint public gasFee = 1;
    // activity tracker is reset each blockSize and the top posts are rewarded
    Activity public activityHead;
    Activity public activityBottom;
    mapping(uint => mapping(uint => Activity)) public postIdToActivity;
    mapping(uint => uint) public totalActivity;
    mapping(uint => uint) public numActivities;

    uint public topRewardPercentage = (numDigits * 25) / 100;
    uint public numPostsToReward = 10;
    uint public prevIter;
    uint public blockConstructed;
    uint public blockOfLastPost;
    uint public blocksInADay = 43000;
    uint public blockSize = 5;
    uint public prevTargetReward;
    uint public adjustmentPercentage = (125 * numDigits) / 1000;
    mapping(uint => uint) public blockToPostCount;

    // chainlink variables
    uint256 public randomness;
    uint256 public fee;
    bytes32 public keyhash;
    event RequestedRandomness(uint256 requestId);
    mapping(uint256 => uint) requestIdToUserId;
    VRFCoordinatorV2Interface COORDINATOR;
    uint64 s_subscriptionId;
    uint32 callbackGasLimit = 40000;
    uint16 requestConfirmations = 3;
    event randomnessFullfilled(uint userId, uint indexOfQuest);

    constructor(
        Block _blcks,
        NTBlock _ntblcks,
        Post _posts,
        User _users,
        DAO _dao,
        address _communityWallet,
        address _devWallet,
        address _vrfCoordinator,
        bytes32 _keyhash, 
        uint64 _s_subscriptionId
    ) VRFConsumerBaseV2(_vrfCoordinator) {
        blcks = _blcks;
        ntblcks = _ntblcks;
        posts = _posts;
        users = _users;
        dao = _dao;
        communityWallet = _communityWallet;
        devWallet = _devWallet;
        devFee = 25;

        blockConstructed = block.number;
        prevIter = block.number;

        // chainlink
        COORDINATOR = VRFCoordinatorV2Interface(_vrfCoordinator);
        keyhash = _keyhash;
        s_subscriptionId = _s_subscriptionId;
    }

    function setDailyQuest(uint userId) public {
        uint256 requestId = COORDINATOR.requestRandomWords(
            keyhash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            1
        );
        requestIdToUserId[requestId] = userId;
        emit RequestedRandomness(requestId);
    }

    function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomness)
        internal
        override
    {
        require(_randomness[0] > 0, "random-not-found");
        uint256 indexOfQuest = _randomness[0] % uint(Quests.end);
        uint userId = requestIdToUserId[_requestId];
        users.setUserQuest(userId, indexOfQuest);
        randomness = _randomness[0];
        emit randomnessFullfilled(userId, indexOfQuest);
    }

    function setWeights(Weights memory _weights) public onlyOwner {
        weights = _weights;
    }

    function getWeights() public view returns(Weights memory) {
        return weights;
    }

    function getTargetReward() public view returns(uint) {
        return targetPercentageRewardPerDay * blcks.totalSupply() / blocksInADay / blockSize / numDigits;
    }

    function replenishUserNTBlocks(uint userId, address sender) public {
        (uint level,) = users.getLevelAndExpNeeded(userId);
        ntblcks.mint(sender, level * 5000);
    }

    event test(uint postReward, uint blockReward, uint activityAmount, uint topRewardPercentage, uint count);
    function rewardBlock(uint iter) public {
        uint blockReward = getTargetReward();

        Activity memory activity = activityHead;
        if (activity.child == 0) {
            // no activity this block
            if (gasFee == 1) {
                // mint surplus as ntblck to community wallet
                ntblcks.mint(communityWallet, blockReward);
            } else {
                // reduce gas fee
                gasFee *= (numDigits - adjustmentPercentage);
                if (gasFee < 1) {
                    gasFee = 1;
                }
            }
        } else {
            // Reward the top rewardPercentage of activity
            uint rewardedActivity = 0; 
            uint rewardedPercentage = 0;
            uint count = 0;
            while (rewardedPercentage < topRewardPercentage && activity.child != 0) {
                rewardedActivity += activity.amount;
                rewardedPercentage = (numDigits * rewardedActivity) / totalActivity[iter];

                uint postReward = (blockReward * activity.amount * numDigits) / topRewardPercentage;
                posts.rewardPost(activity.postId, postReward);
                activity = postIdToActivity[iter][activity.child];
                count++;
                emit test(postReward, blockReward, activity.amount, topRewardPercentage, count);
            }

            // If percentage of posts not getting paid is too high then increase gas fee
            if ((count * numDigits) / numActivities[iter] < (25 * numDigits) / 100) {
                gasFee *= (numDigits + adjustmentPercentage);
            }
        }
    }

    function orderActivity(Activity memory activity, uint iter) public {
        Activity memory activityParent;
        while (activity.parent != 0 && activity.amount > activityParent.amount) {
            activityParent = postIdToActivity[iter][activity.parent];
            // Swap ids and children
            postIdToActivity[iter][activity.parent].parent = activity.parent;
            postIdToActivity[iter][activity.parent].child = activity.child;

            postIdToActivity[iter][activity.postId].parent = activityParent.parent;
            postIdToActivity[iter][activity.postId].child = activityParent.child;

            if (activity.child == 0) {
                activityBottom = activityParent;
            }
            activity =  postIdToActivity[iter][activity.parent];
        }
        if (activity.parent == 0) {
            activityHead = activity;
        }
    }


    function updateActivity(uint postId, uint weight, uint userScore) public {
        uint iter = (block.number - blockConstructed) / blockSize;
        for (uint256 i; i < iter; i++) {
            rewardBlock(iter);
        }

        Activity memory activity = postIdToActivity[iter][postId];
        
        if (activity.parent == 0 && activity.child == 0) {
            // activity doesnt exist yet
            numActivities[iter]++;
            if (numActivities[iter] == 1) {
                // first activity this block
                activity = Activity(0, postId, weight * userScore, 0);
                postIdToActivity[iter][postId] = activity;
                activityHead = activity;
                activityBottom = activity;
            } else {
                activity = Activity(activityBottom.postId, postId, weight * userScore, 0);
                postIdToActivity[iter][postId] = activity;
                orderActivity(activity, iter);
            }
        } else {
            postIdToActivity[iter][postId].amount += weight * userScore;
            orderActivity(activity, iter);
        }
        totalActivity[iter] += weight * userScore;
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
                // ntblcks.approve(sender, cost);
                ntblcks.burnFrom(sender, cost);
            }

            // Fee that goes to the devs
            // uint fee = amountLeft * devFee / 1000;
            // blcks.approve(sender, fee);
            // blcks.transferFrom(sender, devWallet, fee);
            // The rest is converted into ntblcks
            // blcks.approve(sender, amountLeft - fee);
            blcks.burnFrom(sender, amountLeft);
            ntblcks.mint(communityWallet, amountLeft);
        }
        _;
    }

    function changeDevFee(uint _devFee) public onlyOwner {
        devFee = _devFee;
    }

    function upvotePost(uint userIdOfInteractor, uint postId, address sender) 
        public sendFunds(gasFee * weights.upvotePost, sender)
    {
        if (users.getUserQuest(userIdOfInteractor) == uint(Quests.vote)) {
            users.addExp(1000, userIdOfInteractor, sender);
        }

        uint userScore = users.getScore(userIdOfInteractor);
        // updateActivity(postId, weights.upvotePost, userScore);

        users.addExp(weights.upvotePost, userIdOfInteractor, sender);
        posts.voteOnInput(postId, sender, true);
    }

    function downvotePost(
            uint userIdOfInteractor, uint postId,
            address sender
        ) public sendFunds(gasFee * weights.downvotePost, sender)
    {
        if (users.getUserQuest(userIdOfInteractor) == uint(Quests.vote)) {
            users.addExp(1000, userIdOfInteractor, sender);
        }

        uint userScore = users.getScore(userIdOfInteractor);
        updateActivity(postId, weights.downvotePost, userScore);

        users.addExp(weights.downvotePost, userIdOfInteractor, sender);
        posts.voteOnInput(postId, sender, false);
    }

    function upvoteComment(
            uint userIdOfInteractor, uint commentId, uint postId,
            address sender
        ) public sendFunds(gasFee * weights.upvoteComment, sender) 
    {
        if (users.getUserQuest(userIdOfInteractor) == uint(Quests.vote)) {
            users.addExp(1000, userIdOfInteractor, sender);
        }
        // uint userScore = users.getScore(userIdOfInteractor);
        // updateActivity(postId, weights.upvoteComment, userScore);

        users.addExp(weights.upvoteComment, userIdOfInteractor, sender);
        posts.voteOnComment(commentId, sender, true);
    }

    function downvoteComment(
            uint userIdOfInteractor, uint commentId, uint postId,
            address sender
        ) public sendFunds(gasFee * weights.downvoteComment, sender) 
    {
        if (users.getUserQuest(userIdOfInteractor) == uint(Quests.vote)) {
            users.addExp(1000, userIdOfInteractor, sender);
        }
        uint userScore = users.getScore(userIdOfInteractor);
        updateActivity(postId, weights.downvoteComment, userScore);

        users.addExp(weights.downvoteComment, userIdOfInteractor, sender);
        posts.voteOnComment(commentId, sender, false);
    }

    function mintUser(string memory userName, address sender) 
        public sendFunds(gasFee * weights.mintUser, sender) 
    {
        // userIdOfInteractor is 0 if its new user. Non 0 if existing user mints a new one
        // users.addExp(weights.mintUser, userIdOfInteractor, sender);
        users.mintUser(userName, sender);
    }

    function follow(
            uint256 userIdProtagonist, uint256 userIdAntagonist,
            address sender
        ) public 
    {
        if (users.getUserQuest(userIdProtagonist) == uint(Quests.follow)) {
            users.addExp(1000, userIdProtagonist, sender);
        }
        // users.addExp(weights.follow, userIdProtagonist, sender);
        users.follow(userIdProtagonist, userIdAntagonist, sender);
    }

    function unFollow(
            uint256 userIdProtagonist, uint256 userIdAntagonist,
            address sender
        ) public sendFunds(gasFee * weights.unFollow, sender)
    {
        users.addExp(weights.unFollow, userIdProtagonist, sender);
        users.unFollow(userIdProtagonist, userIdAntagonist, sender);
    }

    function mintPost(
            uint userId,
            string memory username,
            string memory category, 
            string memory title, 
            string memory text, 
            string memory link,
            uint stakingTip,
            bool isNSFW,
            address sender
        ) public sendFunds(gasFee * weights.post, sender) 
    {    
        if (users.getUserQuest(userId) == uint(Quests.post)) {
            users.addExp(1000, userId, sender);
        }
        users.addExp(weights.post, userId, sender);
        posts.mintPost(userId, username, category, title, text, link, sender, stakingTip, isNSFW);
        blockOfLastPost = block.number;
        blockToPostCount[block.number/blockSize]++;
    }

    function makeComment(
            uint userId, 
            string memory username,
            string memory text, 
            uint parentId,
            bool onPost,
            bool isNSFW,
            address sender
        ) public sendFunds(gasFee * weights.comment, sender) 
    {
        if (users.getUserQuest(userId) == uint(Quests.comment)) {
            users.addExp(1000, userId, sender);
        }
        users.addExp(weights.comment, userId, sender);
        posts.makeComment(userId, username, text, parentId, onPost, sender, isNSFW);
    }

    function stakeOnPost(
            uint256 userId,
            uint256 postId,
            uint256 numTokens,
            address sender
        ) public sendFunds(gasFee * weights.stake, sender) 
    {
        uint userScore = users.getScore(userId);
        updateActivity(postId, weights.stake, userScore);

        users.addExp(weights.stake, userId, sender);
        posts.stakeOnPost(userId, postId, numTokens, userScore, sender);
    }

    function mintProposal(
        uint userId, string memory description, bytes memory parameters, 
        string[] memory votingOptions, address sender
    ) public sendFunds(gasFee * weights.propose, sender) 
    {
        users.addExp(weights.propose, userId, sender);
        dao.mintProposal(userId, description, parameters, votingOptions, sender);
    } 

    function voteOnProposal(
            uint proposalId, uint userId, 
            uint optionNumber, uint numVotes,
            address sender
        ) public sendFunds(gasFee * weights.proposalVote, sender) 
    {
        users.addExp(weights.proposalVote*5, userId, sender);
        dao.voteOnProposal(proposalId, userId, optionNumber, numVotes);
    }

    // called from bounty button
    function implementProposal(uint userIdOfInteractor, uint proposalId, address sender) 
        public sendFunds(gasFee * dao.getBounty(proposalId), sender) 
    {
        users.addExp(1000, userIdOfInteractor, sender);

        (uint winningOptionId, string memory winningOption, bytes memory parameters) = dao.getPurposalResult(proposalId);
        
        // hard code every function DAO can call
        bytes32 winningOptionHashed = keccak256(abi.encodePacked(winningOption));
        if (winningOptionHashed == keccak256(abi.encodePacked("setAsNSFW"))) {
            (uint inputId, bool onPost) = abi.decode(parameters, (uint, bool));
            posts.setAsNSFW(inputId, onPost, sender);
        } else if (winningOptionHashed == keccak256(abi.encodePacked("deletePost"))) {
            (uint postId) = abi.decode(parameters, (uint));
            posts.burn(postId);
        } else if (winningOptionHashed == keccak256(abi.encodePacked("deleteComment"))) {
            (uint commentId, uint postId) = abi.decode(parameters, (uint, uint));
            posts.burnComment(commentId, postId, false, sender);
        } 
    }

    function collectAllStakes(uint postId, address sender) public {
        uint[] memory userIds = posts.getStakedUsers(postId);
        for (uint256 i; i < userIds.length; i++) {
            uint reward = posts.getStakedReward(userIds[i], postId);
            blcks.mint(users.ownerOf(userIds[i]), reward);
        }
        posts.unstakeAll(postId, sender);
    }

    function faucet(uint256 numTokens, address sender) public {
        // faucet for testing purposes
        blcks.mint(sender, numTokens);
        ntblcks.mint(sender, numTokens);
    }
}
