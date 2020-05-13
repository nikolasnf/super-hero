import {
  AGENCY_FETCH_LIST,
  AGENCY_FETCH_LIST_SUCCESS,
  AGENCY_FETCH_LIST_ERROR,
  AGENCY_SAVE,
  AGENCY_SAVE_SUCCESS,
  AGENCY_SAVE_ERROR,
  AGENCY_RESET_ID,
  AGENCY_FETCH_ID,
  AGENCY_FETCH_ID_SUCCESS,
  AGENCY_FETCH_ID_ERROR,
  AGENCY_ACCEPT,
  AGENCY_REFUSE,
  AGENCY_BLOCK,
  AGENCY_APPROVAL_SUCCESS,
  AGENCY_APPROVAL_ERROR,
  AGENCY_FETCH_AD_LIST,
  AGENCY_FETCH_AD_LIST_SUCCESS,
  AGENCY_FETCH_AD_LIST_ERROR,
  AGENCY_FETCH_AD_ID,
  AGENCY_FETCH_AD_ID_SUCCESS,
  AGENCY_FETCH_AD_ID_ERROR,
  AGENCY_DISABLE_AD,
  AGENCY_ENABLE_AD,
  AGENCY_ASSIGN_AGENT,
  AGENCY_ASSIGN_AGENT_SUCCESS,
  AGENCY_ASSIGN_AGENT_ERROR,
  AGENCY_FETCH_ASSIGNED_AGENTS,
  AGENCY_FETCH_ASSIGNED_AGENTS_SUCCESS,
  AGENCY_FETCH_ASSIGNED_AGENTS_ERROR,
  AGENCY_GET_PROFILE,
  AGENCY_GET_PROFILE_SUCCESS,
  AGENCY_GET_PROFILE_ERROR,
  AGENCY_EDIT_PROFILE,
  AGENCY_EDIT_PROFILE_SUCCESS,
  AGENCY_EDIT_PROFILE_ERROR,
  AGENCY_UNASSIGN_AGENT,
  AGENCY_UNASSIGN_AGENT_SUCCESS,
  AGENCY_UNASSIGN_AGENT_ERROR,
  AGENCY_CLOSE_MODAL,
} from '../actions';

export const resetAgencyId = () => ({
  type: AGENCY_RESET_ID,
});

export const fetchAgencyId = id => ({
  type: AGENCY_FETCH_ID,
  payload: { id },
});

export const approvalAgency = payload => ({
  type: AGENCY_ACCEPT,
  payload,
});

export const blockAgency = id => ({
  type: AGENCY_BLOCK,
  payload: { id },
});

export const agencyApprovalSuccess = () => ({
  type: AGENCY_APPROVAL_SUCCESS,
});

export const agencyApprovalError = error => ({
  type: AGENCY_APPROVAL_ERROR,
  payload: error,
});

export const fetchAgencyIdSuccess = data => ({
  type: AGENCY_FETCH_ID_SUCCESS,
  payload: data,
});

export const fetchAgencyIdError = error => ({
  type: AGENCY_FETCH_ID_ERROR,
  payload: { error },
});

export const fetchAgencies = filters => ({
  type: AGENCY_FETCH_LIST,
  payload: { filters },
});

export const fetchAgenciesSuccess = data => ({
  type: AGENCY_FETCH_LIST_SUCCESS,
  payload: data,
});

export const fetchAgenciesError = error => ({
  type: AGENCY_FETCH_LIST_ERROR,
  payload: { error },
});

export const fetchAdAgencies = filters => ({
  type: AGENCY_FETCH_AD_LIST,
  payload: { filters },
});

export const fetchAdAgenciesSuccess = data => ({
  type: AGENCY_FETCH_AD_LIST_SUCCESS,
  payload: data,
});

export const fetchAdAgenciesError = error => ({
  type: AGENCY_FETCH_AD_LIST_ERROR,
  payload: { error },
});

export const fetchAdAgencyId = id => ({
  type: AGENCY_FETCH_AD_ID,
  payload: { id },
});

export const fetchAdAgencyIdSuccess = data => ({
  type: AGENCY_FETCH_AD_ID_SUCCESS,
  payload: data,
});

export const fetchAdAgencyIdError = error => ({
  type: AGENCY_FETCH_AD_ID_ERROR,
  payload: { error },
});

export const saveAgency = (params, file, noAuthorization) => ({
  type: AGENCY_SAVE,
  payload: { params, file, noAuthorization },
});

export const saveAgencySuccess = data => ({
  type: AGENCY_SAVE_SUCCESS,
  payload: { data },
});

export const saveAgencyError = error => ({
  type: AGENCY_SAVE_ERROR,
  payload: { error },
});

export const disableAgencyAd = userId => ({
  type: AGENCY_DISABLE_AD,
  payload: { userId },
});

export const enableAgencyAd = userId => ({
  type: AGENCY_ENABLE_AD,
  payload: { userId },
});

export const assignAgent = (agencyId, agentId) => ({
  type: AGENCY_ASSIGN_AGENT,
  payload: { agencyId, agentId },
});

export const AssignAgentSuccess = data => ({
  type: AGENCY_ASSIGN_AGENT_SUCCESS,
  payload: data,
});

export const AssignAgentError = error => ({
  type: AGENCY_ASSIGN_AGENT_ERROR,
  payload: { error },
});

export const unassignAgent = (agencyId, agentId) => ({
  type: AGENCY_UNASSIGN_AGENT,
  payload: { agencyId, agentId },
});

export const unassignAgentSuccess = data => ({
  type: AGENCY_UNASSIGN_AGENT_SUCCESS,
  payload: data,
});

export const unassignAgentError = error => ({
  type: AGENCY_UNASSIGN_AGENT_ERROR,
  payload: { error },
});

export const fetchAssignedAgents = (id, filters) => ({
  type: AGENCY_FETCH_ASSIGNED_AGENTS,
  payload: { id, filters },
});

export const fetchAssignedAgentsSuccess = data => ({
  type: AGENCY_FETCH_ASSIGNED_AGENTS_SUCCESS,
  payload: data,
});

export const fetchAssignedAgentsError = error => ({
  type: AGENCY_FETCH_ASSIGNED_AGENTS_ERROR,
  payload: { error },
});

export const getMyProfile = () => ({
  type: AGENCY_GET_PROFILE,
});

export const getMyProfileSuccess = data => ({
  type: AGENCY_GET_PROFILE_SUCCESS,
  payload: data,
});

export const getMyProfileError = error => ({
  type: AGENCY_GET_PROFILE_ERROR,
  payload: error,
});

export const editMyProfile = (params, file) => ({
  type: AGENCY_EDIT_PROFILE,
  payload: { params, file },
});

export const editMyProfileSuccess = () => ({
  type: AGENCY_EDIT_PROFILE_SUCCESS,
});

export const editMyProfileError = error => ({
  type: AGENCY_EDIT_PROFILE_ERROR,
  payload: error,
});

export const closeModal = () => ({
  type: AGENCY_CLOSE_MODAL,
});
