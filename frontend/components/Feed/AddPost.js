import React, { useEffect, useState } from 'react'
import { Button, useNotification } from 'web3uikit'
import { useWeb3Contract, useMoralis } from 'react-moralis';
import { post_abi } from "../../constants/post_abi"
import styles from '../../styles/Home.module.css'


export default function AddPost({ selectedCategory }) {

    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const { isAuthenticated, account } = useMoralis()
    const dispatch = useNotification()

    useEffect(() => {
        console.log(title)
    }, [title])

    useEffect(() => {
        console.log(content)
    }, [content])

    const validateForm = () => {
        let result = !title || !content ? false : true
        return result
    }

    const clearForm = () => {
        setTitle('')
        setContent('')
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

    const { runContractFunction, error } = useWeb3Contract({
        abi: post_abi,
        contractAddress: "0x17DFf033658B5291aD527a297D2F464EeFe53a4d",
        functionName: "mintPost",
        params: {
            userHash: "0xdc4e3f92ca7655b56e94285fe3d73a035d5474f62b3d24ca533e76e23dc8f181",
            category: "NFT",
            title: title,
            text: content,
            link: "test link"
        },
    })


    return (
        <div className={styles.formContainer}>
            <input
                type="text"
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                type="text"
                placeholder='Post away'
                rows='5'
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
                    await runContractFunction()
                    if (error) {
                        console.log(error)
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
