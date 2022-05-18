import React from 'react'
import { Button } from 'web3uikit'
import styles from '../styles/Home.module.css'
import { user_abi } from '../constants/user_abi'
import { getFieldIndex } from '../helpers/helpers'
import { useRouter } from 'next/router'
import { useMoralisQuery } from 'react-moralis'


export default function DisplayUser({ username }) {

    const haveUser = (username === "No User") ? false : true
    const router = useRouter()

    // const options = usersToShow.map((user) => {
    //     let options = []
    //     const option = { id: user["user"][3], label: user["user"][2], prefix: "🤖" }
    //     options.push(option)
    //     return options
    // })

    // <Select
    //     onChange={(option) => {
    //         setUserHash(option["id"])
    //     }}
    //     options={options.map((option) => option[0])}
    // />

    function routeToUser() {
        if (typeof window !== 'undefined') {
            localStorage.setItem('userToDisplay', String(username));
            router.push("/account")
        }
    }

    return (
        <div className={styles.userDisplay}>
            <Button
                color="white"
                icon="user"
                iconLayout="icon-only"
                id="test-button-primary-icon-only"
                onClick={routeToUser}
                size="medium"
                type="button"
                disabled={!haveUser}
            />
            <p>{username}</p>
        </div>
    )
}
