import React, { useState, useEffect } from 'react'
import { useWeb3Contract } from 'react-moralis'
import { caller_abi } from '../../constants/caller_abi'
import { caller_contract } from '../../constants/contract_addresses'
import { useAppContext } from '../../context/AppContext'
import styles from '../../styles/Home.module.css'
import { Button } from 'web3uikit'

// Quest: { "hash": "0x57963c28c01de15e6b2a2232ace8f19b6c65a6dd2b08270233cce74d11869b2d", "type": 2, "accessList": null, "blockHash": null, "blockNumber": null, "transactionIndex": null, "confirmations": 0, "from": "0x9Ff2127417B36Eb0d4E9ed5Dfb67db8E8BB0442F", "gasPrice": { "type": "BigNumber", "hex": "0x07e793e384" }, "maxPriorityFeePerGas": { "type": "BigNumber", "hex": "0x07e793e378" }, "maxFeePerGas": { "type": "BigNumber", "hex": "0x07e793e384" }, "gasLimit": { "type": "BigNumber", "hex": "0x71a9" }, "to": "0x6c88F1c9E36dc6dBAf1E643184A16Ec75552283c", "value": { "type": "BigNumber", "hex": "0x00" }, "nonce": 658, "data": "0xbff36bc40000000000000000000000000000000000000000000000000000000000000001", "r": "0xca0b5367fc4319d470c191b1480ecc0dd6bcb7ed0de36e1c7fd356d0f3a1e379", "s": "0x0f625e9d5958ffa78fd1765ccfca5678a5ac8b59e1cd0e7a9422971fab604b04", "v": 0, "creates": null, "chainId": 0 }

export default function Quest() {

    const [quest, setQuest] = useState()
    const userInfo = useAppContext()
    const userId = userInfo["logged_userId"]

    useEffect(() => {

    }, [quest])

    async function setTodayQuest() {
        await setDailyQuest({
            onError: (e) => {
                console.log(JSON.stringify(e))
            }
        })
    }

    async function getTodayQuest() {
        await setTodayQuest()
        const todayQuest = await getUserQuest({
            onError: (e) => {
                console.log(JSON.stringify(e))
                setQuest(0)
            }
        })
        console.log("Quest: " + JSON.stringify(todayQuest))
        setQuest(Number(todayQuest))
    }

    const { runContractFunction: setDailyQuest } = useWeb3Contract({
        abi: caller_abi,
        contractAddress: caller_contract,
        functionName: "setDailyQuest",
        params: {
            userId: userId,
        },
    })

    const { runContractFunction: getUserQuest } = useWeb3Contract({
        abi: caller_abi,
        contractAddress: caller_contract,
        functionName: "getUserQuest",
        params: {
            userId: userId,
        },
    })

    return (
        <div className={styles.exp}>
            <Button onClick={async () => {
                await getTodayQuest()
            }} text="Get Quest" />
            {quest && <p>Today quest is : {JSON.stringify(quest)}</p>}
        </div>
    )
}
