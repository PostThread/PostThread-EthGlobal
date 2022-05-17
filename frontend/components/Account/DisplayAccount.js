import React, { useEffect } from 'react'
import styles from '../../styles/Home.module.css'
import { getFieldIndex } from '../../helpers/helpers'
import { user_abi } from '../../constants/user_abi'
import { useMoralisQuery } from 'react-moralis'
import Post from '../Feed/Post'
import { v4 as uuidv4 } from 'uuid';


export default function DisplayAccount({ account, user }) {

    const username = user[getFieldIndex(user_abi, "userMinted", "username")]
    const queryPost = useMoralisQuery("Posts")
    const fetchedPosts = JSON.parse(JSON.stringify(queryPost.data, ["post", "sender"]))
    const postsToShow = fetchedPosts.filter(post => post["sender"] === account)
    const havePosts = postsToShow.length > 0 ? true : false

    useEffect(() => {
        console.log("User posts fetched: " + (JSON.stringify(fetchedPosts)))
        fetchedPosts.map(post => (console.log("User posts account  " + post["sender"] === account)))
        console.log("User posts: " + JSON.stringify(postsToShow))
    }, [])

    const empty = (
        <div>
            <h3>User has no posts</h3>
        </div>
    )

    const postResult = (
        <>
            <div className={styles.accountInfo}>
                <h3>User: {username}</h3>
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

}
