import React, { useEffect } from 'react'
import styles from '../../styles/Home.module.css'
import { getFieldIndex } from '../../helpers/helpers'
import { user_abi } from '../../constants/user_abi'
import { post_abi } from '../../constants/post_abi'
import { useMoralisQuery } from 'react-moralis'
import Post from '../Feed/Post'
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'web3uikit'
import Follow from './Follow'
import { useAppContext } from '../../context/AppContext'

export default function DisplayAccount({ account }) {

    const logged_user = useAppContext()
    const logged_userId = logged_user["logged_userId"]
    const user = account[0]["user"]
    const username = user[getFieldIndex(user_abi, "userMinted", "username")]
    const userId = user[getFieldIndex(user_abi, "userMinted", "userId")]
    const queryPost = useMoralisQuery("Posts")
    const fetchedPosts = JSON.parse(JSON.stringify(queryPost.data, ["post"]))
    const postsToShow = fetchedPosts.filter(post => post["post"][getFieldIndex(post_abi, "postMinted", "username")] === username)
    const havePosts = postsToShow.length > 0 ? true : false
    const isDifferentUser = logged_userId === userId ? false : true

    // useEffect(() => {
    //     console.log("User " + (JSON.stringify(user)))
    //     console.log("User " + username)
    // }, [])

    const empty = (
        <div>
            <h3>User has no posts</h3>
        </div>
    )

    const postResult = (
        <>
            <div className={styles.accountInfo}>
                <h3>User: {username}</h3>
                {isDifferentUser && <Follow userIdToFollow={userId} />}
            </div>
            <div>
                {
                    postsToShow.map((post) => (
                        <Post key={uuidv4()} post={post} user={user} />
                    ))
                }
            </div>
        </>
    )

    return (
        <div>
            {havePosts ? postResult : empty}
        </div>
    )

    // return <Button onClick={() => console.log("Account display :" + JSON.stringify(state["logged_userId"]))} text="display"></Button>

}
