import React from 'react'
import { ConnectButton, CryptoLogos } from 'web3uikit';
import DisplayUser from './DisplayUser';
import TokenBalance from './TokenBalance';
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function TopBanner({ username }) {

    function routeToHome() {
        router.push("/")
    }

    return (
        <>
            <div className={styles.polyLogo}>
                <CryptoLogos
                    chain="polygon"
                    size="48px"
                />
                <a onClick={() => { console.log("TopBanner") }}>BlockIt</a>
            </div>
            <div>
                <DisplayUser username={username} />
            </div>
            <div>
                <TokenBalance />
            </div>
            <div className={styles.connect}>
                <ConnectButton />
            </div>
        </>
    )
}