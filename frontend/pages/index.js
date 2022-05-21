
import styles from '../styles/Home.module.css'
import { useMoralisQuery, useMoralis } from 'react-moralis';
import Feed from '../components/Feed';
import Categories from '../components/Categories';
import { useState } from 'react';
import AddUser from '../components/AddUser';
import Faucet from '../components/Faucet';
import TopBanner from '../components/TopBanner'
import { useAppContext } from '../context/AppContext';
import Quest from '../components/Feed/Quest';
import GoToWorldCoin from '../components/GoToWorldCoin';

export default function Home() {

  const { isAuthenticated } = useMoralis()
  const [selectedCategory, setSelectedCategory] = useState({ "categoryId": "0", "category": "default" })
  const queryCategories = useMoralisQuery("Categories")
  const fetchedCategories = JSON.parse(JSON.stringify(queryCategories.data, ["categoryId", "category"]))
  const userInfo = useAppContext()
  const username = userInfo["logged_username"]
  const userId = userInfo["logged_userId"]
  const haveUser = userId > 0 ? true : false


  function debug() {
    console.log("User : " + JSON.stringify(username))
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBanner}>
        <TopBanner username={username} />
      </div>
      {/* <Button text='Debug' onClick={debug}></Button> */}
      {isAuthenticated ?
        <div className={styles.utilities}>
          <Faucet />
          <GoToWorldCoin />
          {haveUser ? <Quest /> : <AddUser />}
        </div> :
        <div className={styles.noAccount}>Connect your wallet</div>}
      {haveUser ?
        <>
          <div className={styles.categories}>
            <Categories categories={fetchedCategories} setSelectedCategory={setSelectedCategory} />
          </div>
          <div className={styles.container}>
            <Feed selectedCategory={selectedCategory} />
          </div>
        </> : <div className={styles.noUser}>You need to mint an user before starting</div>}
    </div>
  )
}
