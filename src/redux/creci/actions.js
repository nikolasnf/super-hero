import {
  CRECI_LIST,
  CRECI_LIST_SUCCESS,
  CRECI_LIST_ERROR,
  CRECI_BY_ID,
  CRECI_BY_ID_SUCCESS,
  CRECI_BY_ID_ERROR,
  CRECI_APPROVE,
  CRECI_APPROVE_SUCCESS,
  CRECI_APPROVE_ERROR,
  CRECI_REPROVE,
  CRECI_REPROVE_SUCCESS,
  CRECI_REPROVE_ERROR,
} from '../actions';

export const creciList = payload => ({
  type: CRECI_LIST,
  payload,
});

export const creciListSuccess = payload => ({
  type: CRECI_LIST_SUCCESS,
  payload,
});

export const creciListError = payload => ({
  type: CRECI_LIST_ERROR,
  payload,
});

export const creciById = payload => ({
  type: CRECI_BY_ID,
  payload,
});

export const creciByIdSuccess = payload => ({
  type: CRECI_BY_ID_SUCCESS,
  payload,
});

export const creciByIdError = payload => ({
  type: CRECI_BY_ID_ERROR,
  payload,
});

export const creciApprove = payload => ({
  type: CRECI_APPROVE,
  payload,
});

export const creciApproveSuccess = payload => ({
  type: CRECI_APPROVE_SUCCESS,
  payload,
});

export const creciApproveError = payload => ({
  type: CRECI_APPROVE_ERROR,
  payload,
});

export const creciReprove = payload => ({
  type: CRECI_REPROVE,
  payload,
});

export const creciReproveSuccess = payload => ({
  type: CRECI_REPROVE_SUCCESS,
  payload,
});

export const creciReproveError = payload => ({
  type: CRECI_REPROVE_ERROR,
  payload,
});
