import React, { useEffect, useState } from 'react'
import Feedback from './Feedback/Feedback'
import styles from './Feedbacks.module.scss'
import axios from 'axios'

const Feedbacks = (props) => {

  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    
    axios.get("http://o-complex.com:1337/reviews")
    .then(response => {
      setFeedbacks(response.data)
      //console.log('Данные получены:', response.data);
    })
    .catch(error => {
      console.error('Произошла ошибка:', error);
    });
  }, [])

  return (
    <div className={styles.feedbacks + " " + props.className}>
      {feedbacks.map((item, index) => (  
        <Feedback key={index}>
          <div dangerouslySetInnerHTML={{ __html: item.text }} />
        </Feedback>
      ))}
    </div>
  )
}

export default Feedbacks