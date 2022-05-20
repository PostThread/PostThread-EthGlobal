import React from 'react'
import { useNotification } from 'web3uikit'
import { useMoralis, useWeb3Contract, useMoralisQuery } from 'react-moralis'
import { Button } from 'web3uikit'
import { caller_abi } from '../../constants/caller_abi'
import { caller_contract } from '../../constants/contract_addresses'
import { getFieldIndex } from '../../helpers/helpers'
import { user_abi } from '../../constants/user_abi'
import { useAppContext } from '../../context/AppContext'

export default function Follow({ userToFollow }) {

    const userInfo = useAppContext()
    const { isAuthenticated } = useMoralis()
    const logged_userId = userInfo["logged_userId"]
    const queryUsersEvent = useMoralisQuery("UsersEvent");
    const fetchedUsersEvent = JSON.parse(JSON.stringify(queryUsersEvent.data, ["user", "sender", "block_number"]))
    const userEvents = fetchedUsersEvent.filter(user => (user["user"][getFieldIndex(user_abi, "userEvent", "userId")] === logged_userId))
    const haveUser = userEvents.length > 0 ? true : false
    const latestUserEvent = haveUser ? getLatestEvent(userEvents) : "none"

    function getLatestEvent(userEvents) {
        let max = { "user": 0, "sender": "", "block_number": 0 }
        userEvents.forEach(event => {
            if (event["block_number"] > max["block_number"]) max = event
        });

        return max
    }

    const dispatch = useNotification()
    const followings = haveUser ? latestUserEvent["user"][getFieldIndex(user_abi, "userEvent", "following")] : []
    const userIdToFollow = userToFollow["user"][getFieldIndex(user_abi, "userEvent", "userId")]

    const functionName = alreadyFollowing(followings) ? "unFollow" : "follow"

    function alreadyFollowing(followings) {
        let isFollowing = false
        followings?.forEach(following => {
            if (following === userIdToFollow) isFollowing = true
        })
        console.log("Account latest" + JSON.stringify(latestUserEvent))
        console.log("Account followings" + JSON.stringify(followings))
        return isFollowing
    }

    const handleFollowNotification = (message) => {
        dispatch({
            type: "success",
            message: message,
            title: "Success",
            position: "topL"
        })
    }

    const handleErrorNotification = (message) => {
        dispatch({
            type: "error",
            message: message,
            title: "Error",
            position: "topL"
        })
    }

    const { runContractFunction: followUnfollow, error: errorOnFollowUnfollow } = useWeb3Contract({
        abi: caller_abi,
        contractAddress: caller_contract,
        functionName: functionName,
        params: {
            userIdProtagonist: logged_userId,
            userIdAntagonist: userIdToFollow
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
                    await followUnfollow({
                        onError: (e) => {
                            console.log(e)
                            handleErrorNotification(JSON.stringify(e))
                        }
                    })
                    if (errorOnFollowUnfollow) {
                        console.log("Error on follow/unfollow: " + JSON.stringify(errorOnFollowUnfollow))
                        handleErrorNotification(JSON.stringify(errorOnFollowUnfollow))
                    } else {
                        handleFollowNotification(`${functionName} successfully submitted`)
                    }

                }}>
            </Button>
            {/* <Button text="debug" onClick={() => { console.log("Follow :" + functionName) }}></Button> */}
        </div>
    )
}
