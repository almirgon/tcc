import React from 'react'
import styles from './styles.module.css'
import { useHistory } from 'react-router-dom'
import { ReactComponent as BackBtn } from '../../assets/icons/back.svg'

const Back = () => {
  const history = useHistory()
  return (
    <div onClick={() => {history.goBack()}} className={styles.myBack}>
      <BackBtn />
    </div>
  )
}

export default Back
