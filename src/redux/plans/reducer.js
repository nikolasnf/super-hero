import {
  PLANS_DISABLE,
  PLANS_FETCH_LIST,
  PLANS_FETCH_ID,
  PLANS_FETCH_ID_SUCCESS,
  PLANS_FETCH_ID_ERROR,
  PLANS_FETCH_LIST_SUCCESS,
  PLANS_FETCH_LIST_ERROR,
  PLANS_SAVE,
  PLANS_SAVE_SUCCESS,
  PLANS_SAVE_ERROR,
  PLANS_EDIT,
  PLANS_ABLE_SUCCESS,
  PLANS_ABLE_RESET,
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

  saveError: null,
  saveSuccess: false,
  saveLoading: false,

  ableSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PLANS_FETCH_ID:
      return {
        ...state,
        fetchIdLoading: true,
        fetchIdError: null,
        dataId: null,
      };
    case PLANS_FETCH_ID_SUCCESS:
      return {
        ...state,
        fetchIdLoading: false,
        fetchIdError: null,
        dataId: action.payload,
      };
    case PLANS_FETCH_ID_ERROR:
      return { ...state, fetchIdLoading: false, fetchIdError: action.payload };

    case PLANS_FETCH_LIST:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
        data: [],
        page: 0,
        pages: 0,
      };

    case PLANS_FETCH_LIST_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        data: action.payload.data,
        pages: action.payload.lastPage,
        page: action.payload.page,
      };
    case PLANS_FETCH_LIST_ERROR:
      return { ...state, fetchLoading: false, fetchError: action.payload };
    case PLANS_SAVE:
    case PLANS_EDIT:
      return {
        ...state,
        saveLoading: true,
        saveError: null,
        saveSuccess: false,
      };
    case PLANS_SAVE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
        saveError: null,
        saveSuccess: true,
      };
    case PLANS_SAVE_ERROR:
      return {
        ...state,
        saveLoading: false,
        saveError: action.payload.error,
        saveSuccess: false,
      };

    case PLANS_ABLE_SUCCESS:
      return {
        ...state,
        ableSuccess: true,
      };
    case PLANS_ABLE_RESET:
      return {
        ...state,
        ableSuccess: false,
      };
    default:
      return state;
  }
};
