import React, { useState, useEffect } from 'react'
import { useWeb3Contract } from 'react-moralis'
import { caller_abi } from '../constants/caller_abi'
import { caller_contract } from '../constants/contract_addresses'
import styles from '../styles/Home.module.css'
import { Button } from 'web3uikit'

export default function Gas() {

    const [gasPrice, setGasPrice] = useState()

    useEffect(() => {

    }, [gasPrice])

    async function getGasPrice() {
        const price = await getGasFee({
            onError: (e) => {
                console.log(JSON.stringify(e))
                setGasPrice("0")
            }
        })
        setGasPrice(price)
    }

    const { runContractFunction: getGasFee } = useWeb3Contract({
        abi: caller_abi,
        contractAddress: caller_contract,
        functionName: "getGasFee",
        params: {
        },
    })

    return (
        <div className={styles.exp}>
            <Button
                fill="#000000"
                size="medium"
                type="button"
                icon="info"
                text="Gas"
                onClick={async () => {
                    await getGasPrice()
                }} />
            {gasPrice && <p>Gas price : {String(gasPrice)}</p>}
        </div>
    )
}
