import {
  USER_FETCH_LIST,
  USER_FETCH_LIST_SUCCESS,
  USER_FETCH_LIST_ERROR,
  USER_SAVE,
  USER_SAVE_SUCCESS,
  USER_SAVE_ERROR,
  USER_RESET_ID,
  USER_FETCH_ID,
  USER_FETCH_ID_SUCCESS,
  USER_FETCH_ID_ERROR,
  USER_ACCEPT,
  USER_REFUSE,
  USER_BLOCK,
  USER_APPROVAL_SUCCESS,
  USER_APPROVAL_ERROR,
  USER_FETCH_AD_LIST,
  USER_FETCH_AD_LIST_SUCCESS,
  USER_FETCH_AD_LIST_ERROR,
  USER_FETCH_AD_ID,
  USER_FETCH_AD_ID_SUCCESS,
  USER_FETCH_AD_ID_ERROR,
  USER_DISABLE_AD,
  USERS_DISABLE,
  USERS_ENABLE,
  USERS_ABLE_SUCCESS,
  USERS_ABLE_RESET,
  USER_ENABLE_AD,
} from '../actions';

export const resetUserId = () => ({
  type: USER_RESET_ID,
});

export const fetchUserId = id => ({
  type: USER_FETCH_ID,
  payload: { id },
});

export const acceptUser = id => ({
  type: USER_ACCEPT,
  payload: { id },
});

export const refuseUser = id => ({
  type: USER_REFUSE,
  payload: { id },
});

export const blockUser = id => ({
  type: USER_BLOCK,
  payload: { id },
});

export const userApprovalSuccess = () => ({
  type: USER_APPROVAL_SUCCESS,
});

export const userApprovalError = error => ({
  type: USER_APPROVAL_ERROR,
  payload: error,
});

export const fetchUserIdSuccess = data => ({
  type: USER_FETCH_ID_SUCCESS,
  payload: data,
});

export const fetchUserIdError = error => ({
  type: USER_FETCH_ID_ERROR,
  payload: { error },
});

export const fetchUsers = filters => ({
  type: USER_FETCH_LIST,
  payload: { filters },
});

export const fetchUsersSuccess = data => ({
  type: USER_FETCH_LIST_SUCCESS,
  payload: data,
});

export const fetchUsersError = error => ({
  type: USER_FETCH_LIST_ERROR,
  payload: { error },
});

export const fetchAdUserId = id => ({
  type: USER_FETCH_AD_ID,
  payload: { id },
});

export const fetchAdUserIdSuccess = data => ({
  type: USER_FETCH_AD_ID_SUCCESS,
  payload: data,
});

export const fetchAdUserIdError = error => ({
  type: USER_FETCH_AD_ID_ERROR,
  payload: { error },
});

export const saveUser = params => ({
  type: USER_SAVE,
  payload: { params },
});

export const saveUserSuccess = data => ({
  type: USER_SAVE_SUCCESS,
  payload: { data },
});

export const saveUserError = error => ({
  type: USER_SAVE_ERROR,
  payload: { error },
});

export const fetchAdUsers = filters => ({
  type: USER_FETCH_AD_LIST,
  payload: { filters },
});

export const fetchAdUsersSuccess = data => ({
  type: USER_FETCH_AD_LIST_SUCCESS,
  payload: data,
});

export const fetchAdUsersError = error => ({
  type: USER_FETCH_AD_LIST_ERROR,
  payload: { error },
});

export const disableUserAd = userId => ({
  type: USER_DISABLE_AD,
  payload: { userId },
});

export const enableUserAd = userId => ({
  type: USER_ENABLE_AD,
  payload: { userId },
});

export const disableUsers = (id, page) => ({
  type: USERS_DISABLE,
  payload: { id, page },
});

export const enableUsers = (id, page) => ({
  type: USERS_ENABLE,
  payload: { id, page },
});

export const ableUsersSuccess = () => ({
  type: USERS_ABLE_SUCCESS,
});

export const ableUsersReset = () => ({
  type: USERS_ABLE_RESET,
});
