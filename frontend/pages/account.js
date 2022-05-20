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
import { useAppContext } from '../context/AppContext';

export default function Account() {

    const { account } = useMoralis()
    const userInfo = useAppContext()
    const queryUsersEvent = useMoralisQuery("UsersEvent")
    const fetchedUsersEvent = JSON.parse(JSON.stringify(queryUsersEvent.data, ["user", "sender", "block_number"]))
    const userEvents = fetchedUsersEvent.filter(user => (user["sender"] === account))
    const haveUser = userEvents.length > 0 ? true : false
    let accountToShow = {}

    function getLatestEvent(userEvents) {
        let max = { "user": 0, "sender": "", "block_number": 0 }
        userEvents.forEach(event => {
            if (event["block_number"] > max["block_number"]) max = event
        });

        return max
    }


    if (typeof window !== 'undefined') {
        const accountToDisplay = localStorage.getItem('userToDisplay');
        const accountEventsFound = fetchedUsersEvent.filter(user => (user["user"][getFieldIndex(user_abi, "userEvent", "username")] === accountToDisplay))
        accountToShow = getLatestEvent(accountEventsFound)
        console.log("Account: " + JSON.stringify(accountToShow))
    }

    return (
        <div className={styles.page}>
            <div className={styles.topBanner}>
                <TopBanner username={userInfo["logged_username"]} />
            </div>
            <div className={styles.container}>
                {haveUser && <DisplayAccount account={accountToShow} />}
            </div>
        </div>
    )
}
