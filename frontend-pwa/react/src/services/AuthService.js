import axiosInstance from './AxiosInstance';

class AuthService{

  async login(user) {
    const response = await axiosInstance.post('/login', user);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('userID', JSON.stringify(response.data.userDTO.id));
      localStorage.setItem('name', JSON.stringify(response.data.userDTO.firstName));
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('role', JSON.stringify(response.data.userDTO.role));
    }
    return response;
  }

  logout() {
    localStorage.removeItem('userID');
    localStorage.removeItem('user')
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('role');

  }

  
}

export default new AuthService()