import React, { useState } from 'react'
import { Select, Icon, Button } from 'web3uikit'

export default function SwitchUser({ setUserHash, usersToShow }) {

    const haveUsers = usersToShow.length > 0 ? true : false

    const options = usersToShow.map((user) => {
        let options = []
        const option = { id: user["user"][3], label: user["user"][2], prefix: "🤖" }
        options.push(option)
        return options
    })

    return (
        <div>
            {
                haveUsers &&
                <Select
                    onChange={(option) => {
                        setUserHash(option["id"])
                    }}
                    options={options.map((option) => option[0])}
                />
            }
        </div>
    )
}
