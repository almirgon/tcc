import {useState, useRef, useContext} from 'react'
import styles from './styles.module.css'
import Loading from '../../components/Loading'
import Register from '../../components/Register'
import {useHistory} from 'react-router-dom';
import Back from '../../components/Back';
import AuthService from '../../services/AuthService';
import {Form} from '@unform/web'
import Input from '../../components/Form/Input'
import Notification, { showToast } from '../../components/Notification'
import * as Yup from 'yup'
import { GlobalContext } from '../../hooks/GlobalContext';
import {Animated} from "react-animated-css";

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [register, setRegister] = useState(false)
  const history = useHistory()
  const formRef = useRef(null);
  const [useToast, setToast] = useState(false);
  const context = useContext(GlobalContext)
  const {setAuthorized,setAdmin} = context;

  async function handleLogin(data){
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email('Digite um email válido').required('O email é obrigatório'),
        password: Yup.string().required('A senha é obrigatória')
      }) 
      
       await schema.validate(data, {
        abortEarly: false
      })
      setLoading(true)
      AuthService.login(data).then((response) => {
        if(response.status === 200){
          setLoading(false)
          setAuthorized(true)
          if(response.data.userDTO.role === 'ADMIN'){
            setAdmin(true)
          }
          history.push("/")
        }
      })
      
    } catch (err) {
      setToast(true)
      showToast({ type: "warning", message: "Ocorreu um erro no login, por favor verifique os dados do formulário" });
      if (err instanceof Yup.ValidationError){
        const errorMessages = {}
        err.inner.forEach(error => {
          errorMessages[error.path] = error.message
        })
        formRef.current.setErrors(errorMessages)
      }
    }
  }

  function goToForgot(){
    history.push("/forgot")
  }

  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
    <section className={styles.loginPage}>
      <Back/>
    {loading ? <div className={styles.loginDiv}>
      <Loading/>
    </div> : <div className={styles.loginDiv}>
      <h1 className={styles.myH1}>Login</h1>
      <Form ref={formRef} onSubmit={handleLogin} className={styles.loginForm}>
        <Input label="Email" type="email" name="email" id="email"/>
        <Input label="Senha" type="password" name="password" id="password"/>
        <div className={"mobileBtn"}><button type="submit" className={"btn"}>Login</button></div>
      </Form>
      <div className={styles.forgot} >
        <p onClick={goToForgot}>Esqueceu a senha? Clique Aqui</p>
      </div>
    </div>}
    {register ? <Register/> : <div className={styles.loginDiv}>
        <h1>Crie sua Conta</h1>
        <button id="create-btn" className={"btn"} onClick={() => {setRegister(true)}}>Criar Conta</button>
      </div>}
    {useToast ? <Notification/> : null}
    </section>
    </Animated>
  )
}

export default Login
