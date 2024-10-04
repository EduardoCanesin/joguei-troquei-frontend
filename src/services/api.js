import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-url.com', //exemplo de url da api
});

export default api;
