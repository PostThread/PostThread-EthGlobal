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
                    "internalType": "contract Post",
                    "name": "_posts",
                    "type": "address"
                },
                {
                    "internalType": "contract Comment",
                    "name": "_comments",
                    "type": "address"
                },
                {
                    "internalType": "contract User",
                    "name": "_users",
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
                        }
                    ],
                    "internalType": "struct Manager.Costs",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "commentId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "n",
                    "type": "uint256"
                }
            ],
            "name": "getChildData",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
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
            "name": "getPostData",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
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
                    "internalType": "string",
                    "name": "link",
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
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "stakes",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "blockNumber",
                    "type": "uint256"
                },
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
        }
    ]
}