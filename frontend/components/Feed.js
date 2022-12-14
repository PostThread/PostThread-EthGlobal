import React, { useState } from 'react'
import { Avatar, Button } from 'web3uikit';
import styles from '../styles/Home.module.css'
import { useMoralis } from 'react-moralis';
import AddPost from './Feed/AddPost';
import Posts from './Feed/Posts';
import { useAppContext } from '../context/AppContext';

export default function Feed({ selectedCategory }) {

    let result = null;
    const [showAddPost, setShowAddPost] = useState(false)
    const { isAuthenticated, account } = useMoralis()

    function toggleShowAddPost() {
        setShowAddPost(!showAddPost)
    }

    if (selectedCategory["category"] === "default") {
        result =
            (<div>
                <h4>Choose a category</h4>
            </div>)
    } else {
        result = (
            <div className={styles.feedContainer}>
                <div className={styles.feedBanner}>
                    <Avatar isRounded theme="image" />
                    {isAuthenticated ? <p>{account}</p> : <h3>Connect your wallet</h3>}
                    <Button
                        icon="plus"
                        iconLayout="trailing"
                        id="test-button-secondary-icon-after"
                        onClick={toggleShowAddPost}
                        text="Post"
                        theme="secondary"
                        type="button"
                    />
                </div>
                {showAddPost ? <AddPost selectedCategory={selectedCategory} /> : ""}
                <div className={styles.post}><Posts selectedCategory={selectedCategory} /></div>
            </div>

        )
    }
    return (
        result
    )
}
