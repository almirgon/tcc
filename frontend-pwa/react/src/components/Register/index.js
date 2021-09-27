import {useState, useRef} from 'react'
import styles from './styles.module.css'
import {Form} from '@unform/web'
import Input from '../Form/Input'
import * as Yup from 'yup'
import UserService from '../../services/UserService'
import Notification, { showToast } from '../../components/Notification'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Register = () => {

  const formRef = useRef(null);
  const [useToast, setToast] = useState(false);
  const MySwal = withReactContent(Swal)

  async function handleSubmit(data){
    try {
      const schema = Yup.object().shape({
        firstName: Yup.string().required('O nome é obrigatório').min(2, 'No mínimo 2 caracteres').max(20, 'No máximo 20 caracteres'),
        lastName: Yup.string().required('O sobrenome é obrigatório').min(2, 'No mínimo 2 caracteres').max(20, 'No máximo 20 caracteres'),
        email: Yup.string().email('Digite um email válido').required('O email é obrigatório'),
        password: Yup.string().required('A senha é obrigatória').min(5, 'No mínimo 5 caracteres')
      }) 
      
       await schema.validate(data, {
        abortEarly: false
      })

      UserService.createUser(data).then((response) => {
        if(response.status === 201){
          MySwal.fire({
            icon: 'success',
            title: `Cadastro Realizado com Sucesso`,
            text: `Olá ${response.data.firstName}! Seja bem vindo ao Promotion`,
            showConfirmButton: true,
            confirmButtonColor: '#42B983',
            confirmButtonText: "Vamos lá :P",
          }).then((result) => {
            if(result.isConfirmed){
              let userCredentials = {
                email: data.email,
                password: data.password
              }
              console.log(userCredentials)
            }
          })
        }
        else{
          MySwal.fire({
            icon: 'error',
            title: `Ocorreu um erro no seu cadastro`,
            text: `Tente novamente mais tarde!`,
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true
          })
        }
      })
      
    } catch (err) {
      setToast(true)
      showToast({ type: "warning", message: "Ocorreu um erro no cadastro, por favor verifique os dados do formulário" });
      if (err instanceof Yup.ValidationError){
        const errorMessages = {}
        err.inner.forEach(error => {
          errorMessages[error.path] = error.message
        })
        formRef.current.setErrors(errorMessages)
      }
    }
  }
  return (
    
    <div className={styles.register}>
      <h1 className={styles.myH1}>Cadastro</h1>
      <Form ref={formRef} onSubmit={handleSubmit} className={styles.myForm}>
        <Input label="Nome" type="text" name="firstName"/>
        <Input label="Sobrenome" type="text" name="lastName" />
        <Input label="Email" type="email" name="email"/>
        <Input label="Senha" type="password" name="password" />
        <div className={"mobileBtn"}><button className={"btn"} type="submit">Cadastrar</button></div>
      </Form>
      {useToast ? <Notification/> : null}
    </div>
  )
}

export default Register