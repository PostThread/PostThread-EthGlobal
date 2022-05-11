import React from 'react'
import { Button } from 'web3uikit'
import styles from '../styles/Home.module.css'

export default function Categories({ categories, setSelectedCategory }) {

    function selectCategory(categoryId) {
        const selectedCategory = categories.filter((category) => category["categoryId"] === categoryId)
        setSelectedCategory(selectedCategory)
    }

    return (
        <div className={styles.categories}>
            {categories.map((category) => (
                <Button
                    key={category["categoryId"]}
                    id={category["categoryId"]}
                    onClick={(e) => selectCategory((Number(e.target.id)))}
                    text={category["category"]}
                    theme="secondary"
                    type="button"
                    size="large"
                />
            ))}
        </div>
    )
}
