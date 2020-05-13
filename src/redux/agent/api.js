import { axiosPublic, axiosProtected } from '../../config';

export const createAgent = params => axiosProtected.post('/users', params);

export const getAgents = params => axiosProtected.get('/agents', { params });

export const uploadProfileImage = (params, config) =>
  axiosPublic.post('/users/photo/upload', params, config);

export const uploadCreciImage = (params, config) =>
  axiosPublic.post('/users/creci/upload', params, config);

export const getAgent = id => axiosProtected.get(`/users/${id}`);

export const approvalAgent = (id, params) =>
  axiosProtected.put(`/agents/${id}/approval`, params);

export const assignAgencyAdmin = (id, params) =>
  axiosProtected.post(`/agents/requests/${id}`, params);

export const unassignAgencyAdmin = (id, params) =>
  axiosProtected.post(`/agents/unassign/${id}`, params);

export const getAssignedAgenciesAdmin = (id, params) =>
  axiosProtected.get(`agents/agencies/${id}`, { params });

export const getAssignedAgencies = params =>
  axiosProtected.get('/agents/agencies', params);
