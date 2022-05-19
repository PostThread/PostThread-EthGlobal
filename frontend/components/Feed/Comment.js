import React from 'react'
import { getFieldIndex } from '../../helpers/helpers'
import { comment_abi } from '../../constants/comment_abi'
import { useWeb3Contract } from 'react-moralis'
import { Button } from 'web3uikit'
import { manager_abi } from '../../constants/manager_abi'
import { manager_contract } from '../../constants/contract_addresses'

export default function Comment({ comment }) {

    const textIndex = getFieldIndex(comment_abi, "commentMinted", "text")
    const idIndex = getFieldIndex(comment_abi, "commentMinted", "inputId")

    const { runContractFunction: upVoteComment, error: errorOnUpVoteComment } = useWeb3Contract({
        abi: manager_abi,
        contractAddress: manager_contract,
        functionName: "downvoteComment",
        params: {
            commentId: comment[idIndex]
        },
    })

    return (
        <>
            <h3>{comment[textIndex]}</h3>
            <Button text="upvote" onClick={async () => await upVoteComment()}></Button>
        </>
    )
}
