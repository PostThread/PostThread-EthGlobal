import React, { useState } from 'react'
import { Input, Button, useNotification } from 'web3uikit'
import { useWeb3Contract, useMoralis } from 'react-moralis'
import styles from '../../styles/Home.module.css'
import { caller_abi } from '../../constants/caller_abi'
import { caller_contract } from '../../constants/contract_addresses'
import { useAppContext } from '../../context/AppContext'
import { getFieldIndex } from '../../helpers/helpers'
import { post_abi } from '../../constants/post_abi'

export default function Stake({ post }) {

    const userInfo = useAppContext()
    const userId = userInfo["logged_userId"]

    const postId = post["input"][getFieldIndex(post_abi, "inputEvent", "inputId")]
    const totalStaked = post["input"][getFieldIndex(post_abi, "inputEvent", "totalStaked")]

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

    const handleStakeNotification = (message) => {
        dispatch({
            type: "success",
            message: message,
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
        abi: caller_abi,
        contractAddress: caller_contract,
        functionName: "stakeOnPost",
        params: {
            userId: userId,
            postId: postId,
            numTokens: numTokens,
        },
    })

    const { runContractFunction: collectStakes, error: errorOnCollectStakes } = useWeb3Contract({
        abi: caller_abi,
        contractAddress: caller_contract,
        functionName: "collectAllStakes",
        params: {
            postId: postId,
        },
    })

    return (
        <div className={styles.stakeFooter}>
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
                            handleStakeNotification("Tokens successfully staked")
                        }
                        clearInput()
                    }}
                />
                <div className={styles.balance}>
                    {`Total staked: ${totalStaked} BLK`}
                </div>
                <Button size='large' text='Collect'
                    iconLayout="trailing"
                    color="blue"
                    theme="colored"
                    type="button"
                    // disabled={ //TODO: which function to call?    }
                    onClick={async () => {
                        await collectStakes({
                            onError: (e) => {
                                console.log(e)
                                handleErrorNotification()
                            }
                        })
                        if (errorOnCollectStakes) {
                            console.log(errorOnCollectStakes)
                            handleErrorNotification()
                        } else {
                            handleStakeNotification("Tokens successfully collected")
                        }
                    }}
                />
            </div>
        </div>
    )
}
