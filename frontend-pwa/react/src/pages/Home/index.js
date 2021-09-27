import {useState, useEffect} from 'react'
import './home.css'
import Avatar from 'react-avatar';
import { useHistory } from 'react-router-dom'
import PromotionService from '../../services/PromotionService';
import Loading from '../../components/Loading';
import toCurrency from '../../filters/toCurrency'
import dateAgo from '../../filters/dateAgo'
import Like from '../../components/Like';
import {Animated} from "react-animated-css";

const Home = () => {

  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [noPromotions, setNoPromotions] = useState(false)
  const [promotions, setPromotions] = useState([])

  useEffect(() => {
    setLoading(true)
    PromotionService.getActivesPromotions().then((response) => {
      if(response.status === 200){
        setLoading(false)
        if(response.data.length === 0){
          setNoPromotions(true)
        }
        response.data.forEach((data)=>{
          setPromotions(promotions => promotions.concat(data));
        })
      }
    })
  }
  , [])

  function goToWebSite(urlLink){
    return window.open(urlLink, '_blank') 
  }

  function goToPromotion(id){
    history.push(`/promotion/${id}`)
  }


  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <section className="home">
      {loading ? <div className="list">
        <Loading/>
    </div> : <div className="list">
    {promotions.map((promotion,index) => (
      <div key={index} className="myPromotion">
      <div onClick={() => goToPromotion(promotion.id)} className="cardInfo">
        <div className='like'>
          <Like likes={promotion.numberLikes}></Like>
        </div>
        <div className="myInfo">
              <h3 onClick={() => goToPromotion(promotion.id)}> {promotion.name}</h3>
              <div className="myLocal">
                  <p>Vendido por {promotion.soldBy}</p>
                  <button onClick={() => {goToWebSite(promotion.urlLink)}} className="myLink">Link</button>
              </div>
        </div>
      <div className="promotionImg">
          <img src={promotion.photo} alt="card-img"/>
      </div>
      <div className="myPrice">
          <p>{toCurrency(promotion.price)}</p>
      </div>
        
      </div>
      <div className="dock">
          <div className="person">
            <Avatar color="#beebf7" name={promotion.user.firstName} size="35" round={true} />
              <div className="data">
                <p>Enviado por {promotion.user.firstName}</p>
                <p>{dateAgo(promotion.date)}</p>
              </div>
          </div>
        </div>
    </div>
    ))}
    </div>}

    {noPromotions && !loading ? <div className="list">
    <div className="noPromotion">
      <h1>Sem Promoções publicadas :(</h1>
    </div>
  </div> : null }
    
  </section>
    </Animated>

  )
}
export default Home