import React from 'react'
import styles from './Сounter.module.scss'

const Сounter = ({...props}) => {
  return (
    <input className={styles.counter} type="text" {...props} value={props.count}/>
  )
}

export default Сounter