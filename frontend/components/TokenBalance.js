import React, { useState, useEffect } from 'react'
import { block_abi } from '../constants/block_abi'
import { block_contract } from '../constants/contract_addresses'
import { Badge } from 'web3uikit'
import { useWeb3Contract, useMoralis } from 'react-moralis'
import styles from '../styles/Home.module.css'


export default function TokenBalance() {

    const { isAuthenticated, account } = useMoralis()
    const [balance, setBalance] = useState()

    useEffect(() => {
        const userBalance = async () => {
            const _balance = await balanceOf({ onError: (e) => console.log(e) })
            setBalance(String(Number(_balance)))
        }
        userBalance()
    }, [account])

    const { runContractFunction: balanceOf, error: errorOnBalance } = useWeb3Contract({
        abi: block_abi,
        contractAddress: block_contract,
        functionName: "balanceOf",
        params: {
            account: account
        },
    })



    return (
        <div className={styles.balance}>
            {`Balance: ${balance} BLK`}
        </div>
    )
}
