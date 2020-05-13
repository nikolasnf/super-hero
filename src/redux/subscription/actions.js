import {
  AGENCY_SUBSCRIPTION_FETCH_LIST,
  AGENCY_SUBSCRIPTION_FETCH_LIST_SUCCESS,
  AGENCY_SUBSCRIPTION_FETCH_LIST_ERROR,
  AGENCY_SUBSCRIPTION_SAVE,
  AGENCY_SUBSCRIPTION_SAVE_SUCCESS,
  AGENCY_SUBSCRIPTION_SAVE_ERROR,
  AGENCY_SUBSCRIPTION_EDIT,
  AGENCY_SUBSCRIPTION_EDIT_SUCCESS,
  AGENCY_SUBSCRIPTION_EDIT_ERROR,
  AGENCY_SUBSCRIPTION_RESET_ID,
  AGENCY_SUBSCRIPTION_FETCH_ID,
  AGENCY_SUBSCRIPTION_FETCH_ID_SUCCESS,
  AGENCY_SUBSCRIPTION_FETCH_ID_ERROR,
  AGENCY_SUBSCRIPTION_DISABLE,
  AGENCY_SUBSCRIPTION_ENABLE,
  AGENCY_SUBSCRIPTION_ABLE_SUCCESS,
  AGENCY_SUBSCRIPTION_ABLE_RESET,
  AGENT_SUBSCRIPTION_SAVE,
  AGENT_SUBSCRIPTION_SAVE_SUCCESS,
  AGENT_SUBSCRIPTION_SAVE_ERROR,
  AGENT_SUBSCRIPTION_SAVE_RESET,
  AGENT_FETCH_SUBSCRIPTION,
  AGENT_FETCH_SUBSCRIPTION_SUCCESS,
  AGENT_SUBSCRIPTION_ENABLE,
  AGENT_SUBSCRIPTION_ABLE_RESET,
  AGENT_SUBSCRIPTION_ABLE_SUCCESS,
  AGENT_SUBSCRIPTION_DISABLE,
  AGENT_SUBSCRIPTION_FETCH_ID,
  AGENT_SUBSCRIPTION_FETCH_ID_SUCCESS,
  AGENT_SUBSCRIPTION_PUT,
  AGENT_SUBSCRIPTION_PUT_SUCCESS,
  AGENT_SUBSCRIPTION_PUT_RESET,
  AGENCY_SUBSCRIPTION_EDIT_RESET,
  AGENCY_SUBSCRIPTION_ASSIGN,
  AGENCY_SUBSCRIPTION_ASSIGN_SUCCESS,
  AGENCY_SUBSCRIPTION_ASSIGN_ERROR,
  ACTUAL_SUBSCRIPTION,
  ACTUAL_SUBSCRIPTION_ERROR,
  ACTUAL_SUBSCRIPTION_SUCCESS,
} from '../actions';

export const fetchActualSubscription = filters => ({
  type: ACTUAL_SUBSCRIPTION,
  payload: { filters },
});

export const fetchActualSubscriptionSuccess = data => ({
  type: ACTUAL_SUBSCRIPTION_SUCCESS,
  payload: data,
});

export const fetchActualSubscriptionError = error => ({
  type: ACTUAL_SUBSCRIPTION_ERROR,
  payload: { error },
});

/* Agencies */

export const resetAgencySubscriptionId = () => ({
  type: AGENCY_SUBSCRIPTION_RESET_ID,
});

export const fetchAgencySubscriptionId = id => ({
  type: AGENCY_SUBSCRIPTION_FETCH_ID,
  payload: { id },
});

export const fetchAgencySubscriptionIdSuccess = data => ({
  type: AGENCY_SUBSCRIPTION_FETCH_ID_SUCCESS,
  payload: data,
});

export const fetchAgencySubscriptionIdError = error => ({
  type: AGENCY_SUBSCRIPTION_FETCH_ID_ERROR,
  payload: { error },
});

export const fetchAgenciesSubscription = filters => ({
  type: AGENCY_SUBSCRIPTION_FETCH_LIST,
  payload: { filters },
});

export const fetchAgenciesSubscriptionSuccess = data => ({
  type: AGENCY_SUBSCRIPTION_FETCH_LIST_SUCCESS,
  payload: data,
});

export const fetchAgenciesSubscriptionError = error => ({
  type: AGENCY_SUBSCRIPTION_FETCH_LIST_ERROR,
  payload: { error },
});

