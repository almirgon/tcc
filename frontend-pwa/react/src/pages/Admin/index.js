import {useState, useEffect} from 'react'
import './admin.css'
import PromotionService from '../../services/PromotionService'
import Loading from '../../components/Loading'
import toCurrency from '../../filters/toCurrency'
import dateAgo from '../../filters/dateAgo'
import {useHistory} from 'react-router-dom';
import {Animated} from "react-animated-css";


const Admin = () => {
  const [loading, setLoading] = useState(false)
  const [promotions, setPromotions] = useState([])
  const [noPromotions, setNoPromotions] = useState(false)
  const history = useHistory()

  useEffect(() => {
    setLoading(true)
    PromotionService.getPendingsPromotions().then((response) => {
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
    history.push(`/admin-approval/${id}`)
  }

  return (
  <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
  <section className="homeAdmin">
    
  {loading ? <div className="list">
    <Loading/>
  </div> : <div className="listAdmin">
  {promotions.map((promotion,index) => (
            <div key={index} className="boardAdmin">
            <div className="cardInfoAdmin" onClick={() => goToPromotion(promotion.id)}>
            <div className="myPriceAdmin">
                <p>{toCurrency(promotion.price)}</p>
            </div>
              <div className="infoBoardAdmin">
                    <h3>{promotion.name}</h3>
                    <div className="personAdmin">
                      <div className="dataAdmin">
                          <p>Enviado por {promotion.user.firstName}</p>
                          <p>{dateAgo(promotion.date)}</p>
                      </div>
                  </div>
              </div>
            </div>
            <div className="dockAdmin">
              <div className="myLocalAdmin">
                <button onClick={() => {goToWebSite(promotion.urlLink)}} className={"btn"}>Verificar Promoção</button>
            </div>
              </div>
          </div>
        ))}
  </div>}

  {noPromotions && !loading ? <div className="list">
    <div className="noPromotion">
      <h1>Sem Promoções Pendentes</h1>
    </div>
  </div> : null }
  
</section>
</Animated>
  )
}

export default Admin
