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
  IMOB_SEARCH_FETCH_LIST_ERROR,
  IMOB_SEARCH_FETCH_LIST_SUCCESS,
  IMOB_SEARCH_FETCH_LIST,
  AGENCY_REQUEST_AGENT,
  AGENCY_REQUEST_AGENT_ERROR,
  AGENCY_REQUEST_AGENT_SUCCESS,
} from '../actions';

const INIT_STATE = {
  fetchIdError: null,
  fetchIdLoading: false,

  pages: 0,
  page: 0,
  data: [],
  fetchError: null,
  fetchLoading: false,

  approveLoading: false,
  approveSuccess: false,
  approveError: null,

  unassignLoading: false,
  unassignSuccess: false,
  unassignError: null,

  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case IMOB_AGENT_FETCH_LIST:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
        data: [],
        page: 0,
        pages: 0,
      };
    case IMOB_AGENT_FETCH_LIST_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        data: action.payload.data,
        pages: action.payload.lastPage,
        page: action.payload.page,
      };
    case IMOB_AGENT_FETCH_LIST_ERROR:
      return { ...state, fetchLoading: false, fetchError: action.payload };

    case IMOB_SEARCH_FETCH_LIST:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
        data: [],
        page: 0,
        pages: 0,
      };
    case IMOB_SEARCH_FETCH_LIST_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        data: action.payload.data,
        pages: action.payload.lastPage,
        page: action.payload.page,
      };
    case IMOB_SEARCH_FETCH_LIST_ERROR:
      return { ...state, fetchLoading: false, fetchError: action.payload };

    case IMOB_AGENT_APPROVE_ASSIGN:
      return {
        ...state,
        approveLoading: true,
        approveError: false,
        approveSuccess: false,
      };
    case IMOB_AGENT_APPROVE_ASSIGN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        approveLoading: false,
        approveError: false,
        approveSuccess: true,
      };
    case IMOB_AGENT_APPROVE_ASSIGN_ERROR:
      return {
        ...state,
        approveLoading: false,
        approveError: action.payload,
        approveSuccess: false,
      };
    case IMOB_AGENT_APPROVE_ASSIGN_REFRESH_SUCCESS:
      return {
        ...state,
        approveLoading: false,
        approveError: false,
        approveSuccess: false,
      };
    case IMOB_AGENT_UNASSIGN:
      return {
        ...state,
        unassignLoading: true,
        unassignSuccess: false,
        unassignError: false,
      };
    case IMOB_AGENT_UNASSIGN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        unassignLoading: false,
        unassignSuccess: true,
        unassignError: false,
      };
    case IMOB_AGENT_UNASSIGN_ERROR:
      return {
        ...state,
        unassignLoading: false,
        unassignSuccess: false,
        unassignError: action.payload,
      };
    case IMOB_AGENT_UNASSIGN_REFRESH_SUCCESS:
      return {
        ...state,
        unassignLoading: false,
        unassignSuccess: false,
        unassignError: false,
      };
    case AGENCY_REQUEST_AGENT:
      return {
        ...state,
        fetchLoading: true,
      };
    case AGENCY_REQUEST_AGENT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        fetchLoading: false,
      };
    case AGENCY_REQUEST_AGENT_ERROR:
      return {
        ...state,
        fetchLoading: false,
      };
    default:
      return state;
  }
};
