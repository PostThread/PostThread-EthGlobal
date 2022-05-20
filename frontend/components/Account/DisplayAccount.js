import React, { useState, useEffect } from 'react'
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
import { getLatestPosts } from '../../helpers/helpers'
import { user_contract } from '../../constants/contract_addresses'
import { useWeb3Contract } from 'react-moralis'

export default function DisplayAccount({ account }) {

    const [userScore, setUserScore] = useState()
    const [expNeeded, setExpNeeded] = useState()

    const logged_user = useAppContext()
    const logged_userId = logged_user["logged_userId"]
    const userId = account["user"][getFieldIndex(user_abi, "userEvent", "userId")]
    const username = account["user"][getFieldIndex(user_abi, "userEvent", "username")]
    const queryPost = useMoralisQuery("Posts")
    const fetchedPosts = JSON.parse(JSON.stringify(queryPost.data, ["input", "metaData", "sender", "block_number"]))
    const postEvents = fetchedPosts.filter(post => (post["input"][getFieldIndex(post_abi, "inputEvent", "userId")] === userId))
    const havePosts = postEvents.length > 0 ? true : false
    const latestPosts = havePosts ? getLatestPosts(postEvents) : []
    const isDifferentUser = logged_userId === userId ? false : true

    async function score() {
        const userExp = await getScore({
            onError: (e) => {
                console.log(JSON.stringify(e))
                setUserScore(0)
            }
        })
        console.log("Account exp : " + userExp)
        setUserScore(String(userExp))
    }

    async function expMissing() {
        const expLeft = await getLevelAndExpNeeded({
            onError: (e) => {
                console.log(JSON.stringify(e))
                setExpNeeded(0)
            }
        })
        console.log("Account exp missing: " + expLeft)
        setExpNeeded(String(expLeft))
    }

    useEffect(() => {

    }, [userScore, expNeeded])


    const { runContractFunction: getLevelAndExpNeeded } = useWeb3Contract({
        abi: user_abi,
        contractAddress: user_contract,
        functionName: "getLevelAndExpNeeded",
        params: {
            userId: userId,
        },
    })

    const { runContractFunction: getScore } = useWeb3Contract({
        abi: user_abi,
        contractAddress: user_contract,
        functionName: "getScore",
        params: {
            userId: userId,
        },
    })

    function debug() {
        console.log("Account: post " + JSON.stringify(latestPosts))
    }

    const empty = (
        <div>
            <h3>User has no posts</h3>
        </div>
    )

    const postResult = (
        <>
            <div className={styles.accountInfo}>
                <h3>User: {username}</h3>
                {isDifferentUser && <Follow userToFollow={account} />}
            </div>
            <div className={styles.exp}>
                <Button onClick={async () => {
                    await score()
                    await expMissing()
                }} text="Get score" />
                <h2>{userScore}/{expNeeded}</h2>
            </div>
            <div>
                {
                    latestPosts.map((post) => (
                        <Post key={uuidv4()} post={post} />
                    ))
                }
            </div>
            {/* <Button text="debug" onClick={debug}></Button> */}
        </>
    )

    return (
        <div>
            {havePosts ? postResult : empty}
        </div>
    )

    // return <Button onClick={() => console.log("Account display :" + JSON.stringify(state["logged_userId"]))} text="display"></Button>

}
