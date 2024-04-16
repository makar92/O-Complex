import React, { useEffect, useState } from 'react';
import styles from './Cards.module.scss';
import Card from './Card/Card';
import axios from 'axios';
import Loader from '../Common/Loader/Loader';

const Cards = () => {
  
  const [goods, setGoods] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  const loadGoods = () => {
    
    if (!hasMore || isLoading) return;
    setIsLoading(true);

    axios.get("http://o-complex.com:1337/products", {
      headers: {
        'content-type': 'application/json'
      },
      // Сделал размер 18, т.к делится на 3 и на 2 (для заполнености грида)
      params: {'page': page, 'page_size': 18}
    })
      .then(response => {
        const newGoods = response.data.products;
        setGoods(prevGoods => [...prevGoods, ...newGoods]);
        setPage(prevPage => prevPage + 1);
        if (newGoods.length === 0) setHasMore(false);
      })
      .catch(error => {
        console.error('Произошла ошибка:', error);
      })
      .finally(() => {
        setTimeout(() => {setIsLoading(false)}, 500);
      });
  }


  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20 && !isLoading) {
        loadGoods();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);


  useEffect(() => {
    loadGoods();
  }, []);

  return (
    <div className={styles.cards}>
      <div className={styles.cardsItems}>
        {goods.map((goodsItem, index) => (
          <Card
            // использовал индекс что бы исключить одинаковый id, 
            // т.к. в отзывах есть такая ошибка с сервера
            key={index}
            id={goodsItem.id}
            image={goodsItem.image_url}
            title={goodsItem.title}
            description={goodsItem.description}
            price={goodsItem.price}
          />
        ))}
      </div>
      {isLoading
        ? <Loader />
        // Высота пустого блока должна равна высоте лоадера
        : <div className={styles.emptyBlock}>emptyBlock</div>
      }
      {!isLoading && !hasMore && <div className={styles.infoBlock}>
        Больше нет товаров
      </div>}
    </div>
  );
}

export default Cards;
