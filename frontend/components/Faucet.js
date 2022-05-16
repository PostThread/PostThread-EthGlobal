import React, { useState } from 'react'
import { Input, Button, useNotification } from 'web3uikit'
import { useWeb3Contract, useMoralis } from 'react-moralis'
import styles from '../styles/Home.module.css'
import { manager_abi } from '../constants/manager_abi'
import { block_abi } from '../constants/block_abi'
import { manager_contract, block_contract } from '../constants/contract_addresses'

export default function Faucet() {

    const [numTokens, setNumTokens] = useState('')
    const { isAuthenticated, account } = useMoralis()
    const dispatch = useNotification()

    const validateInput = () => {
        let result = numTokens > 0 ? true : false
        return result
    }

    const clearInput = () => {
        setNumTokens('')
    }

    const handleAddNotification = () => {
        dispatch({
            type: "success",
            message: "Tokens succesfully sent",
            title: "Success",
            position: "topL"
        })
    }

    const handleErrorNotification = () => {
        dispatch({
            type: "error",
            message: "Something went wrong with your request",
            title: "Error",
            position: "topL"
        })
    }

    const handleInputErrorNotification = () => {
        dispatch({
            type: "error",
            message: "Number of tokens requested must be greater than 0",
            title: "Error",
            position: "topL"
        })
    }

    const { runContractFunction: allowance, error: errorOnAllowance } = useWeb3Contract({
        abi: block_abi,
        contractAddress: block_contract,
        functionName: "allowance",
        params: {
            owner: account,
            spender: manager_contract
        },
    })

    const { runContractFunction: increaseAllowance, error: errorOnincreaseAllowance } = useWeb3Contract({
        abi: block_abi,
        contractAddress: block_contract,
        functionName: "increaseAllowance",
        params: {
            spender: manager_contract,
            addedValue: numTokens
        },
    })

    const { runContractFunction: runFaucet, error: errorFaucet } = useWeb3Contract({
        abi: manager_abi,
        contractAddress: manager_contract,
        functionName: "faucet",
        params: {
            numTokens: numTokens,
        },
    })


    return (
        <div className={styles.addTokens}>
            <Input
                label=""
                name="Username"
                onChange={(e) => setNumTokens(e.target.value)}
                type="number"
            />
            <Button size='large' text='Get Tokens' icon="plus"
                iconLayout="trailing"
                color="blue"
                theme="colored"
                type="button"
                disabled={!isAuthenticated}
                onClick={async () => {
                    if (!validateInput()) {
                        clearInput()
                        return handleInputErrorNotification()
                    }
                    await increaseAllowance()
                    await runFaucet()
                    if (errorFaucet) {
                        console.log(errorFaucet)
                        handleErrorNotification()
                    } else {
                        handleAddNotification()
                    }
                    clearInput()
                }}
            />
        </div>
    )
}
