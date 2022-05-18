import React, { useState } from 'react'
import { Input, Button, useNotification } from 'web3uikit'
import { useWeb3Contract, useMoralis } from 'react-moralis'
import styles from '../../styles/Home.module.css'
import { manager_abi } from '../../constants/manager_abi'
import { manager_contract } from '../../constants/contract_addresses'

export default function Stake({ userId, postId }) {

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

    const handleStakeNotification = () => {
        dispatch({
            type: "success",
            message: "Tokens succesfully staked",
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

    const { runContractFunction: stakeTokens, error: errorOnStakeTokens } = useWeb3Contract({
        abi: manager_abi,
        contractAddress: manager_contract,
        functionName: "stakeOnPost",
        params: {
            userId: userId,
            postId: postId,
            numTokens: numTokens,
        },
    })


    return (
        <div className={styles.addTokens}>
            <Input
                label=""
                name="Stake"
                onChange={(e) => setNumTokens(e.target.value)}
                type="number"
            />
            <Button size='large' text='Stake' icon="plus"
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
                    await stakeTokens({
                        onError: (e) => {
                            console.log(e)
                            handleErrorNotification()
                        }
                    })
                    if (errorOnStakeTokens) {
                        console.log(errorOnStakeTokens)
                        handleErrorNotification()
                    } else {
                        handleStakeNotification()
                    }
                    clearInput()
                }}
            />
        </div>
    )
}
