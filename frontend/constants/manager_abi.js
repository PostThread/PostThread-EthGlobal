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
                    "name": "userId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "postId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "numTokens",
                    "type": "uint256"
                }
            ],
            "name": "postStaked",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "numTokens",
                    "type": "uint256"
                }
            ],
            "name": "tokensCollected",
            "type": "event"
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "postId",
                    "type": "uint256"
                }
            ],
            "name": "calculateEarnings",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "mintUser",
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
                            "name": "upvotePost",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "upvoteComment",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "downvotePost",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "downvoteComment",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "post",
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
                            "name": "propose",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Manager.Values",
                    "name": "_costs",
                    "type": "tuple"
                }
            ],
            "name": "changeCosts",
            "outputs": [],
            "stateMutability": "nonpayable",
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
                    "name": "userId",
                    "type": "uint256"
                }
            ],
            "name": "collect",
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
            "name": "costs",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "mintUser",
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
                    "name": "upvotePost",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "upvoteComment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "downvotePost",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "downvoteComment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "post",
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
                    "name": "propose",
                    "type": "uint256"
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
                    "name": "commentId",
                    "type": "uint256"
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
                    "name": "postId",
                    "type": "uint256"
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
                    "name": "userIdToFollow",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "userIdThatFollowed",
                    "type": "uint256"
                }
            ],
            "name": "follow",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "proposalId",
                    "type": "uint256"
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
                }
            ],
            "name": "mintUser",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "rewards",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "mintUser",
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
                    "name": "upvotePost",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "upvoteComment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "downvotePost",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "downvoteComment",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "post",
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
                    "name": "propose",
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
                    "name": "userIdToUnFollowed",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "userIdThatUnFollowed",
                    "type": "uint256"
                }
            ],
            "name": "unFollow",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "updateBaseFee",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "commentId",
                    "type": "uint256"
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
                    "name": "postId",
                    "type": "uint256"
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
                }
            ],
            "name": "voteOnProposal",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
}