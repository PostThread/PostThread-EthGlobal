import React, { useState } from 'react'
import { user_contract } from '../constants/contract_addresses'
import { user_abi } from '../constants/user_abi'
import { Input, Button, useNotification } from 'web3uikit'
import { useWeb3Contract, useMoralis } from 'react-moralis';
import styles from '../styles/Home.module.css'


export default function AddUser() {

    const [username, setUsername] = useState('')
    const { isAuthenticated } = useMoralis()
    const dispatch = useNotification()

    const validateInput = () => {
        let result = username.length > 3 ? true : false
        return result
    }

    const clearInput = () => {
        setUsername('')
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

    const handleInputErrorNotification = () => {
        dispatch({
            type: "error",
            message: "Username must be at least 4 characters long",
            title: "Error",
            position: "topL"
        })
    }

    const { runContractFunction, error } = useWeb3Contract({
        abi: user_abi,
        contractAddress: user_contract,
        functionName: "mintUser",
        params: {
            username: username
        },
    })


    return (
        <div className={styles.addUser}>
            <Input
                label="Insert username"
                name="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <Button size='large' text='Create User' icon="plus"
                iconLayout="trailing"
                color="blue"
                theme="colored"
                type="button"
                disabled={!isAuthenticated}
                onClick={async () => {
                    if (!validateInput()) {
                        return handleInputErrorNotification()
                    }
                    await runContractFunction()
                    if (error) {
                        console.log(error)
                        handleErrorNotification()
                    } else {
                        handleAddNotification()
                    }
                    clearInput()
                }}>
            </Button>
        </div>
    )
}
