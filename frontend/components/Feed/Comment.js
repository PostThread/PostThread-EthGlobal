import React from 'react'
import { getFieldIndex } from '../../helpers/helpers'
import { comment_abi } from '../../constants/comment_abi'
import Vote from './Vote'
import styles from '../../styles/Home.module.css'


export default function Comment({ comment }) {

    const textIndex = getFieldIndex(comment_abi, "commentMinted", "text")
    const idIndex = getFieldIndex(comment_abi, "commentMinted", "inputId")
    const commentId = comment[idIndex]

    return (
        <div className={styles.contentVotes}>
            <h3>{comment[textIndex]}</h3>
            <Vote id={commentId} onPost={false} />
        </div>
    )
}
