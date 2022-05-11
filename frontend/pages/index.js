
import styles from '../styles/Home.module.css'
import { ConnectButton, CryptoLogos, Info, Button, Modal, useNotification } from 'web3uikit';
import { useMoralisQuery } from 'react-moralis';
import Feed from '../components/Feed';
import Categories from '../components/Categories';
import { useState } from 'react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState({ "categoryId": "0", "category": "default" })
  const queryCategories = useMoralisQuery("Categories")
  const fetchedCategories = JSON.parse(JSON.stringify(queryCategories.data, ["categoryId", "category"]))

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
        <div className={styles.connect}>
          <ConnectButton />
        </div>
      </div>
      <div className={styles.container}>
        <Categories categories={fetchedCategories} setSelectedCategory={setSelectedCategory} />
        <Feed selectedCategory={selectedCategory} />
      </div>
    </div>
  )
}
