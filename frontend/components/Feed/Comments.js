import React from 'react'
import { useWeb3Contract } from 'react-moralis'
import { Button } from 'web3uikit'
import { manager_abi } from '../../constants/manager_abi'
import { manager_contract } from '../../constants/contract_addresses'

export default function Comments({ postId }) {

    let commentsIdsToShow = {}

    const { runContractFunction: getCommentsIds, error: errorOnGetCommentsIds } = useWeb3Contract({
        abi: manager_abi,
        contractAddress: manager_contract,
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
                commentsIdsToShow = await getCommentsIds()
                console.log("Ids: " + commentsIdsToShow)
                if (errorOnGetCommentsIds) {
                    console.log("Comment ids: " + errorOnGetCommentsIds)
                }
            }}>
        </Button>
    </>
}
