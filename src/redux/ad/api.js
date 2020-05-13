import axios from 'axios';
import { axiosPublic, axiosProtected } from '../../config';

export const createAd = params => axiosProtected.post('/announcements', params);

export const getConstants = params => axiosProtected.get('/constants', params);

export const getCep = cep => axios.get(`https://viacep.com.br/ws/${cep}/json/`);

export const getAds = params =>
  axiosProtected.get('/announcements', { params });

export const getAdId = id => axiosProtected.get(`/announcements/${id}`);

export const getAd = id => axiosProtected.get(`/announcements/${id}`);

export const getUserAd = id => axiosProtected.get(`/announcements/user/${id}`);

export const deleteAds = userId =>
  axiosProtected.delete(`/announcements/${userId}`);

export const activateAds = userId =>
  axiosProtected.post(`/announcements/${userId}`);

export const soldAdRequest = ({ id, ...params }) =>
  axiosProtected.post(`/announcements/${id}/sold`, params);

export const editAdRequest = ({ id, ...params }) =>
  axiosProtected.put(`/announcements/${id}`, params);

export const acceptAdRequest = id =>
  axiosProtected.post(`/agencies/ad-requests/${id}`);

export const removeAdRequest = id =>
  axiosProtected.delete(`/agencies/ad-requests/${id}`);

export const getAdRequest = params =>
  axiosProtected.get(`/agencies/ad-requests/`, { params });

export const getAdRequestId = id =>
  axiosProtected.get(`/agencies/ad-requests/${id}`);

export const acceptAdSoldRequest = id =>
  axiosProtected.post(`/agencies/ad-requests/${id}/sold`);

export const removeAdSoldRequest = id =>
  axiosProtected.delete(`/agencies/ad-requests/${id}/sold`);
