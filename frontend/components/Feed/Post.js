import React, { useState } from 'react'
import { Typography } from 'web3uikit';
import { getFieldIndex } from '../../helpers/helpers';
import { post_abi } from '../../constants/post_abi';
import { Button } from 'web3uikit';
import styles from '../../styles/Home.module.css'
import Comments from './Comments';
import Vote from './Vote';
import Stake from './Stake';
import { useRouter } from 'next/router'


export default function Post({ post }) {

    const router = useRouter()

    const text = post["metaData"][3]
    const title = post["metaData"][2]
    const username = post["metaData"][0]

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
                <div className={styles.contentVotes}>
                    <div className={styles.postContent}>
                        <p style={{ color: "purple" }} onClick={routeToUser}>{username}:</p>
                        <Typography variant="body16" weight="semibold">
                            {title}
                        </Typography>
                        <p style={{ fontSize: "15px", color: "#111" }}>{text}</p>
                    </div>
                    <Vote object={post} onPost={true} />
                </div>
                <div className={styles.postButtons}>
                    <Stake post={post} />
                </div>
                {/* <div>
                    <Comments postId={postId} />
                </div> */}
            </div>
        ) : <></>

    return (
        result
    )
}
