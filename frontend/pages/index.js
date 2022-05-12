
import styles from '../styles/Home.module.css'
import { ConnectButton, CryptoLogos, Info, Button, Modal, useNotification } from 'web3uikit';
import { useMoralisQuery, useMoralis } from 'react-moralis';
import Feed from '../components/Feed';
import Categories from '../components/Categories';
import { useEffect, useState } from 'react';
import SwitchUser from '../components/SwitchUser';
import AddUser from '../components/AddUser';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState({ "categoryId": "0", "category": "default" })
  const [userHash, setUserHash] = useState()
  const queryCategories = useMoralisQuery("Categories")
  const fetchedCategories = JSON.parse(JSON.stringify(queryCategories.data, ["categoryId", "category"]))
  const queryUsers = useMoralisQuery("Users")
  const { isAuthenticated, account } = useMoralis()
  const fetchedUsers = JSON.parse(JSON.stringify(queryUsers.data, ["user"]))

  const usersToShow = fetchedUsers.filter(user => (user["user"][10].toLowerCase() === account))
  const haveUsers = usersToShow.length > 0 ? true : false

  useEffect(() => {
    console.log(userHash)
  }, [userHash])

  return (
    <div className={styles.home}>
      <div className={styles.topBanner}>
        <div className={styles.polyLogo}>
          <CryptoLogos
            chain="polygon"
            size="48px"
          />
          <text>BlockIt</text>
        </div>
        <div>
          <SwitchUser setUserHash={setUserHash} usersToShow={usersToShow} />
        </div>
        <div className={styles.connect}>
          <ConnectButton />
        </div>
      </div>
      {haveUsers ? <div className={styles.container}>
        <Categories categories={fetchedCategories} setSelectedCategory={setSelectedCategory} />
        <Feed selectedCategory={selectedCategory} userHash={userHash} />
      </div> : <div className={styles.noUser}>You need to mint an user before starting</div>}
      {isAuthenticated ? <div><AddUser /></div> : <div className={styles.noAccount}>Connect your wallet</div>}
    </div>
  )
}
