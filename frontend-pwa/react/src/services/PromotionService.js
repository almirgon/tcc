import axiosInstance from './AxiosInstance';
import authHeader from '../helpers/authHeader'

class PromotionService{

  createPromotion(promotion){
    return axiosInstance.post('/promotion', promotion, { headers: authHeader() })
  }

  getPromotionById(id){
    return axiosInstance.get('/promotion/' + id)
  }

  putPromotion(id, promotion){
    return axiosInstance.put('/promotion/' + id, promotion, { headers: authHeader() })
  }

  deletePromotion(id){
    return axiosInstance.delete('/promotion/' + id, { headers: authHeader() })
  }

  like(id){
    return axiosInstance.post('/promotion/like/' + id, { headers: authHeader() })
  }

  getActivesPromotions(){
    return axiosInstance.get('/promotion/actives')
  }

  getPendingsPromotions(){
    return axiosInstance.get('/promotion/pendings', { headers: authHeader() })
  }

}

export default new PromotionService()