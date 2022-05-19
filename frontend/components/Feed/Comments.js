import React, { useState } from 'react'
import { useWeb3Contract } from 'react-moralis'
import { Button } from 'web3uikit'
import { post_contract } from '../../constants/contract_addresses'
import { post_abi } from '../../constants/post_abi'
import { useMoralisQuery } from 'react-moralis'
import { getFieldIndex } from '../../helpers/helpers'
import { comment_abi } from '../../constants/comment_abi'
import styles from '../../styles/Home.module.css'
import { v4 as uuidv4 } from 'uuid';
import AddComment from './AddComment'
import Comment from './Comment'

export default function Comments({ postId }) {

    const [commentsToDisplay, setCommentsToDisplay] = useState([]);
    const [showComments, setShowComments] = useState(false)

    const queryComments = useMoralisQuery("Comments")
    const fetchedComments = JSON.parse(JSON.stringify(queryComments.data, ["comment"]))

    function toggleShowComments() {
        setShowComments(!showComments)
    }

    async function generateComments() {
        const fetchedCommentsIds = await getCommentsIds()
        if (errorOnGetCommentsIds) {
            console.log("Comment ids error: " + errorOnGetCommentsIds)
            return []
        } else {
            const hasComments = fetchedCommentsIds ? true : false
            const commentsIdsToShow = hasComments ? JSON.parse(fetchedCommentsIds) : []
            const ids = hasComments ? commentsIdsToShow["post"]["comments"].map((comment) => Number((comment["id"]))) : 0
            let commentsToShow = ids !== 0 ? getComments(fetchedComments, ids) : []
            console.log("Comment ids: " + (commentsToShow))
            setCommentsToDisplay(commentsToShow)
            toggleShowComments()
        }
    }

    const { runContractFunction: getCommentsIds, error: errorOnGetCommentsIds } = useWeb3Contract({
        abi: post_abi,
        contractAddress: post_contract,
        functionName: "getPostData",
        params: {
            postId: postId,
        },
    })

    function getComments(fetchedComments, ids) {
        let comments = []
        fetchedComments.forEach(comment => {
            let commentId = Number(comment["comment"][getFieldIndex(comment_abi, "commentMinted", "inputId")])
            ids.forEach(id => {
                if (commentId === id) comments.push(comment["comment"])
            })
        })
        return comments
    }


    function debug() {
        console.log("Comment ids: " + JSON.stringify(commentsToDisplay))
        console.log("Comment ids: " + commentsToDisplay.length)
    }

    const commentResult = (
        <div>
            {commentsToDisplay.map((comment) => (
                <Comment key={uuidv4()} comment={comment} />
            ))}
        </div>
    )

    return (
        <div className={styles.comments}>
            <Button size='large' text='Show Comments'
                iconLayout="trailing"
                color="blue"
                theme="colored"
                type="button"
                onClick={generateComments}>
            </Button>
            {showComments ?
                <>
                    <div>
                        <AddComment postId={postId} />
                    </div>
                    <div>
                        {commentResult}
                    </div> </> : <></>}
            {/* <Button text="debug" onClick={debug} /> */}
        </div >
    )




}
