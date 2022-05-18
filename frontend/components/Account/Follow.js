import React from 'react'
import { useNotification } from 'web3uikit'
import { useMoralis, useWeb3Contract, useMoralisQuery } from 'react-moralis'
import { Button } from 'web3uikit'
import { manager_abi } from '../../constants/manager_abi'
import { manager_contract } from '../../constants/contract_addresses'
import { getFieldIndex } from '../../helpers/helpers'
import { user_abi } from '../../constants/user_abi'

export default function Follow({ userIdToFollow }) {

    const { isAuthenticated, account } = useMoralis()
    const queryUsers = useMoralisQuery("Users")
    const fetchedUsers = JSON.parse(JSON.stringify(queryUsers.data, ["user", "sender"]))
    const logged_userToShow = fetchedUsers.filter(user => (user["sender"] === account))
    const logged_haveUser = logged_userToShow.length > 0 ? true : false
    const logged_userId = logged_haveUser ? logged_userToShow[0]["user"][getFieldIndex(user_abi, "userMinted", "userId")] : -1

    const dispatch = useNotification()

    const functionName = "follow"

    const handleFollowNotification = () => {
        dispatch({
            type: "success",
            message: "Follow successfully submitted",
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

    const { runContractFunction: followUnfollow, error: errorOnFollowUnfollow } = useWeb3Contract({
        abi: manager_abi,
        contractAddress: manager_contract,
        functionName: functionName,
        params: {
            userIdToFollow: userIdToFollow,
            userIdThatFollowed: logged_userId
        },
    })

    return (
        <div>
            <Button size='large' text={functionName}
                iconLayout="trailing"
                color="blue"
                theme="colored"
                type="button"
                disabled={!isAuthenticated}
                onClick={async () => {
                    if (logged_userId > 0) {
                        await followUnfollow()
                        if (errorOnFollowUnfollow) {
                            console.log("Error on follow/unfollow: " + errorOnFollowUnfollow)
                            handleErrorNotification()
                        } else {
                            handleFollowNotification()
                        }
                    } else {
                        console.log("Error on follow/unfollow: " + errorOnFollowUnfollow)
                        handleErrorNotification()
                    }
                }}>
            </Button>
        </div>
    )
}
