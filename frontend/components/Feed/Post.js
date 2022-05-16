import React, { useState } from 'react'
import { Typography } from 'web3uikit';
import { getFieldIndex } from '../../helpers/helpers';
import { post_abi } from '../../constants/post_abi';

export default function Post({ post }) {

    let result = ""
    post ?
        result = (
            <>
                <Typography variant="body16" weight="semibold">
                    {post["post"][getFieldIndex(post_abi, "postMinted", "title")]}
                </Typography>
                <p style={{ fontSize: "15px", color: "#111" }}>{post["post"][getFieldIndex(post_abi, "postMinted", "text")]}</p>
            </>
        ) : <></>

    return (
        result
    )
}
