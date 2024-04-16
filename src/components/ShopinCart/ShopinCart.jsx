import React, { useEffect, useState } from 'react'
import styles from './ShopinCart.module.scss'
import GoodsItem from './GoodsItem/GoodsItem'
import InputPhone from '../UI/InputPhone/InputPhone'
import Button from '../UI/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_PHONE, CLEAR_ORDER} from '../../store/reducers/orderReducer'
import axios from 'axios'
import { transformData } from '../../utils/transformData'
import Modal from '../Common/Modal/Modal'
import ModalLoading from '../Common/ModalLoading/ModalLoading'

const ShopinCart = (props) => {

  const dispatch = useDispatch()

  const phone = useSelector(state => state.orderReducer.phone)
  const shopincart = useSelector(state => state.orderReducer.shopingcart)

  const [hasGoods, setHasGoods] = useState(true)
  const [hasPhone, setHasPhone] = useState(true)
  const [isOrderLoading, setIsOrderLoading] = useState(false)
  const [isSuccessfulOrder, setIsSuccessfulOrder] = useState(false)

  const changePhone = (event) => {
    dispatch({ type: CHANGE_PHONE, payload: { phone: event.target.value } })
  }

  const sendOrder = (event) => {
    event.preventDefault()

    // приводим телефон в нужный строковый формат (нужно оптимизировать)
    const stringPhone = parseInt(phone.replace(/\D/g, "")).toString();

    //делаем проверки на наличие телефона и товаров в корзине
    if ((!phone || stringPhone.length !== 11) && (shopincart.length === 0)) {
      setHasPhone(false)
      setHasGoods(false)
      setTimeout(() => { setHasPhone(true) }, 2000)
      setTimeout(() => { setHasGoods(true) }, 2000);
      return;
    }
    if (!phone || stringPhone.length !== 11) {
      setHasPhone(false)
      setTimeout(() => { setHasPhone(true) }, 2000)
      return;
    }
    if (shopincart.length === 0) {
      setHasGoods(false);
      setTimeout(() => { setHasGoods(true) }, 2000);
      return;
    }

    // Делаем сам заказ
    setIsOrderLoading(true)
    axios.post("http://o-complex.com:1337/order", {
      "phone": stringPhone,
      "cart": transformData(shopincart)
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setIsOrderLoading(false)
        setIsSuccessfulOrder(true)
      })
      .catch(error => {
        console.error('Произошла ошибка:', error);
      })
  }

  useEffect(() => {
    if (shopincart.length !== 0) {
      setHasGoods(true)
    }
  }, [shopincart.length])

  const closeModal = () => {
    dispatch({ type: CLEAR_ORDER })
    setIsSuccessfulOrder(false)
  }

  return (
    <form className={styles.shopinCart + " " + props.className}onSubmit={sendOrder}>
      <div className={styles.title}>Добавленные товары</div>
      <div className={styles.goods}>
        {hasGoods
          ? shopincart.map((item, index) => (
            <GoodsItem key={index} title={item.title} count={item.count} total={item.total}/>
          ))
          : <div className={styles.hasNotGoods}>Вы не выбрали товары!</div>
        }
      </div>
      <div className={styles.footer}>
        <InputPhone isError={!hasPhone} value={phone} onChange={changePhone}/>
        <Button text="заказать" />
      </div>
      <Modal isOpen={isSuccessfulOrder} onClose={closeModal}/>
      <ModalLoading isOpen={isOrderLoading}/>
    </form>
  )
}

export default ShopinCart