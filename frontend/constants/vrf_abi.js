module.exports = {
    vrf_abi: [
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "subscriptionId",
                    "type": "uint64"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "have",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "want",
                    "type": "address"
                }
            ],
            "name": "OnlyCoordinatorCanFulfill",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "getRandomNumber",
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
                    "name": "requestId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256[]",
                    "name": "randomWords",
                    "type": "uint256[]"
                }
            ],
            "name": "rawFulfillRandomWords",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "requestRandomWords",
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
            "name": "s_randomWords",
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
            "name": "s_requestId",
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