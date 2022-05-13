import React, { useState } from 'react'
import { Select, Icon, Button } from 'web3uikit'
import { useWeb3Contract, useMoralisQuery } from 'react-moralis'
import { user_abi } from "../constants/user_abi"
import { user_contract } from '../constants/contract_addresses'

export default function DisplayUser() {

    const [tokenId, setTokenId] = useState([])
    const queryUsers = useMoralisQuery("Users")
    const fetchedIds = JSON.parse(JSON.stringify(queryUsers.data, ["tokenId"]))

    const { runContractFunction: owner, error: errorOnOwner } = useWeb3Contract({
        abi: user_abi,
        contractAddress: user_contract,
        functionName: "ownerOf",
        params: {
            tokenId: tokenId,
        },
    })

    const owners = () => {
        let _owners = []
        fetchedIds.map((id) => {
            setTokenId(id)
            let owner_address = owner()
            _owners.push(owner_address)
        })
        return _owners
    }

    function getUserOwners() {
        console.log(fetchedIds)
        // console.log(owners)
    }

    //const userToShow = fetchedUsers.filter(user => (post["post"][2] === selectedCategory["category"]))

    // const { runContractFunction: getUser, error: errorOnGetUser } = useWeb3Contract({
    //     abi: user_abi,
    //     contractAddress: user_contract,
    //     functionName: "getUser",
    //     params: {
    //         userId: userId,
    //     },
    // })

    // const haveUsers = usersToShow.length > 0 ? true : false

    // const options = usersToShow.map((user) => {
    //     let options = []
    //     const option = { id: user["user"][3], label: user["user"][2], prefix: "🤖" }
    //     options.push(option)
    //     return options
    // })

    return (
        <div>
            {/* {
                haveUsers &&
                <Select
                    onChange={(option) => {
                        setUserHash(option["id"])
                    }}
                    options={options.map((option) => option[0])}
                />
            } */}
            <Button onClick={getUserOwners()}></Button>
        </div>
    )
}
