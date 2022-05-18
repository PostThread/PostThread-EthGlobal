import React from 'react'
import { ConnectButton, CryptoLogos } from 'web3uikit';
import DisplayUser from './DisplayUser';
import TokenBalance from './TokenBalance';
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';

export default function TopBanner({ username }) {

    const router = useRouter()

    function routeToHome() {
        router.push("/")
    }

    return (
        <>
            <div className={styles.polyLogo}>
                <CryptoLogos
                    chain="polygon"
                    size="48px"
                    onClick={routeToHome}
                />
                <p>BlockIt</p>
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
