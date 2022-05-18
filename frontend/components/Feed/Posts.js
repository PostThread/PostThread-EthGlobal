import React, { useState } from 'react'
import { useMoralisQuery } from 'react-moralis';
import Post from './Post';
import { useEffect } from 'react';
import { getFieldIndex } from '../../helpers/helpers';
import { post_abi } from '../../constants/post_abi';
import { v4 as uuidv4 } from 'uuid';


export default function Posts({ selectedCategory, user }) {

    const queryPost = useMoralisQuery("Posts")
    const fetchedPosts = JSON.parse(JSON.stringify(queryPost.data, ["post"]))
    const postsToShow = fetchedPosts.filter(post => (post["post"][getFieldIndex(post_abi, "postMinted", "category")] === selectedCategory["category"]))
    const havePosts = postsToShow.length > 0 ? true : false

    // useEffect(() => {
    //     console.log("Post: " + JSON.stringify(fetchedPosts))
    // }, [])

    useEffect(() => {
    }, [selectedCategory])



    const emptyPost = (
        <div>
            <h3>
                Be the first to post here for: {selectedCategory["category"]}
            </h3>
        </div>
    )

    const postResult = (
        <div>
            {postsToShow.map((post) => (
                <Post key={uuidv4()} post={post} user={user} />
            ))}

        </div>
    )

    return havePosts ? postResult : emptyPost;
}
