import React from 'react'
import styles from './Header.module.scss'

const Header = (props) => {
  return (
    <div className={styles.header + " " + props.className}>
      Тестовое задание
    </div>
  )
}

export default Header