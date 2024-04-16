import React from 'react'
import styles from './Loader.module.scss'

const Loader = () => {
  return (
    <div>
      <div className={styles.loader}>
        П<div className={styles.spiner}></div>д<div className={styles.spiner}></div>ждите
      </div>
    </div>
  )
}

export default Loader