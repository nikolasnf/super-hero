import {
  USER_FETCH_LIST,
  USER_FETCH_LIST_SUCCESS,
  USER_FETCH_LIST_ERROR,
  USER_SAVE,
  USER_SAVE_SUCCESS,
  USER_SAVE_ERROR,
  USER_FETCH_ID_SUCCESS,
  USER_FETCH_ID,
  USER_FETCH_ID_ERROR,
  USER_BLOCK,
  USER_APPROVAL_ERROR,
  USER_APPROVAL_SUCCESS,
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
} from '../actions';

const INIT_STATE = {
  dataId: null,
  fetchIdError: null,
  fetchIdLoading: false,

  pages: 0,
  page: 0,
  data: [],
  fetchError: null,
  fetchLoading: false,

  adDataId: null,
  adFetchIdError: null,
  adFetchIdLoading: false,

  adPages: 0,
  adPage: 0,
  adData: [],
  adFetchError: null,
  adFetchLoading: false,
  userId: null,

  saveError: null,
  saveSuccess: false,
  saveLoading: false,

  approvalLoading: false,
  approvalSuccess: false,
  approvalError: null,

  ableSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_FETCH_ID:
      return {
        ...state,
        fetchIdLoading: true,
        fetchIdError: null,
        dataId: null,
      };
    case USER_FETCH_ID_SUCCESS:
      return {
        ...state,
        fetchIdLoading: false,
        fetchIdError: null,
        dataId: action.payload,
      };
    case USER_FETCH_ID_ERROR:
      return { ...state, fetchIdLoading: false, fetchIdError: action.payload };

    case USER_BLOCK:
      return {
        ...state,
        approvalLoading: true,
        approvalSuccess: false,
        approvalError: null,
      };

    case USER_APPROVAL_ERROR:
      return {
        ...state,
        approvalLoading: false,
        approvalSuccess: false,
        approvalError: action.payload,
      };
    case USER_APPROVAL_SUCCESS:
      return {
        ...state,
        approvalLoading: false,
        approvalSuccess: true,
        approvalError: null,
      };

    case USER_FETCH_LIST:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
        data: [],
        page: 0,
        pages: 0,
      };
    case USER_FETCH_LIST_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        data: action.payload.data,
        pages: action.payload.lastPage,
        page: action.payload.page,
      };
    case USER_FETCH_LIST_ERROR:
      return { ...state, fetchLoading: false, fetchError: action.payload };
    case USER_SAVE:
      return {
        ...state,
        saveLoading: true,
        saveError: null,
        saveSuccess: false,
      };
    case USER_SAVE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
        saveError: null,
        saveSuccess: true,
      };
    case USER_SAVE_ERROR:
      return {
        ...state,
        saveLoading: false,
        saveError: action.payload,
        saveSuccess: true,
      };
    case USER_FETCH_AD_LIST:
      return {
        ...state,
        adFetchLoading: true,
        adFetchError: null,
        adData: [],
        adPage: 0,
        adPages: 0,
      };
    case USER_FETCH_AD_LIST_SUCCESS:
      return {
        ...state,
        adFetchLoading: false,
        adFetchError: null,
        adData: action.payload.data,
        adPages: action.payload.lastPage,
        adPage: action.payload.page,
      };
    case USER_FETCH_AD_LIST_ERROR:
      return { ...state, adFetchLoading: false, adFetchError: action.payload };
    case USER_FETCH_AD_ID:
      return {
        ...state,
        adFetchIdLoading: true,
        adFetchIdError: null,
        adDataId: null,
      };
    case USER_FETCH_AD_ID_SUCCESS:
      return {
        ...state,
        adFetchIdLoading: false,
        adFetchIdError: null,
        adDataId: action.payload,
      };
    case USER_FETCH_AD_ID_ERROR:
      return {
        ...state,
        adFetchIdLoading: false,
        adFetchIdError: action.payload,
      };

    case USER_DISABLE_AD:
      return {
        ...state,
        userId: action.payload.userId,
      };

    case USERS_DISABLE:
      return {
        ...state,
        ableSuccess: false,
      };
    case USERS_ENABLE:
      return {
        ...state,
        ableSuccess: false,
      };
    case USERS_ABLE_SUCCESS:
      return {
        ...state,
        ableSuccess: true,
      };
    case USERS_ABLE_RESET:
      return {
        ...state,
        ableSuccess: false,
      };
    default:
      return state;
  }
};
