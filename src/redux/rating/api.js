import { axiosProtected } from '../../config';

export const getReviews = params => axiosProtected.get('/reviews', { params });

export const getReview = id => axiosProtected.get(`/reviews/${id}`);

export const readReview = id => axiosProtected.post('/reviews/read', id);
