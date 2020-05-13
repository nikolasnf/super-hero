import { axiosPublic, axiosProtected } from '../../config';

export const getIssues = params => axiosProtected.get('/reports', { params });

export const getIssue = id => axiosProtected.get(`/reports/${id}`);

export const readIssueReq = id => axiosProtected.post('/reports/read', id);
