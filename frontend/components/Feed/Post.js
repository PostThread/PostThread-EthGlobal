import React, { useState } from 'react'
import { Typography } from 'web3uikit';
import { getFieldIndex } from '../../helpers/helpers';
import { post_abi } from '../../constants/post_abi';
import { user_abi } from '../../constants/user_abi';
import { Button } from 'web3uikit';
import styles from '../../styles/Home.module.css'
import AddComment from './AddComment';
import Comments from './Comments';
import Vote from './Vote';
import Stake from './Stake';
import { useRouter } from 'next/router'


export default function Post({ post, user }) {

    const router = useRouter()

    const [showComments, setShowComments] = useState(false)
    const postId = post["post"][getFieldIndex(post_abi, "postMinted", "inputId")]
    const userId = user[getFieldIndex(user_abi, "userMinted", "userId")]
    const username = post["post"][getFieldIndex(post_abi, "postMinted", "username")]
    const text = post["post"][getFieldIndex(post_abi, "postMinted", "text")]

    function toggleShowComments() {
        setShowComments(!showComments)
    }

    function routeToUser() {
        if (typeof window !== 'undefined') {
            localStorage.setItem('userToDisplay', String(username));
            router.push("/account")
        }
    }

    let result = ""
    post ?
        result = (
            <div className={styles.post}>
                <div className={styles.postContentVotes}>
                    <div className={styles.postContent}>
                        <p style={{ color: "purple" }} onClick={routeToUser}>{username}:</p>
                        <Typography variant="body16" weight="semibold">
                            {post["post"][getFieldIndex(post_abi, "postMinted", "title")]}
                        </Typography>
                        <p style={{ fontSize: "15px", color: "#111" }}>{text}</p>
                    </div>
                    <Vote postId={postId} />
                </div>
                <div className={styles.postButtons}>
                    <Button
                        id="test-button-secondary"
                        onClick={toggleShowComments}
                        text="Comments"
                        theme="secondary"
                        type="button"
                    />
                    <Stake userId={userId} postId={postId} />
                </div>
                {showComments ?
                    <div>
                        <AddComment user={user} postId={postId} onPost="true" />
                        <Comments postId={postId} />
                    </div> : ""}
            </div>
        ) : <></>

    return (
        result
    )
}
