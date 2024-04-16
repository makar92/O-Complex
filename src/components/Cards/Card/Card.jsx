import React, { useEffect, useState } from 'react'
import Button from '../../UI/Button/Button'
import styles from './Card.module.scss'
import ButtonCounter from '../../UI/ButtonCounter/ButtonCounter'
import Counter from '../../UI/Сounter/Сounter'
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_SHOPINGCART, DELETE_GOODS_ITEM } from '../../../store/reducers/orderReducer'

const Card = (props) => {

  const dispatch = useDispatch()

  const [count, setCount] = useState(0)

  const shopingcart = useSelector(state => state.orderReducer.shopingcart)
  const indexToFined = shopingcart.findIndex(item => item.id === props.id)
  const countX = useSelector((state) => {
    if (shopingcart.length !== 0 && indexToFined !== -1) {
      return state.orderReducer.shopingcart[indexToFined].count
    }
  })

  //Устанавливаем значение из стейта (т.е. из sessionStorage)
  useEffect(() => {
    if (countX !== undefined) {
      setCount(countX)
    } else if (!shopingcart.length) {
      setCount(0)
    } 
  }, [count, shopingcart.length, countX])

  const changeCount = (event) => {
    const selectedNumber = Number(event.target.value)

    if (selectedNumber !== 0) {
      dispatch({
        type: CHANGE_SHOPINGCART, payload: {
          id: props.id,
          title: props.title,
          count: selectedNumber,
          price: props.price
        }
      })
    } else {
      dispatch({
        type: DELETE_GOODS_ITEM, payload: {
          id: props.id,
        }
      })
    }

    setCount(selectedNumber)
  }

  const incrementCount = () => {
    dispatch({
      type: CHANGE_SHOPINGCART, payload: {
        id: props.id,
        title: props.title,
        count: count + 1,
        price: props.price
      }
    })
    setCount(count + 1)
  }

  const decrementCount = () => {

    if (count - 1 !== 0) {
      dispatch({
        type: CHANGE_SHOPINGCART, payload: {
          id: props.id,
          title: props.title,
          count: count - 1,
          price: props.price
        }
      })
    } else {
      dispatch({
        type: DELETE_GOODS_ITEM, payload: {
          id: props.id,
        }
      })
    }

    setCount(count - 1)
  }

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={props.image} alt="img" />
      </div>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.description}>{props.description}</div>
      <div className={styles.price}>цена: {props.price}₽</div>
      {count
        ? <div className={styles.footer}>
          <ButtonCounter type="-" onClick={decrementCount} />
          <Counter count={count} onChange={changeCount} />
          <ButtonCounter type="+" onClick={incrementCount} />
        </div>
        : <div className={styles.footer}>
          <Button text="купить" onClick={incrementCount} />
        </div>
      }
    </div>
  )
}

export default Card