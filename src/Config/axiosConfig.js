import axios from 'axios';

const axiosInstance = axios.create({
  /*baseURL: 'http://localhost:8080/api', */
  baseURL: 'https://cleanback.fly.dev/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    axiosInstance.interceptors.request.use((config) => {
      console.log("Requête axios configurée :", config);
      return config;
    });
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
