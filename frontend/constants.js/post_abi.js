module.exports = {
    abi: [
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
                            "internalType": "bytes32",
                            "name": "userHash",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "uint256",
                            "name": "blockNumber",
                            "type": "uint256"
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
                            "name": "upvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "downvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes32[]",
                            "name": "childCommentHeads",
                            "type": "bytes32[]"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "hash",
                            "type": "bytes32"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct Post.CommentStruct",
                    "name": "comment",
                    "type": "tuple"
                }
            ],
            "name": "commentCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "bytes32",
                            "name": "userHash",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "uint256",
                            "name": "blockNumber",
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
                            "internalType": "bytes32[]",
                            "name": "commentsHead",
                            "type": "bytes32[]"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "hash",
                            "type": "bytes32"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct Post.PostStruct",
                    "name": "post",
                    "type": "tuple"
                }
            ],
            "name": "downvoteHappened",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "bytes32",
                            "name": "userHash",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "uint256",
                            "name": "blockNumber",
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
                            "internalType": "bytes32[]",
                            "name": "commentsHead",
                            "type": "bytes32[]"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "hash",
                            "type": "bytes32"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct Post.PostStruct",
                    "name": "post",
                    "type": "tuple"
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
                            "internalType": "bytes32",
                            "name": "userHash",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "uint256",
                            "name": "blockNumber",
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
                            "internalType": "bytes32[]",
                            "name": "commentsHead",
                            "type": "bytes32[]"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "hash",
                            "type": "bytes32"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct Post.PostStruct",
                    "name": "post",
                    "type": "tuple"
                }
            ],
            "name": "upvoteHappened",
            "type": "event"
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
                    "internalType": "bytes32",
                    "name": "usernameHash",
                    "type": "bytes32"
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
                    "internalType": "bytes32",
                    "name": "commentHash",
                    "type": "bytes32"
                }
            ],
            "name": "commentOnComment",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "usernameHash",
                    "type": "bytes32"
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
                    "internalType": "bytes32",
                    "name": "postHash",
                    "type": "bytes32"
                }
            ],
            "name": "commentOnPost",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "hash",
                    "type": "bytes32"
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
                    "internalType": "bytes32",
                    "name": "commentHash",
                    "type": "bytes32"
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
                    "internalType": "bytes32",
                    "name": "commentHash",
                    "type": "bytes32"
                }
            ],
            "name": "getComment",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "bytes32",
                            "name": "userHash",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "uint256",
                            "name": "blockNumber",
                            "type": "uint256"
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
                            "name": "upvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "downvotes",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes32[]",
                            "name": "childCommentHeads",
                            "type": "bytes32[]"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "hash",
                            "type": "bytes32"
                        }
                    ],
                    "internalType": "struct Post.CommentStruct",
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
                    "internalType": "bytes32",
                    "name": "commentHash",
                    "type": "bytes32"
                }
            ],
            "name": "getCommentComments",
            "outputs": [
                {
                    "internalType": "bytes32[]",
                    "name": "",
                    "type": "bytes32[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "postHash",
                    "type": "bytes32"
                }
            ],
            "name": "getPost",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "bytes32",
                            "name": "userHash",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "uint256",
                            "name": "blockNumber",
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
                            "internalType": "bytes32[]",
                            "name": "commentsHead",
                            "type": "bytes32[]"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "hash",
                            "type": "bytes32"
                        }
                    ],
                    "internalType": "struct Post.PostStruct",
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
                    "internalType": "bytes32",
                    "name": "postHash",
                    "type": "bytes32"
                }
            ],
            "name": "getPostComments",
            "outputs": [
                {
                    "internalType": "bytes32[]",
                    "name": "",
                    "type": "bytes32[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "postHash",
                    "type": "bytes32"
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
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "hashToComment",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "userHash",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "blockNumber",
                    "type": "uint256"
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
                    "name": "upvotes",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "downvotes",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes32",
                    "name": "hash",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
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
            "name": "hashToPost",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "userHash",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "blockNumber",
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
                    "internalType": "bytes32",
                    "name": "hash",
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
                    "internalType": "bytes32",
                    "name": "userHash",
                    "type": "bytes32"
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
            "name": "posts",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "userHash",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "blockNumber",
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
                    "internalType": "bytes32",
                    "name": "hash",
                    "type": "bytes32"
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
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "safeMint",
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
                    "internalType": "bytes32",
                    "name": "hash",
                    "type": "bytes32"
                }
            ],
            "name": "upvote",
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
            "name": "userPostDownvoteCount",
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
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "userPostUpvoteCount",
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