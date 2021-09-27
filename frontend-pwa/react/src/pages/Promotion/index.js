import {useState, useEffect} from 'react'
import './promotion.css'
import Back from '../../components/Back'
import Avatar from 'react-avatar';
import PromotionService from '../../services/PromotionService';
import Loading from '../../components/Loading';
import { useParams } from 'react-router-dom'
import Like from '../../components/Like';
import toCurrency from '../../filters/toCurrency'
import dateAgo from '../../filters/dateAgo'
import {Animated} from "react-animated-css";


const Promotion = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false)
  const [promotion, setPromotion] = useState("")
  let loadingStyle = {
    background: 'none'
  }

  useEffect(() => {
    setLoading(true)
    PromotionService.getPromotionById(params.id).then((response) => {
      if(response.status === 200){
        setPromotion(response.data)
        setLoading(false)
      }
    })
  }, [params.id])

  function goToWebSite(urlLink){
    return window.open(urlLink, '_blank') 
  }

  function likePromotion(){
    PromotionService.like(params.id).then((response) => {
      if(response.status === 200){
        setPromotion(response.data)
      }
    })
  }

  return (
  <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
  <section className="promotionSection">
      {loading ? <div style={loadingStyle} className={"myDiv"} >
        <Loading/>
      </div> :
  <div className="promotion">
    <Back/>
    <div className="myLike">
      <Like onClick={likePromotion} likes={promotion.numberLikes}></Like >
    </div>
    <div className="promotionImg">
      <img src={promotion.photo} alt="promotion"/>
    </div>
    <div className="promotionPrice">
      <p>{toCurrency(promotion.price)}</p>
  </div>
  <div className="promotionInfo">
    <h3>{promotion.name}</h3>
    <div className="promotionLocal">
        <p>Vendido por {promotion.soldBy}</p>
    </div>
    <div className="description">
      <p>{promotion.description}</p>
    </div>
  </div>
  <div className="promotionBtns">
    {promotion.voucher === "" ? <p className="myCupom">Sem Cupom</p> : <p className="myCupom">Cupom: {promotion.voucher} </p>}
   
    <button className={"btn"} onClick={() => {goToWebSite(promotion.urlLink)}}>Acessar</button>
  </div>
  
  <div className="promotionPerson">
  <Avatar color="#beebf7" name={promotion.user?.firstName} size="35" round={true} />
    <div className="dataPerson">
        <p>Postado por {promotion.user?.firstName}</p>
        <p>{dateAgo(promotion.date)}</p>
    </div>
  </div>
  </div>}

</section>
</Animated>

  )
}

export default Promotion
