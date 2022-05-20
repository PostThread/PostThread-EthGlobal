import React, { useEffect, useState } from 'react'
import { Button, useNotification } from 'web3uikit'
import { useWeb3Contract, useMoralis } from 'react-moralis';
import styles from '../../styles/Home.module.css'
import { caller_contract } from '../../constants/contract_addresses';
import { caller_abi } from '../../constants/caller_abi';
import { useAppContext } from '../../context/AppContext';

export default function AddPost({ selectedCategory }) {

    const [title, setTitle] = useState();
    const [text, setText] = useState();

    const { isAuthenticated } = useMoralis()
    const dispatch = useNotification()

    const userInfo = useAppContext()
    const username = userInfo["logged_username"]
    const userId = userInfo["logged_userId"]

    const validateForm = () => {
        let result = !title || !text ? false : true
        return result
    }

    const clearForm = () => {
        setTitle('')
        setText('')
    }

    const handleAddNotification = () => {
        dispatch({
            type: "success",
            message: "Post successfully created",
            title: "Success",
            position: "topL"
        })
    }

    const handleErrorNotification = () => {
        dispatch({
            type: "error",
            message: "Something went wrong with your request",
            title: "Error",
            position: "topL"
        })
    }

    const handleFormErrorNotification = () => {
        dispatch({
            type: "error",
            message: "Remember to fill both title and content!",
            title: "Error",
            position: "topL"
        })
    }

    const { runContractFunction: mintPost, error: errorOnMintPost } = useWeb3Contract({
        abi: caller_abi,
        contractAddress: caller_contract,
        functionName: "mintPost",
        params: {
            userId: userId,
            username: username,
            category: selectedCategory["category"],
            title: title,
            text: text,
            link: "test link",
            stakingTip: 0,
            isNSFW: false
        },
    })





    return (
        <div className={styles.formContainer}>
            <h3>Post in {selectedCategory["category"]}</h3>
            <input
                type="text"
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                type="text"
                placeholder='Post content'
                rows='5'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button size='large' text='Create Post' icon="plus"
                iconLayout="trailing"
                color="blue"
                theme="colored"
                type="button"
                disabled={!isAuthenticated}
                onClick={async () => {
                    if (!validateForm()) {
                        return handleFormErrorNotification()
                    }
                    await mintPost()
                    if (errorOnMintPost) {
                        console.log(errorOnMintPost)
                        handleErrorNotification()
                    } else {
                        handleAddNotification()
                    }
                    clearForm()
                }}>
            </Button>
        </div>
    )
}
