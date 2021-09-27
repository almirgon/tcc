import React from 'react'
import styles from './styles.module.css'
import {useHistory} from 'react-router-dom';
import error404 from '../../assets/gifs/error.gif'
import Back from '../../components/Back';

const NotFound = () => {
  const history = useHistory()

  return (
    
  <section className={styles.errorPage}>
    <Back/>
    <div className={styles.myGif}>
      <img src={error404} alt="error404" />
      <h1>Página não encontrada</h1>
      <div className={"mobileBtn"}>
        <button className={"btn"} onClick={() => {history.push("/home")}}>Ir para Home</button>
      </div>
    </div>
  </section>
  )
}

export default NotFound
