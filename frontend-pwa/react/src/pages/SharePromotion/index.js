import {useState, useRef} from 'react'
import share from '../../assets/gifs/share.gif'
import Loading from '../../components/Loading'
import Back from '../../components/Back'
import {Form} from '@unform/web'
import Input from '../../components/Form/Input'
import Textarea from '../../components/Form/Textarea'
import * as Yup from 'yup'
import Notification, { showToast } from '../../components/Notification'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PromotionService from '../../services/PromotionService'
import {useHistory} from 'react-router-dom';
import {Animated} from "react-animated-css";

const SharePromotion = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null);
  const [useToast, setToast] = useState(false);
  const history = useHistory()
  const MySwal = withReactContent(Swal)

  let loadingStyle = {
    background: 'none'
  }

  async function registerPromotion(data){
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório').min(5, 'No mínimo 5 caracteres').max(25, 'No máximo 25 caracteres'),
        description: Yup.string().required('A descrição é obrigatória').min(5, 'No mínimo 10 caracteres').max(250, 'No máximo 250 caracteres'),
        price: Yup.number().required('O preço é obrigatório').min(1, 'O menor valor é R$ 1'),
        urlLink: Yup.string().required('A url é obrigatória')
      }) 
      
       await schema.validate(data, {
        abortEarly: false
      })
      setLoading(true)
      PromotionService.createPromotion(data).then((response) => {
        if(response.status === 201){
          setLoading(false)
          MySwal.fire({
            icon: 'success',
            title: `Promoção cadastrada com Sucesso`,
            text: `Sua promoção será avaliada por nossos administradores, se aprovada, logo estará no feed :D`,
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
            willClose: () => {
              history.push("/home")
            }
          })
        }
      }, () => {
        MySwal.fire({
          icon: 'error',
          title: `Ocorreu um erro no cadastro`,
          text: `Tente novamente mais tarde! :(`,
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          willClose: () => {
            history.push("/home")
          }
        })
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
  <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
  <section className={"page"}>
    <Back/>
  <div className={"intro"}>
    <img src={share} alt="promotion-share" />
  </div>
  {loading ?  <div className={"myDiv"} style={loadingStyle}>
    <Loading/>
  </div> :  <div className={"myDiv"}>
    <h1>Compartilhe uma promoção conosco :)</h1>
    <Form ref={formRef} onSubmit={registerPromotion} className={"myForm"}>
      <Input label="Nome" name="name" type="text"/>
      <Textarea label="Descrição" name="description" type="text" cols="30" rows="10"/>
      <Input label="Preço" step="any" name="price" type="number"/>
      <Input label="Link" name="urlLink" type="text"/>
      <Input label="Cupom" name="voucher" type="text"/>
      <div className={"mobileBtn"}>
        <button className={"btn"} type="submit">Enviar</button>
      </div>
    </Form>
  </div>}
  {useToast ? <Notification/> : null}
</section>
</Animated>
  )
}

export default SharePromotion
