import React, { useState } from 'react'
import { useMoralisQuery } from 'react-moralis';
import { Typography } from 'web3uikit';

export default function Post({ post }) {

    let result = ""
    post ?
        result = (
            <>
                <Typography variant="body16" weight="semibold">
                    {post["post"][3]}
                </Typography>
                <p style={{ fontSize: "15px", color: "#111" }}>{post["post"][4]}</p>
            </>
        ) : <></>

    return (
        result
    )
}
