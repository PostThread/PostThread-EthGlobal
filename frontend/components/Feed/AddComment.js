import React, { useState, useEffect } from 'react'
import { user_abi } from '../../constants/user_abi';
import { getFieldIndex } from '../../helpers/helpers';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { useNotification, Button } from 'web3uikit';
import { manager_abi } from '../../constants/manager_abi';
import { manager_contract } from '../../constants/contract_addresses';
import styles from '../../styles/Home.module.css'

export default function AddComment({ user, postId, onPost }) {

    const [text, setText] = useState();

    const { isAuthenticated } = useMoralis()
    const dispatch = useNotification()

    const userId = user[getFieldIndex(user_abi, "userMinted", "userId")]
    const username = user[getFieldIndex(user_abi, "userMinted", "username")]

    useEffect(() => {
        console.log("Text: " + text)
        console.log("userId: " + userId)
        console.log("postId: " + postId)
    }, [text])

    const validateForm = () => {
        let result = !text ? false : true
        return result
    }

    const clearForm = () => {
        setText('')
    }

    const handleAddNotification = () => {
        dispatch({
            type: "success",
            message: "Comment successfully created",
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
            message: "You cannot post an empty comment!",
            title: "Error",
            position: "topL"
        })
    }

    const { runContractFunction: makeComment, error: errorOnMakeComment } = useWeb3Contract({
        abi: manager_abi,
        contractAddress: manager_contract,
        functionName: "makeComment",
        params: {
            userId: userId,
            username: username,
            text: text,
            link: "test link",
            parentId: postId,
            onPost: onPost,
            isNSFW: false
        },
    })


    return (
        <div className={styles.formContainer}>
            <textarea
                type="text"
                placeholder='Comment content'
                rows='5'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button size='large' text='Create Comment' icon="plus"
                iconLayout="trailing"
                color="blue"
                theme="colored"
                type="button"
                disabled={!isAuthenticated}
                onClick={async () => {
                    if (!validateForm()) {
                        return handleFormErrorNotification()
                    }
                    await makeComment()
                    if (errorOnMakeComment) {
                        console.log("Error on comment: " + errorOnMakeComment)
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
