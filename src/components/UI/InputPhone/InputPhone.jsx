import React from 'react'
import styles from './InputPhone.module.scss'
import InputMask from 'react-input-mask'

const InputPhone = ({isError, ...props }) => {

  return (
    <div  className={isError
      ? styles.errorText
      : ""
    }>
      <InputMask
        className={styles.inputPhone}
        mask='+7\ (999) 999 99-99'
        placeholder='+7 (___) ___ __-__'
        {...props}
      />
    </div>
  )
}

export default InputPhone