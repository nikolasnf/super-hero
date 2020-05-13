import { axiosPublic, axiosProtected } from '../../config';

export const createAgency = params => axiosProtected.post('/users', params);

export const createAgencyNoAuth = params => axiosPublic.post('/users', params);

export const uploadProfileImage = (params, config) =>
  axiosPublic.post('/users/photo/upload', params, config);

export const assignAgentAdmin = (id, params) =>
  axiosProtected.post(`/agencies/requests/${id}`, params);

export const unassignAgentAdmin = (id, params) =>
  axiosProtected.post(`/agencies/unassign/${id}`, params);

export const getAssignedAgentsAdmin = (id, params) =>
  axiosProtected.get(`agencies/agents/${id}`, { params });

export const getAssignedAgents = params =>
  axiosProtected.get('/agencies/agents', params);

export const getAgency = id => axiosProtected.get(`/users/${id}`);

export const getAgencies = params =>
  axiosProtected.get('/agencies', { params });

export const approvalAgency = (id, params) =>
  axiosProtected.put(`/agencies/${id}/approval`, params);

export const getAds = params =>
  axiosProtected.get('/announcements', { params });

export const getAd = id => axiosProtected.get(`/announcements/${id}`);
export const deleteAds = userId =>
  axiosProtected.delete(`/announcements/${userId}`);

export const activateAds = userId =>
  axiosProtected.post(`/announcements/${userId}`);

export const getMe = () => axiosProtected.get(`/me`);

export const editPerfil = params => axiosProtected.put(`/users`, params);

export const editProfileImage = params =>
  axiosProtected.post('/users/photo/upload', params);
