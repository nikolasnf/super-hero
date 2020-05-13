import { axiosPublic } from '../../config';

export const login = params => axiosPublic.post('/login', params);

export const forgotPasswordReq = params =>
  axiosPublic.post('/passwords', params);

export const checkTokenReq = params =>
  axiosPublic.post('/passwords/verify', params);
