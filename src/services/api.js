import axios from 'axios';
import Cookies from 'universal-cookie';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
})

api.interceptors.request.use(async (config) => {
  try{
    const cookies = new Cookies();
    const token = await cookies.get('token');
    
    config.headers.Authorization = `Bearer ${token}`

    return config;
  }catch(err){
  }
})
export default api;