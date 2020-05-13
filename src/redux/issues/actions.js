import {
  ISSUES_FETCH,
  ISSUES_FETCH_SUCCESS,
  ISSUES_FETCH_ERROR,
  ISSUES_FETCH_ID,
  ISSUES_FETCH_ID_SUCCESS,
  ISSUES_FETCH_ID_ERROR,
  ISSUE_READ,
  ISSUE_READ_SUCCESS,
  ISSUE_READ_ERROR,
} from '../actions';

export const fetchIssues = filters => ({
  type: ISSUES_FETCH,
  payload: { filters },
});

export const fetchIssuesSuccess = data => ({
  type: ISSUES_FETCH_SUCCESS,
  payload: { data },
});

export const fetchIssuesError = error => ({
  type: ISSUES_FETCH_ERROR,
  payload: error,
});

export const fetchIssueId = id => ({
  type: ISSUES_FETCH_ID,
  payload: { id },
});

export const fetchIssueIdSuccess = data => ({
  type: ISSUES_FETCH_ID_SUCCESS,
  payload: data,
});

export const fetchIssueIdError = error => ({
  type: ISSUES_FETCH_ID_ERROR,
  payload: error,
});

export const readIssue = (id, readBool, all) => ({
  type: ISSUE_READ,
  payload: { id, readBool, all },
});

export const readIssueSuccess = data => ({
  type: ISSUE_READ_SUCCESS,
  payload: data,
});

export const readIssueError = error => ({
  type: ISSUE_READ_ERROR,
  payload: { error },
});
