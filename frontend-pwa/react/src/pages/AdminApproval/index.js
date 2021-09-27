import {useState, useRef, useEffect} from 'react'
import styles from './styles.module.css'
import approve from '../../assets/gifs/approve.gif'
import Loading from '../../components/Loading'
import Back from '../../components/Back'
import { useParams, useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import Input from '../../components/Form/Input'
import PromotionService from '../../services/PromotionService'
import Notification, { showToast } from '../../components/Notification'
import {Animated} from "react-animated-css";

import * as Yup from 'yup'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AdminApproval = () => {
  const params = useParams();
  const formRef = useRef(null)
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [promotion, setPromotion] = useState("")
  const [useToast, setToast] = useState(false);
  const MySwal = withReactContent(Swal)

  let loadingStyle = {
    background: 'none'
  }
  console.log(params.id)

  useEffect(() => {
    setLoading(true)
    PromotionService.getPromotionById(params.id).then((response) => {
      if(response.status === 200){
        setPromotion(response.data)
        setLoading(false)
      }
    })
  }, [params.id])

  async function handleSubmit(data){
    try {
      const schema = Yup.object().shape({
        soldBy: Yup.string().required('O local da venda é obrigatório').min(2, 'No mínimo 2 caracteres').max(20, 'No máximo 20 caracteres'),
        photo: Yup.string().required('A url da foto é obrigatória').min(5, 'No mínimo 5 caracteres'),
      }) 
      
       await schema.validate(data, {
        abortEarly: false
      })

      console.log(data)
      setLoading(true)
      PromotionService.putPromotion(params.id, data).then((response) => {
        if(response.status === 200){
          setLoading(false)
          MySwal.fire({
            icon: 'success',
            title: `Aprovada!`,
            text: `Obaa a promoção foi aprovada com sucesso e já encontra-se no feed :D`,
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true
          }).then(()=>{
            history.push("/admin")
          })
        }
      }, () => {
        MySwal.fire({
          icon: 'error',
          title: 'Ocorreu um erro',
          text: 'Tente novamente mais tarde',
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true
        }).then(()=>{
          history.push("/admin")
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

  function dontApprove(){
    MySwal.fire({
      title: 'Tem Certeza?',
      text: "Após reprovada, a promoção não estará mais disponivel!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#42B983',
      cancelButtonColor: '#C6EAD9',
      confirmButtonText: 'Tenho certeza',
      cancelButtonText: "Cancelar"
    }).then((result)=>{
      if(result.isConfirmed){
        PromotionService.deletePromotion(params.id).then((response) => {
          if(response.status === 200){
            MySwal.fire({
              icon: 'success',
              title: 'Não Aprovada',
              text: 'A promoção foi reprovada com sucesso!',
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true
            }).then(()=>{
              history.push("/admin")
            })
          }
        }, () => {
          MySwal.fire({
            icon: 'error',
            title: 'Ocorreu um erro',
            text: 'Tente novamente mais tarde',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true
          })
        })
      }
    })
  }

  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
    <section className={"page"} >
      <Back/>
        <div className={"intro"}>
          <img src={approve} alt="promotion-approve" />
      </div>
      {loading ? <div className={"myDiv"} style={loadingStyle} >
        <Loading/>
      </div> : <div className={"myDiv"}>
          <h1>Sala de Aprovação</h1>
          <Form ref={formRef} onSubmit={handleSubmit} className={"myForm"}>
            <label htmlFor="name">Nome</label>
            <input value={promotion.name} name="name" disabled type="text"/>
            <label htmlFor="description">Descrição</label>
            <textarea value={promotion.description} disabled type="text" cols="30" rows="10"></textarea>
            <label htmlFor="price">Preço</label>
            <input value={promotion.price} type="number" disabled/>
            <label htmlFor="link">Link</label>
            <input value={promotion.urlLink} type="text" disabled />
            <label htmlFor="cupom">Cupom</label>
            <input value={promotion.voucher !== "" ? promotion.voucher : "Sem cupom"} type="text" disabled />
            <Input label="Vendido por" type="text" name="soldBy" placeholder="Exemplo: Magalu"/>
            <Input label="Foto do Item" type="text" name="photo" placeholder="Copie o link da imagem e cole aqui"/>
            <div className={styles.myButtons}>
              <button className={"btn"} type="submit">Aprovar</button>
              <button onClick={dontApprove} className={"btn"}>Não Aprovar</button>
            </div>
          </Form>
      </div>} 
      {useToast ? <Notification/> : null}
</section>
</Animated>
  )
}

export default AdminApproval
