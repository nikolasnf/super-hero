import { axiosPublic, axiosProtected } from '../../config';

export const getAgents = params =>
  axiosProtected.get('/agencies/agents', { params });

export const aproveAssign = params =>
  axiosProtected.post('/agencies/assign', params);

export const unassignAgent = id =>
  axiosProtected.post('/agencies/unassign', id);

export const requestAgent = params =>
  axiosProtected.post('/agencies/requests', params);
