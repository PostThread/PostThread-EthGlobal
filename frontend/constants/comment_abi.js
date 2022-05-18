module.exports = {
    comment_abi: [
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
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "inputId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "username",
                            "type": "string"
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
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "totalComments",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "totalCommentUpvotes",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "totalCommentDownvotes",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "postUpvotes",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "postDownvotes",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "amountStaked",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "stakingTip",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct Input.RewardValues",
                            "name": "rewardValues",
                            "type": "tuple"
                        },
                        {
                            "internalType": "bool",
                            "name": "isNSFW",
                            "type": "bool"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct Input.InputStruct",
                    "name": "comment",
                    "type": "tuple"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "commentMinted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "inputId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "username",
                            "type": "string"
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
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "totalComments",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "totalCommentUpvotes",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "totalCommentDownvotes",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "postUpvotes",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "postDownvotes",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "amountStaked",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "stakingTip",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct Input.RewardValues",
                            "name": "rewardValues",
                            "type": "tuple"
                        },
                        {
                            "internalType": "bool",
                            "name": "isNSFW",
                            "type": "bool"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct Input.InputStruct",
                    "name": "input",
                    "type": "tuple"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "downvoteHappened",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "inputId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "numDownvotes",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "downvoteUndone",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "inputId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "username",
                            "type": "string"
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
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "totalComments",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "totalCommentUpvotes",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "totalCommentDownvotes",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "postUpvotes",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "postDownvotes",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "amountStaked",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "stakingTip",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct Input.RewardValues",
                            "name": "rewardValues",
                            "type": "tuple"
                        },
                        {
                            "internalType": "bool",
                            "name": "isNSFW",
                            "type": "bool"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct Input.InputStruct",
                    "name": "input",
                    "type": "tuple"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "upvoteHappened",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "inputId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "numUpvotes",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "upvoteUndone",
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
                    "name": "inputId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "downvote",
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
                    "name": "inputId",
                    "type": "uint256"
                }
            ],
            "name": "getInput",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "inputId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "username",
                            "type": "string"
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
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "totalComments",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "totalCommentUpvotes",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "totalCommentDownvotes",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "postUpvotes",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "postDownvotes",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "amountStaked",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "stakingTip",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct Input.RewardValues",
                            "name": "rewardValues",
                            "type": "tuple"
                        },
                        {
                            "internalType": "bool",
                            "name": "isNSFW",
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
                    "internalType": "uint256",
                    "name": "inputId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "username",
                    "type": "string"
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
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "totalComments",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalCommentUpvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalCommentDownvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "postUpvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "postDownvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amountStaked",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "stakingTip",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Input.RewardValues",
                    "name": "rewardValues",
                    "type": "tuple"
                },
                {
                    "internalType": "bool",
                    "name": "isNSFW",
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
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "isNSFW",
                    "type": "bool"
                }
            ],
            "name": "mintComment",
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
                }
            ],
            "name": "setCommentAsNSFW",
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
                    "name": "inputId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "upvote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
}