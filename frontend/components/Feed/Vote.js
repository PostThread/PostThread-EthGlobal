import React from 'react'
import { Button } from 'web3uikit'
import styles from '../../styles/Home.module.css'
import { useWeb3Contract } from 'react-moralis'
import { manager_abi } from '../../constants/manager_abi'
import { manager_contract } from '../../constants/contract_addresses'
import { useNotification } from 'web3uikit'

export default function Vote({ postId }) {

    const dispatch = useNotification()

    const handleVoteNotification = () => {
        dispatch({
            type: "success",
            message: "Vote successfully submitted",
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

    const { runContractFunction: upVote, error: errorOnUpVote } = useWeb3Contract({
        abi: manager_abi,
        contractAddress: manager_contract,
        functionName: "upvotePost",
        params: {
            postId: postId
        },
    })

    const { runContractFunction: downVote, error: errorOnDownVote } = useWeb3Contract({
        abi: manager_abi,
        contractAddress: manager_contract,
        functionName: "downvotePost",
        params: {
            postId: postId
        },
    })



    return (
        <div className={styles.votesArrow}>
            <Button
                color="green"
                icon="triangleUp"
                iconLayout="icon-only"
                id="test-button-primary-icon-only"
                onClick={async () => {
                    await upVote()
                    if (errorOnUpVote) {
                        console.log("Error on upvote: " + errorOnUpVote)
                        return handleErrorNotification()
                    } else {
                        return handleVoteNotification()
                    }
                }}
                size="small"
                theme="status"
                type="button"
            />
            <Button
                color="red"
                icon="triangleDown"
                iconLayout="icon-only"
                id="test-button-primary-icon-only"
                onClick={async () => {
                    await downVote()
                    if (errorOnDownVote) {
                        console.log("Error on downvote: " + errorOnDownVote)
                        return handleErrorNotification()
                    } else {
                        return handleVoteNotification()
                    }
                }}
                size="small"
                text="Primary icon only"
                theme="status"
                type="button"
            />
        </div>
    )
}
