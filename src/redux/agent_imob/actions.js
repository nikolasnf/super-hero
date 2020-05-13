import {
  IMOB_AGENT_FETCH_LIST,
  IMOB_AGENT_FETCH_LIST_SUCCESS,
  IMOB_AGENT_FETCH_LIST_ERROR,
  IMOB_AGENT_APPROVE_ASSIGN,
  IMOB_AGENT_APPROVE_ASSIGN_SUCCESS,
  IMOB_AGENT_APPROVE_ASSIGN_ERROR,
  IMOB_AGENT_APPROVE_ASSIGN_REFRESH_SUCCESS,
  IMOB_AGENT_UNASSIGN,
  IMOB_AGENT_UNASSIGN_SUCCESS,
  IMOB_AGENT_UNASSIGN_ERROR,
  IMOB_AGENT_UNASSIGN_REFRESH_SUCCESS,
  IMOB_SEARCH_FETCH_LIST,
  IMOB_SEARCH_FETCH_LIST_SUCCESS,
  IMOB_SEARCH_FETCH_LIST_ERROR,
  AGENCY_REQUEST_AGENT,
  AGENCY_REQUEST_AGENT_ERROR,
  AGENCY_REQUEST_AGENT_SUCCESS,
} from '../actions';

export const fetchAgents = filters => ({
  type: IMOB_AGENT_FETCH_LIST,
  payload: { filters },
});

export const fetchAgentsSuccess = data => ({
  type: IMOB_AGENT_FETCH_LIST_SUCCESS,
  payload: data,
});

export const fetchAgentsError = error => ({
  type: IMOB_AGENT_FETCH_LIST_ERROR,
  payload: { error },
});

export const fetchSearchAgents = filters => ({
  type: IMOB_SEARCH_FETCH_LIST,
  payload: { filters },
});

export const fetchSearchAgentsSuccess = data => ({
  type: IMOB_SEARCH_FETCH_LIST_SUCCESS,
  payload: data,
});

export const fetchSearchAgentsError = error => ({
  type: IMOB_SEARCH_FETCH_LIST_ERROR,
  payload: { error },
});

export const approveAssign = data => ({
  type: IMOB_AGENT_APPROVE_ASSIGN,
  payload: data,
});

export const approveAssignSuccess = payload => ({
  type: IMOB_AGENT_APPROVE_ASSIGN_SUCCESS,
  payload,
});

export const approveAssignError = error => ({
  type: IMOB_AGENT_APPROVE_ASSIGN_ERROR,
  payload: error,
});

export const approveAssignRefreshSuccess = () => ({
  type: IMOB_AGENT_APPROVE_ASSIGN_REFRESH_SUCCESS,
});

export const unassignAgent = (id, stay = false) => ({
  type: IMOB_AGENT_UNASSIGN,
  payload: { id, stay },
});

export const unassignAgentSuccess = payload => ({
  type: IMOB_AGENT_UNASSIGN_SUCCESS,
  payload,
});

export const unassignAgentError = error => ({
  type: IMOB_AGENT_UNASSIGN_ERROR,
  payload: error,
});

export const unassignAgentRefreshSuccess = () => ({
  type: IMOB_AGENT_UNASSIGN_REFRESH_SUCCESS,
});

export const requestAgent = payload => ({
  type: AGENCY_REQUEST_AGENT,
  payload,
});

export const requestAgentSuccess = payload => ({
  type: AGENCY_REQUEST_AGENT_SUCCESS,
  payload,
});

export const requestAgentError = payload => ({
  type: AGENCY_REQUEST_AGENT_ERROR,
  payload,
});
