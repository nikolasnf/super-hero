import axios from 'axios';

const axiosProtected = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

const axiosPublic = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

axiosProtected.interceptors.request.use(async config => {
  const token = window.sessionStorage.getItem('@access_token');

  config.headers.Authorization = `Bearer ${token}`;
  config.headers['Accept-Language'] = 'pt';

  return config;
});

axiosPublic.interceptors.request.use(async config => {
  config.headers['Accept-Language'] = 'pt';
  return config;
});

export { axiosProtected, axiosPublic };
