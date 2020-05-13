import {
  AGENT_FETCH_LIST,
  AGENT_FETCH_LIST_SUCCESS,
  AGENT_FETCH_LIST_ERROR,
  AGENT_SAVE,
  AGENT_SAVE_SUCCESS,
  AGENT_SAVE_ERROR,
  AGENT_RESET_ID,
  AGENT_FETCH_ID,
  AGENT_FETCH_ID_SUCCESS,
  AGENT_FETCH_ID_ERROR,
  AGENT_ACCEPT,
  AGENT_REFUSE,
  AGENT_BLOCK,
  AGENT_APPROVAL_SUCCESS,
  AGENT_APPROVAL_ERROR,
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
  AGENT_ASSIGN_AGENCY,
  AGENT_ASSIGN_AGENCY_SUCCESS,
  AGENT_ASSIGN_AGENCY_ERROR,
  AGENT_UNASSIGN_AGENCY,
  AGENT_UNASSIGN_AGENCY_SUCCESS,
  AGENT_UNASSIGN_AGENCY_ERROR,
  AGENT_FETCH_ASSIGNED_AGENCIES,
  AGENT_FETCH_ASSIGNED_AGENCIES_SUCCESS,
  AGENT_FETCH_ASSIGNED_AGENTS_ERROR,
} from '../actions';

export const resetAgentId = () => ({
  type: AGENT_RESET_ID,
});

export const fetchAgentId = id => ({
  type: AGENT_FETCH_ID,
  payload: { id },
});

export const approvalAgent = payload => ({
  type: AGENT_ACCEPT,
  payload,
});

export const blockAgent = id => ({
  type: AGENT_BLOCK,
  payload: { id },
});

export const agentApprovalSuccess = () => ({
  type: AGENT_APPROVAL_SUCCESS,
});

export const agentApprovalError = error => ({
  type: AGENT_APPROVAL_ERROR,
  payload: error,
});

export const fetchAgentIdSuccess = data => ({
  type: AGENT_FETCH_ID_SUCCESS,
  payload: data,
});

export const fetchAgentIdError = error => ({
  type: AGENT_FETCH_ID_ERROR,
  payload: { error },
});

export const fetchAgents = filters => ({
  type: AGENT_FETCH_LIST,
  payload: { filters },
});

export const fetchAgentsSuccess = data => ({
  type: AGENT_FETCH_LIST_SUCCESS,
  payload: data,
});

export const fetchAgentsError = error => ({
  type: AGENT_FETCH_LIST_ERROR,
  payload: { error },
});

export const saveAgent = (params, profileFile, creciFile) => ({
  type: AGENT_SAVE,
  payload: { params, profileFile, creciFile },
});

export const saveAgentSuccess = data => ({
  type: AGENT_SAVE_SUCCESS,
  payload: { data },
});

export const saveAgentError = error => ({
  type: AGENT_SAVE_ERROR,
  payload: { error },
});

export const saveAgentSubscription = params => ({
  type: AGENT_SUBSCRIPTION_SAVE,
  payload: { params },
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

export const putAgentSubscription = params => ({
  type: AGENT_SUBSCRIPTION_PUT,
  payload: { params },
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

export const assignAgency = (agentId, agencyId) => ({
  type: AGENT_ASSIGN_AGENCY,
  payload: { agencyId, agentId },
});

export const AssignAgencySuccess = data => ({
  type: AGENT_ASSIGN_AGENCY_SUCCESS,
  payload: data,
});

export const AssignAgencyError = error => ({
  type: AGENT_ASSIGN_AGENCY_ERROR,
  payload: { error },
});

export const unassignAgency = (agencyId, agentId, history) => ({
  type: AGENT_UNASSIGN_AGENCY,
  payload: { agencyId, agentId, history },
});

export const unassignAgencySuccess = data => ({
  type: AGENT_UNASSIGN_AGENCY_SUCCESS,
  payload: data,
});

export const unassignAgencyError = error => ({
  type: AGENT_UNASSIGN_AGENCY_ERROR,
  payload: { error },
});

export const fetchAssignedAgencies = (id, filters) => ({
  type: AGENT_FETCH_ASSIGNED_AGENCIES,
  payload: { id, filters },
});

export const fetchAssignedAgenciesSuccess = data => ({
  type: AGENT_FETCH_ASSIGNED_AGENCIES_SUCCESS,
  payload: data,
});

export const fetchAssignedAgenciesError = error => ({
  type: AGENT_FETCH_ASSIGNED_AGENTS_ERROR,
  payload: { error },
});
