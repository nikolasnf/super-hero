import { axiosPublic, axiosProtected } from '../../config';

{
  /* Agencies */
}
export const createAgencySubscription = params =>
  axiosProtected.post('/agency_subscriptions', params);

export const getAgencySubscriptions = params =>
  axiosProtected.get('/agency_subscriptions', { params });

export const getAgencySubscription = id =>
  axiosProtected.get(`/agency_subscriptions/${id}`);

export const updateAgency = (id, params) =>
  axiosProtected.put(`/agency_subscriptions/${id}`, { ...params });

export const disableAgencySubscription = agencyId =>
  axiosProtected.delete(`/agency_subscriptions/${agencyId}`);

export const activateAgencySubscription = agencyId =>
  axiosProtected.post(`/agency_subscriptions/${agencyId}`);

export const assignAgencySubscription = params =>
  axiosProtected.post('/agency_subscriptions/assign/', params);

export const createAgentSubscription = params =>
  axiosProtected.post('/agent_subscriptions', params);

export const getAgentsSubscription = params =>
  axiosProtected.get('/agent_subscriptions', { params });

export const activateAgentSubscription = id =>
  axiosProtected.post(`/agent_subscriptions/${id}`);

export const disableSubsAgent = id =>
  axiosProtected.delete(`/agent_subscriptions/${id}`);

export const getAgentSubscription = id =>
  axiosProtected.get(`/agent_subscriptions/${id}`);

export const putAgentSubscriptionReq = params =>
  axiosProtected.put(`/agent_subscriptions/${params.id}`, params);

export const getActualSubscription = params =>
  axiosProtected.get('/subscription', { params });
