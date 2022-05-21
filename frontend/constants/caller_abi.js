module.exports = {
    caller_abi: [
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
                    "internalType": "contract Manager",
                    "name": "_manager",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "postId",
                    "type": "uint256"
                }
            ],
            "name": "collectAllStakes",
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
                    "name": "userIdProtagonist",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "userIdAntagonist",
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
            "name": "getGasFee",
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
                    "name": "userId",
                    "type": "uint256"
                }
            ],
            "name": "getUserQuest",
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
                    "internalType": "uint256",
                    "name": "userIdOfInteractor",
                    "type": "uint256"
                },
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                }
            ],
            "name": "setDailyQuest",
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
                }
            ],
            "name": "stakeOnPost",
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