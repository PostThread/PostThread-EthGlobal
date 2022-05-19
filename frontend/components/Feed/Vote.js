import React from 'react'
import { Button } from 'web3uikit'
import styles from '../../styles/Home.module.css'
import { useMoralisQuery, useWeb3Contract } from 'react-moralis'
import { manager_abi } from '../../constants/manager_abi'
import { manager_contract } from '../../constants/contract_addresses'
import { useNotification } from 'web3uikit'
import { getFieldIndex } from '../../helpers/helpers'
import { post_abi } from '../../constants/post_abi'

export default function Vote({ id, onPost }) {

    const queryDownVotes = useMoralisQuery("Downvotes")
    const queryUpVotes = useMoralisQuery("Upvotes")
    const fetchedDownVotes = JSON.parse(JSON.stringify(queryDownVotes.data, ["input", "block_number"]))
    const fetchedUpVotes = JSON.parse(JSON.stringify(queryUpVotes.data, ["input", "block_number"]))
    const postUpVotes = fetchedUpVotes.filter((upvote) => upvote["input"][getFieldIndex(post_abi, "upvoteHappened", "inputId")] === id)
    const postDownVotes = fetchedDownVotes.filter((upvote) => upvote["input"][getFieldIndex(post_abi, "downvoteHappened", "inputId")] === id)
    const votes = getLatestVotes(postUpVotes, postDownVotes)
    const hasVotes = votes["input"] ? true : false
    const upVotes = hasVotes ? Number(votes["input"][10][3]) : 0
    const downVotes = hasVotes ? Number(votes["input"][10][4]) : 0


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
            postId: id
        },
    })

    const { runContractFunction: downVote, error: errorOnDownVote } = useWeb3Contract({
        abi: manager_abi,
        contractAddress: manager_contract,
        functionName: "downvotePost",
        params: {
            postId: id
        },
    })

    const { runContractFunction: upVoteComment, error: errorOnUpVoteComment } = useWeb3Contract({
        abi: manager_abi,
        contractAddress: manager_contract,
        functionName: "upvoteComment",
        params: {
            commentId: id
        },
    })

    const { runContractFunction: downVoteComment, error: errorOnDownVoteComment } = useWeb3Contract({
        abi: manager_abi,
        contractAddress: manager_contract,
        functionName: "downvoteComment",
        params: {
            commentId: id
        },
    })

    function getLatestVotes(postUpVotes, postDownVotes) {
        let max = { "input": 0, "block_number": 0 }
        postUpVotes.forEach(post => {
            if (post["block_number"] > max["block_number"]) max = post
        });
        postDownVotes.forEach(post => {
            if (post["block_number"] > max["block_number"]) max = post
        });

        return max
    }

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
