import { axiosPublic, axiosProtected } from '../../config';

export const createUser = params => axiosPublic.post('/users', params);
export const getUsers = params =>
  axiosProtected.get('/advertisers', { params });
export const getUser = id => axiosProtected.get(`/users/${id}`);

export const getAds = params =>
  axiosProtected.get('/announcements', { params });

export const getAd = id => axiosProtected.get(`/announcements/${id}`);
export const deleteAds = userId =>
  axiosProtected.delete(`/announcements/${userId}`);
export const activateAds = userId =>
  axiosProtected.post(`/announcements/${userId}`);

export const disableUser = id => axiosProtected.delete(`/users/${id}`);
export const activateUser = id => axiosProtected.post(`/users/${id}`);
