import React from 'react'

export default function Follow({ follow }) {

    const dispatch = useNotification()

    const functionName = follow ? "follow" : "unfollow"

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
            userIdToFollow: "test",
            userIdThatFollowed: "test"
        },
    })

    return (
        <div>
            <Button size='large' text={functionName} icon="plus"
                iconLayout="trailing"
                color="blue"
                theme="colored"
                type="button"
                disabled={!isAuthenticated}
                onClick={async () => {
                    await followUnfollow()
                    if (errorOnFollowUnfollow) {
                        console.log("Error on follow/unfollow: " + errorOnFollowUnfollow)
                        handleErrorNotification()
                    } else {
                        handleFollowNotification()
                    }

                }}>
            </Button>
        </div>
    )
}
