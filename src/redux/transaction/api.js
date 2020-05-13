import { axiosPublic, axiosProtected } from '../../config';

export const getUserTransactions = params =>
  axiosProtected.get('/transactions/users', { params });

export const getAgencyTransactions = params =>
  axiosProtected.get('/transactions/agencies', { params });

export const getAgentTransactions = params =>
  axiosProtected.get('/transactions/agents', { params });
