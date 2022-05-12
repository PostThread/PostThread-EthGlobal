import React, { useEffect, useState } from 'react'
import { Button, useNotification } from 'web3uikit'
import { useWeb3Contract, useMoralis } from 'react-moralis';
import { post_abi } from "../../constants/post_abi"
import styles from '../../styles/Home.module.css'
import { post_contract } from '../../constants/contract_addresses';


export default function AddPost({ selectedCategory, userHash }) {

    const [title, setTitle] = useState();
    const [text, setText] = useState();

    const { isAuthenticated } = useMoralis()
    const dispatch = useNotification()

    useEffect(() => {
        console.log(title)
    }, [title])

    useEffect(() => {
        console.log(text)
    }, [text])

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

    const { runContractFunction, error } = useWeb3Contract({
        abi: post_abi,
        contractAddress: post_contract,
        functionName: "mintPost",
        params: {
            userHash: userHash,
            category: selectedCategory["category"],
            title: title,
            text: text,
            link: "test link"
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
