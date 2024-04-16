import React from 'react'
import styles from './Feedback.module.scss'

const Feedback = ({children}) => {

  return (
    <div className={styles.feddback}>{children}</div>
  )
}

export default Feedback