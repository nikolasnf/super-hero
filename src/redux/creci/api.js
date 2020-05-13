import axios from 'axios';
import { axiosPublic, axiosProtected } from '../../config';

export const getCreciRequests = params =>
  axiosProtected.get('/agents/creci-request', { params });

export const getCreciRequest = (id, params) =>
  axiosProtected.get(`/agents/creci-request/${id}`, params);

export const approveCreciRequest = id =>
  axiosProtected.post(`/agents/creci-request/${id}`);

export const reproveCreciRequest = id =>
  axiosProtected.delete(`/agents/creci-request/${id}`);
