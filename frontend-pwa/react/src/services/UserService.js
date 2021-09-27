import axiosInstance from './AxiosInstance';

class UserService{

  createUser(user){
    return axiosInstance.post('/users', user)
  }

  getUserById(id){
    return axiosInstance.get('/users/' + id)
  }

}

export default new UserService();