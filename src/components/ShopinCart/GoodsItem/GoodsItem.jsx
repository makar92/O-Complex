import React from 'react'
import styles from './GoodsItem.module.scss'

const GoodsItem = (props) => {
  return (
    <div className={styles.goodsItem}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.count}>x{props.count}</div>
      <div className={styles.total}>{props.total}₽</div>
    </div>
  )
}

export default GoodsItem