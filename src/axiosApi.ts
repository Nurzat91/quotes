import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://sun-js-20-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;