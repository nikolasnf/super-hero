import axios from 'axios';
import { axiosProtected } from '../../config';

export const getDashboardData = params =>
  axiosProtected.get('/dashboard', { params });

export const getImobDashboardAgent = params =>
  axiosProtected.get('/agencies/agents?status=assigned', { params });
