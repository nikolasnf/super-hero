import { axiosPublic, axiosProtected } from '../../config';

export const getAllPlans = params => axiosPublic.get('/plans', { params });

export const getPlan = id => axiosProtected.get(`/plans/${id}`);

export const savePlan = params => axiosProtected.post('/plans', params);

export const editPlan = (id, params) =>
  axiosProtected.put(`/plans/${id}`, params);

export const disablePlan = id => axiosProtected.delete(`/plans/${id}`);

export const activatePlan = id => axiosProtected.post(`/plans/${id}`);
