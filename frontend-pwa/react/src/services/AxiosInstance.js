import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://promotionapi.herokuapp.com/api',
})

export default axiosInstance;