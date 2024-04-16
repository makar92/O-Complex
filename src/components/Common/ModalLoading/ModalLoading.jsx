import React from 'react';
import styles from './ModalLoading.module.scss';

const ModalLoading = ({ isOpen }) => {

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
      <div className={styles.modalContent}>
        <div className={styles.loader}>
          П<div className={styles.spiner}></div>д<div className={styles.spiner}></div>ждите
        </div>
        <div className={styles.loader}>
          <div className={styles.spiner}></div>тправляется заказ
        </div>
      </div>
    </div>
  );
};

export default ModalLoading;
