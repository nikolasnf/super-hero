import {
  USER_TRANSACTION_FETCH_LIST,
  USER_TRANSACTION_FETCH_LIST_SUCCESS,
  USER_TRANSACTION_FETCH_LIST_ERROR,
  USER_TRANSACTION_FETCH_ID,
  USER_TRANSACTION_FETCH_ID_SUCCESS,
  USER_TRANSACTION_FETCH_ID_ERROR,
  AGENCY_TRANSACTION_FETCH_LIST,
  AGENCY_TRANSACTION_FETCH_LIST_SUCCESS,
  AGENCY_TRANSACTION_FETCH_LIST_ERROR,
  AGENCY_TRANSACTION_FETCH_ID,
  AGENCY_TRANSACTION_FETCH_ID_SUCCESS,
  AGENCY_TRANSACTION_FETCH_ID_ERROR,
  AGENT_TRANSACTION_FETCH_LIST,
  AGENT_TRANSACTION_FETCH_LIST_SUCCESS,
  AGENT_TRANSACTION_FETCH_LIST_ERROR,
  AGENT_TRANSACTION_FETCH_ID,
  AGENT_TRANSACTION_FETCH_ID_SUCCESS,
  AGENT_TRANSACTION_FETCH_ID_ERROR,
} from '../actions';

export const fetchUserTransactionId = id => ({
  type: USER_TRANSACTION_FETCH_ID,
  payload: { id },
});

export const fetchUserTransactionIdSuccess = data => ({
  type: USER_TRANSACTION_FETCH_ID_SUCCESS,
  payload: data,
});

export const fetchUserTransactionIdError = error => ({
  type: USER_TRANSACTION_FETCH_ID_ERROR,
  payload: { error },
});

export const fetchUsersTransaction = filters => ({
  type: USER_TRANSACTION_FETCH_LIST,
  payload: { filters },
});

export const fetchUsersTransactionSuccess = data => ({
  type: USER_TRANSACTION_FETCH_LIST_SUCCESS,
  payload: data,
});

export const fetchUsersTransactionError = error => ({
  type: USER_TRANSACTION_FETCH_LIST_ERROR,
  payload: { error },
});

// Agencies

export const fetchAgencyTransactionId = id => ({
  type: AGENCY_TRANSACTION_FETCH_ID,
  payload: { id },
});

export const fetchAgencyTransactionIdSuccess = data => ({
  type: AGENCY_TRANSACTION_FETCH_ID_SUCCESS,
  payload: data,
});

export const fetchAgencyTransactionIdError = error => ({
  type: AGENCY_TRANSACTION_FETCH_ID_ERROR,
  payload: { error },
});

export const fetchAgenciesTransaction = filters => ({
  type: AGENCY_TRANSACTION_FETCH_LIST,
  payload: { filters },
});

export const fetchAgenciesTransactionSuccess = data => ({
  type: AGENCY_TRANSACTION_FETCH_LIST_SUCCESS,
  payload: data,
});

export const fetchAgenciesTransactionError = error => ({
  type: AGENCY_TRANSACTION_FETCH_LIST_ERROR,
  payload: { error },
});

// Agents

export const fetchAgentTransactionId = id => ({
  type: AGENT_TRANSACTION_FETCH_ID,
  payload: { id },
});

export const fetchAgentTransactionIdSuccess = data => ({
  type: AGENT_TRANSACTION_FETCH_ID_SUCCESS,
  payload: data,
});

export const fetchAgentTransactionIdError = error => ({
  type: AGENT_TRANSACTION_FETCH_ID_ERROR,
  payload: { error },
});

export const fetchAgentsTransaction = filters => ({
  type: AGENT_TRANSACTION_FETCH_LIST,
  payload: { filters },
});

export const fetchAgentsTransactionSuccess = data => ({
  type: AGENT_TRANSACTION_FETCH_LIST_SUCCESS,
  payload: data,
});

export const fetchAgentsTransactionError = error => ({
  type: AGENT_TRANSACTION_FETCH_LIST_ERROR,
  payload: { error },
});
