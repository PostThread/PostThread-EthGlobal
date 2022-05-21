module.exports = {
    post_abi: [
        {
            "inputs": [
                {
                    "internalType": "contract Comment",
                    "name": "_comments",
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
                    "components": [
                        {
                            "components": [
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
                            "internalType": "struct Input.MetaData",
                            "name": "metaData",
                            "type": "tuple"
                        },
                        {
                            "internalType": "uint256",
                            "name": "inputId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "userId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "blockMint",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "commentsHead",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "usersStaked",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "bool",
                            "name": "isNSFW",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "upvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "downvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalStaked",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalReward",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "stakesClaimed",
                            "type": "bool"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct Input.InputStruct",
                    "name": "input",
                    "type": "tuple"
                },
                {
                    "components": [
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
                    "indexed": false,
                    "internalType": "struct Input.MetaData",
                    "name": "metaData",
                    "type": "tuple"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "inputEvent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "components": [
                        {
                            "components": [
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
                            "internalType": "struct Input.MetaData",
                            "name": "metaData",
                            "type": "tuple"
                        },
                        {
                            "internalType": "uint256",
                            "name": "inputId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "userId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "blockMint",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "commentsHead",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "usersStaked",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "bool",
                            "name": "isNSFW",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "upvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "downvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalStaked",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalReward",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "stakesClaimed",
                            "type": "bool"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct Input.InputStruct",
                    "name": "post",
                    "type": "tuple"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "postMinted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "components": [
                        {
                            "components": [
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
                            "internalType": "struct Input.MetaData",
                            "name": "metaData",
                            "type": "tuple"
                        },
                        {
                            "internalType": "uint256",
                            "name": "inputId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "userId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "blockMint",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "commentsHead",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "usersStaked",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "bool",
                            "name": "isNSFW",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "upvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "downvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalStaked",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalReward",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "stakesClaimed",
                            "type": "bool"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct Input.InputStruct",
                    "name": "post",
                    "type": "tuple"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "isStaked",
                    "type": "bool"
                }
            ],
            "name": "stakedEvent",
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
                    "name": "parentId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "commentId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "addComment",
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
                    "name": "commentId",
                    "type": "uint256"
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
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "burnComment",
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
                    "name": "inputId",
                    "type": "uint256"
                }
            ],
            "name": "getInput",
            "outputs": [
                {
                    "components": [
                        {
                            "components": [
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
                            "internalType": "struct Input.MetaData",
                            "name": "metaData",
                            "type": "tuple"
                        },
                        {
                            "internalType": "uint256",
                            "name": "inputId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "userId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "blockMint",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "commentsHead",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "usersStaked",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "bool",
                            "name": "isNSFW",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint256",
                            "name": "upvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "downvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalStaked",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalReward",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "stakesClaimed",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct Input.InputStruct",
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
                    "name": "inputId",
                    "type": "uint256"
                }
            ],
            "name": "getInputComments",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
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
                },
                {
                    "internalType": "uint256",
                    "name": "postId",
                    "type": "uint256"
                }
            ],
            "name": "getStakedReward",
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
            "name": "getStakedUsers",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
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
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "idToInput",
            "outputs": [
                {
                    "components": [
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
                    "internalType": "struct Input.MetaData",
                    "name": "metaData",
                    "type": "tuple"
                },
                {
                    "internalType": "uint256",
                    "name": "inputId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "blockMint",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isNSFW",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "upvotes",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "downvotes",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "totalStaked",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "totalReward",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "stakesClaimed",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "inputId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "labelInputAsNSFW",
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
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
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
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
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
            "name": "numBlocksForRewards",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "postIds",
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
                    "name": "commentId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "parentId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "removeIdFromCommentList",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "postId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "reward",
                    "type": "uint256"
                }
            ],
            "name": "rewardPost",
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
                    "name": "inputId",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "onPost",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "setAsNSFW",
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
                    "internalType": "uint256",
                    "name": "userScore",
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
                    "name": "postId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "unstakeAll",
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
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "isUp",
                    "type": "bool"
                }
            ],
            "name": "voteOnComment",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "inputId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "isUp",
                    "type": "bool"
                }
            ],
            "name": "voteOnInput",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
}