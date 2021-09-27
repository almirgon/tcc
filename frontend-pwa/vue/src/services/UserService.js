import authHeader from '../helpers/authHeader';
import axiosInstance from './AxiosInstance';

class UserService{

  createUser(user){
    return axiosInstance.post('/users', user)
  }

  getUserByEmail(email) {
    return axiosInstance.get('/users/' + email, { headers: authHeader() });
  }

  getUserById(id){
    return axiosInstance.get('/users/' + id)
  }

}

export default new UserService();