export const saveAgencySubscription = (params, history) => ({
  type: AGENCY_SUBSCRIPTION_SAVE,
  payload: { params, history },
});

export const saveAgencySubscriptionSuccess = data => ({
  type: AGENCY_SUBSCRIPTION_SAVE_SUCCESS,
  payload: { data },
});

export const saveAgencySubscriptionError = error => ({
  type: AGENCY_SUBSCRIPTION_SAVE_ERROR,
  payload: { error },
});

export const editAgencySubscription = (params, history) => {
  console.log('chegou na action');
  return {
    type: AGENCY_SUBSCRIPTION_EDIT,
    payload: { params, history },
  };
};

export const editAgencySubscriptionSuccess = data => ({
  type: AGENCY_SUBSCRIPTION_EDIT_SUCCESS,
  payload: { data },
});

export const editAgencySubscriptionReset = () => ({
  type: AGENCY_SUBSCRIPTION_EDIT_RESET,
});

export const editAgencySubscriptionError = error => ({
  type: AGENCY_SUBSCRIPTION_EDIT_ERROR,
  payload: { error },
});

export const disableAgenciesSubscription = (id, page) => ({
  type: AGENCY_SUBSCRIPTION_DISABLE,
  payload: { id, page },
});

export const enableAgenciesSubscription = (id, page) => ({
  type: AGENCY_SUBSCRIPTION_ENABLE,
  payload: { id, page },
});

export const ableAgenciesSubscriptionSuccess = () => ({
  type: AGENCY_SUBSCRIPTION_ABLE_SUCCESS,
});

export const ableAgenciesSubscriptionReset = () => ({
  type: AGENCY_SUBSCRIPTION_ABLE_RESET,
});

export const assignAgencySubscription = params => ({
  type: AGENCY_SUBSCRIPTION_ASSIGN,
  payload: { params },
});

export const assignAgencySubscriptionSuccess = data => ({
  type: AGENCY_SUBSCRIPTION_ASSIGN_SUCCESS,
  payload: { data },
});

export const assignAgencySubscriptionError = error => ({
  type: AGENCY_SUBSCRIPTION_ASSIGN_ERROR,
  payload: { error },
});

// AGENT
export const saveAgentSubscription = (params, history) => ({
  type: AGENT_SUBSCRIPTION_SAVE,
  payload: { params, history },
});

export const saveAgentSubscriptionSuccess = data => ({
  type: AGENT_SUBSCRIPTION_SAVE_SUCCESS,
  payload: { data },
});

export const saveAgentSubscriptionError = error => ({
  type: AGENT_SUBSCRIPTION_SAVE_ERROR,
  payload: { error },
});

export const saveAgentSubscriptionReset = () => ({
  type: AGENT_SUBSCRIPTION_SAVE_RESET,
});

export const fetchAgentsSubscription = filters => ({
  type: AGENT_FETCH_SUBSCRIPTION,
  payload: { filters },
});

export const fetchAgentsSubscriptionSuccess = data => ({
  type: AGENT_FETCH_SUBSCRIPTION_SUCCESS,
  payload: data,
});

export const enableSubscriptionAgent = (id, page) => ({
  type: AGENT_SUBSCRIPTION_ENABLE,
  payload: { id, page },
});

export const ableSubscriptionAgentSuccess = () => ({
  type: AGENT_SUBSCRIPTION_ABLE_SUCCESS,
});

export const ableSubscriptionAgentReset = () => ({
  type: AGENT_SUBSCRIPTION_ABLE_RESET,
});

export const disableSubscriptionAgent = (id, page) => ({
  type: AGENT_SUBSCRIPTION_DISABLE,
  payload: { id, page },
});

export const fetchAgentSubscriptionId = id => ({
  type: AGENT_SUBSCRIPTION_FETCH_ID,
  payload: { id },
});

export const fetchAgentSubscriptionIdSuccess = data => ({
  type: AGENT_SUBSCRIPTION_FETCH_ID_SUCCESS,
  payload: data,
});

export const putAgentSubscription = (params, history) => ({
  type: AGENT_SUBSCRIPTION_PUT,
  payload: { params, history },
});

export const putAgentSubscriptionSuccess = data => ({
  type: AGENT_SUBSCRIPTION_PUT_SUCCESS,
  payload: { data },
});

export const putAgentSubscriptionReset = () => ({
  type: AGENT_SUBSCRIPTION_PUT_RESET,
});

export const putAgentSubscriptionError = error => ({
  type: AGENT_SUBSCRIPTION_SAVE_ERROR,
  payload: { error },
});
