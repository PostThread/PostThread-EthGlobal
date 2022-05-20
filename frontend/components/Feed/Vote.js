import React from 'react'
import { Button } from 'web3uikit'
import styles from '../../styles/Home.module.css'
import { useMoralisQuery, useWeb3Contract } from 'react-moralis'
import { caller_abi } from '../../constants/caller_abi'
import { caller_contract } from '../../constants/contract_addresses'
import { useNotification } from 'web3uikit'
import { getFieldIndex } from '../../helpers/helpers'
import { post_abi } from '../../constants/post_abi'
import { useAppContext } from '../../context/AppContext'

export default function Vote({ object, onPost }) {

    const userInfo = useAppContext()
    const userIdOfInteractor = userInfo["logged_userId"]

    const upVotes = object["input"][getFieldIndex(post_abi, "inputEvent", "upvotes")]
    const downVotes = object["input"][getFieldIndex(post_abi, "inputEvent", "downvotes")]
    const id = object["input"][getFieldIndex(post_abi, "inputEvent", "inputId")]

    const dispatch = useNotification()

    function debug() {
        console.log("Votes " + JSON.stringify(object))
        console.log("Votes up " + getFieldIndex(post_abi, "inputEvent", "upvotes"))
        console.log("Votes down " + getFieldIndex(post_abi, "inputEvent", "downvotes"))
    }

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
        abi: caller_abi,
        contractAddress: caller_contract,
        functionName: "upvotePost",
        params: {
            userIdOfInteractor: userIdOfInteractor,
            postId: id
        },
    })

    const { runContractFunction: downVote, error: errorOnDownVote } = useWeb3Contract({
        abi: caller_abi,
        contractAddress: caller_contract,
        functionName: "downvotePost",
        params: {
            userIdOfInteractor: userIdOfInteractor,
            postId: id
        },
    })

    const { runContractFunction: upVoteComment, error: errorOnUpVoteComment } = useWeb3Contract({
        abi: caller_abi,
        contractAddress: caller_contract,
        functionName: "upvoteComment",
        params: {
            userIdOfInteractor: userIdOfInteractor,
            commentId: id
        },
    })

    const { runContractFunction: downVoteComment, error: errorOnDownVoteComment } = useWeb3Contract({
        abi: caller_abi,
        contractAddress: caller_contract,
        functionName: "downvoteComment",
        params: {
            userIdOfInteractor: userIdOfInteractor,
            commentId: id
        },
    })

    return (
        <div className={styles.votesArrow}>
            <div className={styles.votes}>
                <Button
                    color="green"
                    icon="triangleUp"
                    iconLayout="icon-only"
                    id="test-button-primary-icon-only"
                    onClick={async () => {
                        onPost ?
                            await upVote() : await upVoteComment()
                        if (errorOnUpVote || errorOnUpVoteComment) {
                            console.log("Error on upvote: " + errorOnUpVote)
                            return handleErrorNotification()
                        } else {
                            return handleVoteNotification()
                        }
                    }}
                    size="small"
                    theme="status"
                    type="button"
                /><p>{upVotes}</p>
            </div>
            <div><Button text="debug" onClick={debug}></Button></div>
            <div className={styles.votes}>
                <Button
                    color="red"
                    icon="triangleDown"
                    iconLayout="icon-only"
                    id="test-button-primary-icon-only"
                    onClick={async () => {
                        onPost ?
                            await downVote() : await downVoteComment()
                        if (errorOnDownVote || errorOnDownVoteComment) {
                            return handleErrorNotification()
                        } else {
                            return handleVoteNotification()
                        }
                    }}
                    size="small"
                    text="Primary icon only"
                    theme="status"
                    type="button"
                /><p>{downVotes}</p>
            </div>
        </div>
    )
}
