import React from 'react'
import styles from './ButtonCounter.module.scss'

const ButtonCounter = ({...props}) => {

  let type

  if (props.type === "+") {
    type = "+"
  } else if (props.type === "-") {
    type = "-"
  }

  return (
    <div className={styles.ButtonCounter} {...props}>{type}</div>
  )
}

export default ButtonCounter