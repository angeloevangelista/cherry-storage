import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cherry-storage-api.herokuapp.com',
});

export default api;
