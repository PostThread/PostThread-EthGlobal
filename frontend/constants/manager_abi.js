module.exports = {
    manager_abi: [
        {
            "inputs": [
                {
                    "internalType": "contract Block",
                    "name": "_blcks",
                    "type": "address"
                },
                {
                    "internalType": "contract NTBlock",
                    "name": "_ntblcks",
                    "type": "address"
                },
                {
                    "internalType": "contract Post",
                    "name": "_posts",
                    "type": "address"
                },
                {
                    "internalType": "contract User",
                    "name": "_users",
                    "type": "address"
                },
                {
                    "internalType": "contract DAO",
                    "name": "_dao",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_communityWallet",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_devWallet",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "postReward",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "blockReward",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "activityAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "topRewardPercentage",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "count",
                    "type": "uint256"
                }
            ],
            "name": "test",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "activityBottom",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "parent",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "postId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "child",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "activityHead",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "parent",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "postId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "child",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "adjustmentPercentage",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "blockConstructed",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "blockOfLastPost",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "blockSize",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "blockToPostCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "blocksInADay",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_devFee",
                    "type": "uint256"
                }
            ],
            "name": "changeDevFee",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "postId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "collectAllStakes",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "communityWallet",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "devFee",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "devWallet",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "userIdOfInteractor",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "commentId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "postId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "downvoteComment",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "userIdOfInteractor",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "postId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "downvotePost",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "numTokens",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "faucet",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "userIdProtagonist",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "userIdAntagonist",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "follow",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "gasFee",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getTargetReward",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getWeights",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "proposalVote",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "upvoteComment",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "downvoteComment",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "upvotePost",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "downvotePost",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "follow",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "unFollow",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "comment",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "stake",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "post",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "propose",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "mintUser",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Manager.Weights",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "userIdOfInteractor",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "proposalId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "implementProposal",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "username",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "text",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "parentId",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "onPost",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "isNSFW",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "makeComment",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "username",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "category",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "text",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "link",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "stakingTip",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isNSFW",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "mintPost",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "bytes",
                    "name": "parameters",
                    "type": "bytes"
                },
                {
                    "internalType": "string[]",
                    "name": "votingOptions",
                    "type": "string[]"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "mintProposal",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "userName",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "mintUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "numActivities",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "numDigits",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "numPostsToReward",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "parent",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "postId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "child",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Manager.Activity",
                    "name": "activity",
                    "type": "tuple"
                },
                {
                    "internalType": "uint256",
                    "name": "iter",
                    "type": "uint256"
                }
            ],
            "name": "orderActivity",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "postIdToActivity",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "parent",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "postId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "child",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "prevIter",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "prevTargetReward",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "replenishUserNTBlocks",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "iter",
                    "type": "uint256"
                }
            ],
            "name": "rewardBlock",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "proposalVote",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "upvoteComment",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "downvoteComment",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "upvotePost",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "downvotePost",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "follow",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "unFollow",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "comment",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "stake",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "post",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "propose",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "mintUser",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Manager.Weights",
                    "name": "_weights",
                    "type": "tuple"
                }
            ],
            "name": "setWeights",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "postId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "numTokens",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "stakeOnPost",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "targetPercentageRewardPerDay",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "topRewardPercentage",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "totalActivity",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "userIdProtagonist",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "userIdAntagonist",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "unFollow",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "postId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "weight",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "userScore",
                    "type": "uint256"
                }
            ],
            "name": "updateActivity",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "userIdOfInteractor",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "commentId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "postId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "upvoteComment",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "userIdOfInteractor",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "postId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "upvotePost",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "proposalId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "optionNumber",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "numVotes",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "voteOnProposal",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "weights",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "proposalVote",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "upvoteComment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "downvoteComment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "upvotePost",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "downvotePost",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "follow",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "unFollow",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "comment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "stake",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "post",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "propose",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "mintUser",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
}