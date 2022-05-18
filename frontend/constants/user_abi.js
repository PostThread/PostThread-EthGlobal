module.exports = {
    user_abi: [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "role",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "previousAdminRole",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "newAdminRole",
                    "type": "bytes32"
                }
            ],
            "name": "RoleAdminChanged",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "role",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "RoleGranted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "role",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "RoleRevoked",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "iter",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "newBetweenness",
                    "type": "uint256"
                }
            ],
            "name": "betweennessUpdate",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "userIdStarting",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "userIdCurrent",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "userIdFollower",
                    "type": "uint256"
                },
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "size",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "prev",
                            "type": "uint256[]"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct User.ShortestPath",
                    "name": "SP",
                    "type": "tuple"
                }
            ],
            "name": "centralitiesUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "iter",
                    "type": "uint256"
                }
            ],
            "name": "fired",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "userId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "blockMinted",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "username",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "followers",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "following",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalUpvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalDownvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "experience",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "level",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "expToNextLvl",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "captureRate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "degreeCentrality",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "farnessCentrality",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "betweennessCentrality",
                            "type": "uint256"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct User.UserStruct",
                    "name": "user",
                    "type": "tuple"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "followHappened",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "startingUserId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "currentUserId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "followerUserId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "depth",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "p",
                    "type": "uint256"
                }
            ],
            "name": "printStartCurrent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "userId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "blockMinted",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "username",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "followers",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "following",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalUpvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalDownvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "experience",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "level",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "expToNextLvl",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "captureRate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "degreeCentrality",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "farnessCentrality",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "betweennessCentrality",
                            "type": "uint256"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct User.UserStruct",
                    "name": "user",
                    "type": "tuple"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "unFollowHappened",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "userId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "blockMinted",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "username",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "followers",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "following",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalUpvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalDownvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "experience",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "level",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "expToNextLvl",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "captureRate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "degreeCentrality",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "farnessCentrality",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "betweennessCentrality",
                            "type": "uint256"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct User.UserStruct",
                    "name": "user",
                    "type": "tuple"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "userMinted",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "DEFAULT_ADMIN_ROLE",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "MINTER_ROLE",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "exp",
                    "type": "uint256"
                },
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
            "name": "addExp",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
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
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "burn",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "startingUserId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "currentUserId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "followerUserId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "depth",
                    "type": "uint256"
                }
            ],
            "name": "calculateCentralityValues",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
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
                            "name": "worldID",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "email",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "twoStepVerification",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "postVote",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "commentVote",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "daoVote",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct User.Rewards",
                    "name": "_rewards",
                    "type": "tuple"
                }
            ],
            "name": "changeRewards",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "userIdThatFollowed",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "userIdToFollow",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getApproved",
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
                    "name": "userId",
                    "type": "uint256"
                }
            ],
            "name": "getCentralityScore",
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
            "name": "getLevel",
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
                    "internalType": "bytes32",
                    "name": "role",
                    "type": "bytes32"
                }
            ],
            "name": "getRoleAdmin",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
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
            "name": "getScore",
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
            "name": "getUser",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "userId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "blockMinted",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "username",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "followers",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "following",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalUpvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalDownvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "experience",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "level",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "expToNextLvl",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "captureRate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "degreeCentrality",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "farnessCentrality",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "betweennessCentrality",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct User.UserStruct",
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
                    "name": "userId",
                    "type": "uint256"
                }
            ],
            "name": "getsCentralitiesNormalized",
            "outputs": [
                {
                    "internalType": "uint256[3]",
                    "name": "",
                    "type": "uint256[3]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "minter",
                    "type": "address"
                }
            ],
            "name": "grantMinterRole",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "role",
                    "type": "bytes32"
                },
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "grantRole",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "role",
                    "type": "bytes32"
                },
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "hasRole",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "maxMintsPerWallet",
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
                    "internalType": "string",
                    "name": "username",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "mintUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
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
            "name": "numNodes",
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
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "numUsersMinted",
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
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ownerOf",
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
            "name": "prevFollowerIter",
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
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
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
            "name": "prevFollowerUsersDepth",
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
            "name": "prevFollowingIter",
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
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "prevFollowingUsers",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "role",
                    "type": "bytes32"
                },
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "renounceRole",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "role",
                    "type": "bytes32"
                },
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "revokeRole",
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
                    "name": "worldID",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "email",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "twoStepVerification",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "postVote",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "commentVote",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "daoVote",
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
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "newMax",
                    "type": "uint256"
                }
            ],
            "name": "setMaxMintsPerWallet",
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
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "shortestPath",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "size",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
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
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
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
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
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
                    "name": "startingUserId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "currentUserId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "depth",
                    "type": "uint256"
                }
            ],
            "name": "updateCentrality",
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
            "name": "updateFromFollowHead",
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
            "name": "userIdToUser",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "blockMinted",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "username",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "totalUpvotes",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "totalDownvotes",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "experience",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "level",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "expToNextLvl",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "captureRate",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "degreeCentrality",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "farnessCentrality",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "betweennessCentrality",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "usernameCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
}