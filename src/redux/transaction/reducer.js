import {
  USER_TRANSACTION_FETCH_ID,
  USER_TRANSACTION_FETCH_ID_SUCCESS,
  USER_TRANSACTION_FETCH_ID_ERROR,
  USER_TRANSACTION_FETCH_LIST,
  USER_TRANSACTION_FETCH_LIST_SUCCESS,
  USER_TRANSACTION_FETCH_LIST_ERROR,
  AGENCY_TRANSACTION_FETCH_ID,
  AGENCY_TRANSACTION_FETCH_ID_SUCCESS,
  AGENCY_TRANSACTION_FETCH_ID_ERROR,
  AGENCY_TRANSACTION_FETCH_LIST,
  AGENCY_TRANSACTION_FETCH_LIST_SUCCESS,
  AGENCY_TRANSACTION_FETCH_LIST_ERROR,
  AGENT_TRANSACTION_FETCH_ID,
  AGENT_TRANSACTION_FETCH_ID_SUCCESS,
  AGENT_TRANSACTION_FETCH_ID_ERROR,
  AGENT_TRANSACTION_FETCH_LIST,
  AGENT_TRANSACTION_FETCH_LIST_SUCCESS,
  AGENT_TRANSACTION_FETCH_LIST_ERROR,
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

  userId: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // USERS

    case USER_TRANSACTION_FETCH_ID:
      return {
        ...state,
        fetchIdLoading: true,
        fetchIdError: null,
        dataId: null,
      };
    case USER_TRANSACTION_FETCH_ID_SUCCESS:
      return {
        ...state,
        fetchIdLoading: false,
        fetchIdError: null,
        dataId: action.payload,
      };
    case USER_TRANSACTION_FETCH_ID_ERROR:
      return { ...state, fetchIdLoading: false, fetchIdError: action.payload };

    case USER_TRANSACTION_FETCH_LIST:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
        data: [],
        page: 0,
        pages: 0,
      };
    case USER_TRANSACTION_FETCH_LIST_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        data: action.payload.data,
        pages: action.payload.lastPage,
        page: action.payload.page,
      };
    case USER_TRANSACTION_FETCH_LIST_ERROR:
      return { ...state, fetchLoading: false, fetchError: action.payload };

    // AGENCIES

    case AGENCY_TRANSACTION_FETCH_ID:
      return {
        ...state,
        fetchIdLoading: true,
        fetchIdError: null,
        dataId: null,
      };
    case AGENCY_TRANSACTION_FETCH_ID_SUCCESS:
      return {
        ...state,
        fetchIdLoading: false,
        fetchIdError: null,
        dataId: action.payload,
      };
    case AGENCY_TRANSACTION_FETCH_ID_ERROR:
      return { ...state, fetchIdLoading: false, fetchIdError: action.payload };

    case AGENCY_TRANSACTION_FETCH_LIST:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
        data: [],
        page: 0,
        pages: 0,
      };
    case AGENCY_TRANSACTION_FETCH_LIST_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        data: action.payload.data,
        pages: action.payload.lastPage,
        page: action.payload.page,
      };
    case AGENCY_TRANSACTION_FETCH_LIST_ERROR:
      return { ...state, fetchLoading: false, fetchError: action.payload };

    // AGENTS

    case AGENT_TRANSACTION_FETCH_ID:
      return {
        ...state,
        fetchIdLoading: true,
        fetchIdError: null,
        dataId: null,
      };
    case AGENT_TRANSACTION_FETCH_ID_SUCCESS:
      return {
        ...state,
        fetchIdLoading: false,
        fetchIdError: null,
        dataId: action.payload,
      };
    case AGENT_TRANSACTION_FETCH_ID_ERROR:
      return { ...state, fetchIdLoading: false, fetchIdError: action.payload };

    case AGENT_TRANSACTION_FETCH_LIST:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
        data: [],
        page: 0,
        pages: 0,
      };
    case AGENT_TRANSACTION_FETCH_LIST_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        data: action.payload.data,
        pages: action.payload.lastPage,
        page: action.payload.page,
      };
    case AGENT_TRANSACTION_FETCH_LIST_ERROR:
      return { ...state, fetchLoading: false, fetchError: action.payload };

    default:
      return state;
  }
};
