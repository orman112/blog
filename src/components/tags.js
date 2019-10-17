import React from "react"
import styles from "./tags.module.scss"

const Tags = ({ tags }) => {
  return (
    <p className={styles.tags}>
      {tags.map(tag => {
        return <span className={styles.tag}>#{tag}</span>
      })}
    </p>
  )
}

export default Tags
