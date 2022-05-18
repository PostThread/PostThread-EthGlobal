import React from 'react'
import DisplayUser from '../components/DisplayUser';
import TokenBalance from '../components/TokenBalance';
import styles from '../styles/Home.module.css'
import { ConnectButton, CryptoLogos } from 'web3uikit';
import { useMoralisQuery, useMoralis } from 'react-moralis';
import DisplayAccount from '../components/Account/DisplayAccount';
import { getFieldIndex } from '../helpers/helpers';
import { user_abi } from '../constants/user_abi';
import TopBanner from '../components/TopBanner';

export default function Account() {

    const { account } = useMoralis()
    const queryUsers = useMoralisQuery("Users")
    const fetchedUsers = JSON.parse(JSON.stringify(queryUsers.data, ["user", "sender"]))
    const logged_userToShow = fetchedUsers.filter(user => (user["sender"] === account))
    const logged_haveUser = logged_userToShow.length > 0 ? true : false
    const logged_username = logged_haveUser ? logged_userToShow[0]["user"][getFieldIndex(user_abi, "userMinted", "username")] : "No user"
    const logged_userId = logged_haveUser ? logged_userToShow[0]["user"][getFieldIndex(user_abi, "userMinted", "userId")] : "-1"
    let accountToDisplay = "No user"
    let accountToShow = {}
    let haveAccount = false

    if (typeof window !== 'undefined') {
        accountToDisplay = localStorage.getItem('userToDisplay');
        accountToShow = fetchedUsers.filter(user => (user["user"][getFieldIndex(user_abi, "userMinted", "username")] === accountToDisplay))
        console.log("Account: " + JSON.stringify(accountToShow))
        haveAccount = accountToShow.length > 0 ? true : false
    }

    return (
        <div className={styles.page}>
            <div className={styles.topBanner}>
                <TopBanner username={logged_username} />
            </div>
            <div className={styles.container}>
                {haveAccount && <DisplayAccount account={accountToShow} />}
            </div>
        </div>
    )
}
