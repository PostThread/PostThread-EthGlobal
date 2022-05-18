import React from 'react'
import { useNotification } from 'web3uikit'
import { useMoralis, useWeb3Contract, useMoralisQuery } from 'react-moralis'
import { Button } from 'web3uikit'
import { manager_abi } from '../../constants/manager_abi'
import { manager_contract } from '../../constants/contract_addresses'
import { getFieldIndex } from '../../helpers/helpers'
import { user_abi } from '../../constants/user_abi'
import { useAppContext } from '../../context/AppContext'

export default function Follow({ userIdToFollow }) {

    const userInfo = useAppContext()
    const { isAuthenticated } = useMoralis()
    const logged_userId = userInfo["logged_userId"]

    const dispatch = useNotification()

    const queryFollows = useMoralisQuery("Follows")
    const fetchedFollows = JSON.parse(JSON.stringify(queryFollows.data, ["user", "block_number"]))
    const currentUserFollowData = fetchedFollows.filter(user => (user["user"][getFieldIndex(user_abi, "followHappened", "userId")] === logged_userId))
    const currentUserLatestFollowData = getLatestFollows(currentUserFollowData)
    const hasData = currentUserLatestFollowData["user"] ? true : false
    const followings = hasData ? currentUserLatestFollowData["user"][getFieldIndex(user_abi, "followHappened", "following")] : []
    const functionName = alreadyFollowing(followings) ? "unfollow" : "follow"

    function alreadyFollowing(followings) {
        let isFollowing = false
        followings?.forEach(following => {
            if (following === userIdToFollow) isFollowing = true
        })
        return isFollowing
    }

    function getLatestFollows(followsFromUser) {
        let max = { "user": {}, "block_number": 0 }
        followsFromUser.forEach(follows => {
            if (follows["block_number"] > max["block_number"]) max = follows
        });

        return max
    }

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
            {/* <Button text="debug" onClick={() => { console.log("Follow :" + functionName) }}></Button> */}
        </div>
    )
}
