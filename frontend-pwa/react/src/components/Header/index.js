import {useContext} from 'react'
import styles from './styles.module.css'
import logo from '../../assets/logo.svg'
import {ReactComponent as AddPromotion} from '../../assets/icons/add.svg'
import {ReactComponent as Check} from '../../assets/icons/check.svg'
import {ReactComponent as Home} from '../../assets/icons/home.svg'
import {ReactComponent as Logout} from '../../assets/icons/logout.svg'
import {useHistory} from "react-router-dom";
import { GlobalContext } from '../../hooks/GlobalContext'
import AuthService from '../../services/AuthService'

const Header = () => {
  const context = useContext(GlobalContext)
  const history = useHistory();
  const {authorized,setAuthorized,admin,setAdmin} = context;

  function logOut(){
    AuthService.logout()
    setAuthorized(false)
    setAdmin(false)
    history.push('/')
  }
  function addPromotion(){
    history.push('/share-promotion')
    
  }
  function home(){
    history.push('/')
  }
  function goToAdmin(){
    history.push('/admin')
  }
  function login(){
    history.push('/login')
 
  }

  return (
    <header className={styles.myHeader}>
      <div>
        <img onClick={home} className={styles.myLogo} src={logo} alt="promotion-logo" />
      </div>
      {authorized && !admin && <div className={styles.buttons}>
        <button onClick={home} id="span-btn" className={"mobile"}><Home/></button>
        <button onClick={addPromotion} id="span-btn" className={"mobile"}><AddPromotion/></button>
        <button onClick={logOut} id="span-btn" className={"mobile"}><Logout/></button>
      </div>}
      {authorized && admin && <div className={styles.buttons}>
      <button onClick={home} id="span-btn" className={"mobile"}><Home/></button>
      <button onClick={goToAdmin} id="span-btn" className={"mobile"}><Check/></button>
      <button onClick={logOut} id="span-btn" className={"mobile"}><Logout/></button>
      </div>}
      {!authorized && !admin && <div>
        <button onClick={login} className={"btn"}>Login</button>
      </div>}
    </header>
  )
}

export default Header
