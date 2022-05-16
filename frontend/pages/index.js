
import styles from '../styles/Home.module.css'
import { ConnectButton, CryptoLogos } from 'web3uikit';
import { useMoralisQuery, useMoralis } from 'react-moralis';
import Feed from '../components/Feed';
import Categories from '../components/Categories';
import { useEffect, useState } from 'react';
import AddUser from '../components/AddUser';
import Faucet from '../components/Faucet';
import DisplayUser from '../components/DisplayUser';
import TokenBalance from '../components/TokenBalance';

export default function Home() {
  const { isAuthenticated, account } = useMoralis()
  const [selectedCategory, setSelectedCategory] = useState({ "categoryId": "0", "category": "default" })
  const queryCategories = useMoralisQuery("Categories")
  const fetchedCategories = JSON.parse(JSON.stringify(queryCategories.data, ["categoryId", "category"]))
  const queryUsers = useMoralisQuery("Users")
  const fetchedUsers = JSON.parse(JSON.stringify(queryUsers.data, ["user", "sender"]))
  const userToShow = fetchedUsers.filter(user => (user["sender"] === account))
  const haveUser = userToShow.length > 0 ? true : false
  const user = haveUser ? userToShow[0]["user"] : "none"

  // useEffect(() => {
  //   console.log("User" + haveUser)
  //   console.log("User: " + (JSON.stringify(userToShow)))
  //   console.log("User index: " + getFieldIndex(user_abi["user_abi"], "userMinted", "username"))
  //   console.log("Field index: " + JSON.stringify(user_abi["user_abi"]))
  //   console.log("User: " + (JSON.stringify(userToShow[0]["user"][0])))
  // }, [])

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
          <DisplayUser user={user} />
        </div>
        <div>
          <TokenBalance />
        </div>
        <div className={styles.connect}>
          <ConnectButton />
        </div>
      </div>
      {isAuthenticated ?
        <div className={styles.utilities}>
          <Faucet />
          <AddUser />
        </div> :
        <div className={styles.noAccount}>Connect your wallet</div>}
      {haveUser ?
        <>
          <div className={styles.categories}>
            <Categories categories={fetchedCategories} setSelectedCategory={setSelectedCategory} />
          </div>
          <div className={styles.container}>
            <Feed selectedCategory={selectedCategory} user={user} />
          </div>
        </> : <div className={styles.noUser}>You need to mint an user before starting</div>}

    </div>
  )
}
