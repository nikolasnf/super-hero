import {
  USER_RATING_FETCH_LIST,
  USER_RATING_FETCH_LIST_SUCCESS,
  USER_RATING_FETCH_LIST_ERROR,
  USER_RATING_FETCH_ID,
  USER_RATING_FETCH_ID_SUCCESS,
  USER_RATING_FETCH_ID_ERROR,
  RATING_READ,
  RATING_READ_SUCCESS,
  RATING_READ_ERROR,
  AGENCY_RATING_FETCH_LIST,
  AGENCY_RATING_FETCH_LIST_SUCCESS,
  AGENCY_RATING_FETCH_LIST_ERROR,
  AGENCY_RATING_FETCH_ID,
  AGENCY_RATING_FETCH_ID_SUCCESS,
  AGENCY_RATING_FETCH_ID_ERROR,
  AGENT_RATING_FETCH_LIST,
  AGENT_RATING_FETCH_LIST_SUCCESS,
  AGENT_RATING_FETCH_LIST_ERROR,
  AGENT_RATING_FETCH_ID,
  AGENT_RATING_FETCH_ID_SUCCESS,
  AGENT_RATING_FETCH_ID_ERROR,
} from '../actions';

export const fetchUserRatingId = id => ({
  type: USER_RATING_FETCH_ID,
  payload: { id },
});

export const fetchUserRatingIdSuccess = data => ({
  type: USER_RATING_FETCH_ID_SUCCESS,
  payload: data,
});

export const fetchUserRatingIdError = error => ({
  type: USER_RATING_FETCH_ID_ERROR,
  payload: { error },
});

export const fetchUsersRating = filters => ({
  type: USER_RATING_FETCH_LIST,
  payload: { filters },
});

export const fetchUsersRatingSuccess = data => ({
  type: USER_RATING_FETCH_LIST_SUCCESS,
  payload: data,
});

export const fetchUsersRatingError = error => ({
  type: USER_RATING_FETCH_LIST_ERROR,
  payload: { error },
});

export const readRating = (id, readBool, all) => ({
  type: RATING_READ,
  payload: { id, readBool, all },
});

export const readRatingSuccess = data => ({
  type: RATING_READ_SUCCESS,
  payload: data,
});

export const readRatingError = error => ({
  type: RATING_READ_ERROR,
  payload: { error },
});

// Agencies

export const fetchAgencyRatingId = id => ({
  type: AGENCY_RATING_FETCH_ID,
  payload: { id },
});

export const fetchAgencyRatingIdSuccess = data => ({
  type: AGENCY_RATING_FETCH_ID_SUCCESS,
  payload: data,
});

export const fetchAgencyRatingIdError = error => ({
  type: AGENCY_RATING_FETCH_ID_ERROR,
  payload: { error },
});

export const fetchAgenciesRating = filters => ({
  type: AGENCY_RATING_FETCH_LIST,
  payload: { filters },
});

export const fetchAgenciesRatingSuccess = data => ({
  type: AGENCY_RATING_FETCH_LIST_SUCCESS,
  payload: data,
});

export const fetchAgenciesRatingError = error => ({
  type: AGENCY_RATING_FETCH_LIST_ERROR,
  payload: { error },
});

// Agents

export const fetchAgentRatingId = id => ({
  type: AGENT_RATING_FETCH_ID,
  payload: { id },
});

export const fetchAgentRatingIdSuccess = data => ({
  type: AGENT_RATING_FETCH_ID_SUCCESS,
  payload: data,
});

export const fetchAgentRatingIdError = error => ({
  type: AGENT_RATING_FETCH_ID_ERROR,
  payload: { error },
});

export const fetchAgentsRating = filters => ({
  type: AGENT_RATING_FETCH_LIST,
  payload: { filters },
});

export const fetchAgentsRatingSuccess = data => ({
  type: AGENT_RATING_FETCH_LIST_SUCCESS,
  payload: data,
});

export const fetchAgentsRatingError = error => ({
  type: AGENT_RATING_FETCH_LIST_ERROR,
  payload: { error },
});
