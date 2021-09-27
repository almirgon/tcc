import React from 'react'
import styles from './styles.module.css'
import forgot from '../../assets/gifs/forgot.gif'
import Back from '../../components/Back';
import {Animated} from "react-animated-css";

const ForgotPassword = () => {
  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
    <section className={styles.forgotPage}>
      <Back/>
      <div className={styles.intro}>
        <img className={styles.forgotImg} src={forgot} alt="promotion-forgot" />
      </div>
      <form className={styles.forgot}>
        <div className={styles.title}>
          <h2>Funcionalidade em Desenvolvimento</h2>
        </div>
      </form>
  </section>
  </Animated>
  )
}

export default ForgotPassword
