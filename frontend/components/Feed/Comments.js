import React from 'react'
import { useWeb3Contract } from 'react-moralis'
import { Button } from 'web3uikit'
import { post_contract } from '../../constants/contract_addresses'
import { post_abi } from '../../constants/post_abi'

export default function Comments({ postId }) {

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
            onClick={async () => {
                const commentsIdsToShow = await getCommentsIds()

                console.log("Ids: " + commentsIdsToShow)
                if (errorOnGetCommentsIds) {
                    console.log("Comment ids: " + errorOnGetCommentsIds)
                }
            }}>
        </Button>
    </>
}
