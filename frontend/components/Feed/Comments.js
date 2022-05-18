import React from 'react'
import { useWeb3Contract } from 'react-moralis'
import { Button } from 'web3uikit'
import { post_contract } from '../../constants/contract_addresses'
import { post_abi } from '../../constants/post_abi'
import { useMoralisQuery } from 'react-moralis'

export default function Comments({ postId }) {

    const queryComments = useMoralisQuery("Comments")
    const fetchedComments = JSON.parse(JSON.stringify(queryComments.data, ["comment"]))


    async function generateComments() {

        const commentsIdsToShow = await getCommentsIds()
        if (errorOnGetCommentsIds) {
            console.log("Comment ids: " + errorOnGetCommentsIds)
            return <></>
        }
        const parsedComments = JSON.parse(JSON.stringify(commentsIdsToShow))
        for (const key in parsedComments) console.log("Parsed: " + parsedComments)
        return (
            <></>
        )
    }

    const { runContractFunction: getCommentsIds, error: errorOnGetCommentsIds } = useWeb3Contract({
        abi: post_abi,
        contractAddress: post_contract,
        functionName: "getPostData",
        params: {
            postId: postId,
        },
    })


    return <>
        <Button size='large' text='Get comments'
            iconLayout="trailing"
            color="blue"
            theme="colored"
            type="button"
            onClick={generateComments}>
        </Button>
    </>
}
