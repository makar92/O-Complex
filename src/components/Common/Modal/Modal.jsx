import React from 'react';
import styles from './Modal.module.scss';
import { GiCheckMark } from "react-icons/gi";

const Modal = ({ isOpen, onClose }) => {
  
  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <GiCheckMark color="#1c8f08" size="80px"/>
        <div>Ваш заказ отправлен!</div>
      </div>
    </div>
  );
};

export default Modal;
