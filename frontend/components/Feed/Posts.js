import React, { useState } from 'react'
import { useMoralisQuery } from 'react-moralis';
import Post from './Post';
import { useEffect } from 'react';
import { getArrayIndex, getFieldIndex } from '../../helpers/helpers';
import { post_abi } from '../../constants/post_abi';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'web3uikit';
import { useAppContext } from '../../context/AppContext';
import { getLatestPosts } from '../../helpers/helpers';

export default function Posts({ selectedCategory }) {


    const userInfo = useAppContext()
    const user = userInfo["logged_user"]
    const queryPost = useMoralisQuery("Posts")
    const fetchedPosts = JSON.parse(JSON.stringify(queryPost.data, ["input", "metaData", "sender", "block_number"]))
    const postEvents = fetchedPosts.filter(post => (post["metaData"][1] === selectedCategory["category"]))
    const havePosts = postEvents.length > 0 ? true : false
    const latestPosts = havePosts ? getLatestPosts(postEvents) : []

    // function getPostIds(postEvents) {
    //     let ids = []
    //     postEvents.forEach(post => {
    //         let inputId = Number(post["input"][getFieldIndex(post_abi, "postMinted", "inputId")])
    //         ids.push(inputId)
    //     })

    //     const uniq = [...new Set(ids)];
    //     // console.log("Posts ids " + uniq)
    //     return uniq
    // }

    // function getSamePosts(postEvents, currentInputId) {
    //     let samePost = []
    //     postEvents.forEach(post => {
    //         let inputId = Number(post["input"][getFieldIndex(post_abi, "postMinted", "inputId")])
    //         if (currentInputId === inputId) {
    //             samePost.push(post)
    //         }
    //     })
    //     return samePost
    // }

    // function getLatest(posts) {
    //     let max = { "input": 0, "metadata": "", "sender": "", "block_number": 0 }
    //     posts.forEach(post => {
    //         if (post["block_number"] > max["block_number"]) max = post
    //     });
    //     return max
    // }

    // function getLatestPosts(postEvents) {
    //     let posts = []
    //     const ids = getPostIds(postEvents)
    //     ids.forEach(id => {
    //         posts.push(getSamePosts(postEvents, id))
    //     })

    //     let latestPosts = []
    //     posts.forEach((post) => {
    //         latestPosts.push(getLatest(post))
    //     })

    //     return latestPosts
    // }

    function debug() {
        //post["metaData"][getArrayIndex(post["metaData"], "category")]
        // const latestPosts = getLatestPosts(postEvents)
        // console.log("Posts: latest " + JSON.stringify(getLatestPosts(postEvents)))
        // const latestPosts = getLatestPosts(postEvents)
        // console.log("Posts: ids " + getPostIds(postEvents))
    }


    const emptyPost = (
        <div>
            <h3>
                Be the first to post here for: {selectedCategory["category"]}
            </h3>
        </div>
    )

    const postResult = (
        <div>
            {latestPosts.map((post) => (
                <Post key={uuidv4()} post={post} user={user} />
            ))}
        </div>
    )

    return havePosts ? postResult : emptyPost;

    // return (
    //     <Button text="debug" onClick={debug}></Button>
    // )
}