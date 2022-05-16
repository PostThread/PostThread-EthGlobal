import React from 'react'
import { Icon } from 'web3uikit'
import styles from '../styles/Home.module.css'
import { user_abi } from '../constants/user_abi'
import { getFieldIndex } from '../helpers/helpers'

export default function DisplayUser({ user }) {

    const haveUser = user === "none" ? false : true
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

    return (
        <div className={styles.userDisplay}>
            <Icon
                fill="#FFFFFF"
                size={24}
                svg="user"
            />
            {haveUser ? <p>{user[getFieldIndex(user_abi, "userMinted", "username")]}</p> : <p>No User</p>}
        </div>
    )
}
