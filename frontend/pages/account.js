import React from 'react'
import DisplayUser from '../components/DisplayUser';
import TokenBalance from '../components/TokenBalance';
import styles from '../styles/Home.module.css'
import { ConnectButton, CryptoLogos } from 'web3uikit';
import { useMoralisQuery, useMoralis } from 'react-moralis';
import DisplayAccount from '../components/Account/DisplayAccount';

export default function Account() {

    const { account } = useMoralis()
    const queryUsers = useMoralisQuery("Users")
    const fetchedUsers = JSON.parse(JSON.stringify(queryUsers.data, ["user", "sender"]))
    const userToShow = fetchedUsers.filter(user => (user["sender"] === account))
    const haveUser = userToShow.length > 0 ? true : false
    const user = haveUser ? userToShow[0]["user"] : "none"

    return (
        <div className={styles.page}>
            <div className={styles.topBanner}>
                <div className={styles.polyLogo}>
                    <CryptoLogos
                        chain="polygon"
                        size="48px"
                    />
                    <text>BlockIt</text>
                </div>
                <div>
                    <DisplayUser user={user} />
                </div>
                <div>
                    <TokenBalance />
                </div>
                <div className={styles.connect}>
                    <ConnectButton />
                </div>
            </div>
            <div className={styles.container}>
                <DisplayAccount account={account} user={user} />
            </div>
        </div>
    )
}
