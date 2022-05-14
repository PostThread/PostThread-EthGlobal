import React from 'react'
import { useMoralisQuery } from 'react-moralis';
import Post from './Post';
import { Button } from 'web3uikit';
import { useEffect } from 'react';

export default function Posts({ selectedCategory }) {

    const queryPost = useMoralisQuery("Posts")
    const fetchedPosts = JSON.parse(JSON.stringify(queryPost.data, ["tokenId"]))
    // const postsToShow = fetchedPosts.filter(post => (post["post"][2] === selectedCategory["category"]))
    // ["userHash", "blockNumber", "category", "title", "text", "link", "upvotes", "downvotes", "commentsHead", "hash"]))
    // const havePosts = postsToShow.length > 0 ? true : false

    useEffect(() => {
        console.log("changing")
        console.log(selectedCategory["category"])
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
            {/* {postsToShow.map((post) => (
                <Post key={post["post"][9]} post={post} />
            ))} */}
        </div>
    )

    // return havePosts ? postResult : emptyPost;
    return <></>
}
