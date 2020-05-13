import {
  AGENT_FETCH_LIST,
  AGENT_FETCH_LIST_SUCCESS,
  AGENT_FETCH_LIST_ERROR,
  AGENT_SAVE,
  AGENT_SAVE_SUCCESS,
  AGENT_SAVE_ERROR,
  AGENT_FETCH_ID_SUCCESS,
  AGENT_FETCH_ID,
  AGENT_FETCH_ID_ERROR,
  AGENT_ACCEPT,
  AGENT_REFUSE,
  AGENT_BLOCK,
  AGENT_APPROVAL_ERROR,
  AGENT_APPROVAL_SUCCESS,
  AGENT_ASSIGN_AGENCY,
  AGENT_ASSIGN_AGENCY_SUCCESS,
  AGENT_ASSIGN_AGENCY_ERROR,
  AGENT_UNASSIGN_AGENCY,
  AGENT_UNASSIGN_AGENCY_SUCCESS,
  AGENT_UNASSIGN_AGENCY_ERROR,
  AGENT_FETCH_ASSIGNED_AGENCIES,
  AGENT_FETCH_ASSIGNED_AGENCIES_SUCCESS,
  AGENT_FETCH_ASSIGNED_AGENTS_ERROR,
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
  saveAgentSubscriptionSuccess: false,

  approvalLoading: false,
  approvalSuccess: false,
  approvalError: null,

  assignedPages: 0,
  assignedPage: 0,
  assignedData: [],
  assignedFetchError: null,
  assignedFetchLoading: false,

  ableSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case AGENT_FETCH_ID:
      return {
        ...state,
        fetchIdLoading: true,
        fetchIdError: null,
        dataId: null,
      };
    case AGENT_FETCH_ID_SUCCESS:
      return {
        ...state,
        fetchIdLoading: false,
        fetchIdError: null,
        dataId: action.payload,
      };
    case AGENT_FETCH_ID_ERROR:
      return { ...state, fetchIdLoading: false, fetchIdError: action.payload };

    case AGENT_ACCEPT:
    case AGENT_REFUSE:
    case AGENT_BLOCK:
      return {
        ...state,
        approvalLoading: true,
        approvalSuccess: false,
        approvalError: null,
      };

    case AGENT_APPROVAL_ERROR:
      return {
        ...state,
        approvalLoading: false,
        approvalSuccess: false,
        approvalError: action.payload,
      };
    case AGENT_APPROVAL_SUCCESS:
      return {
        ...state,
        approvalLoading: false,
        approvalSuccess: true,
        approvalError: null,
      };

    case AGENT_FETCH_LIST:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
        data: [],
        page: 0,
        pages: 0,
      };
    case AGENT_FETCH_LIST_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        data: action.payload.data,
        pages: action.payload.lastPage,
        page: action.payload.page,
      };
    case AGENT_FETCH_LIST_ERROR:
      return { ...state, fetchLoading: false, fetchError: action.payload };
    case AGENT_SAVE:
      return {
        ...state,
        saveLoading: true,
        saveError: null,
        saveSuccess: false,
      };
    case AGENT_SAVE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
        saveError: null,
        saveSuccess: true,
      };
    case AGENT_SAVE_ERROR:
      return {
        ...state,
        saveLoading: false,
        saveError: action.payload.error,
        saveSuccess: false,
      };

    case AGENT_ASSIGN_AGENCY:
      return {
        ...state,
        assignedLoading: true,
        assignedError: null,
        assignedSuccess: false,
      };
    case AGENT_ASSIGN_AGENCY_SUCCESS:
      return {
        ...state,
        assignedData: action.payload,
        assignedLoading: false,
        assignedError: null,
      };
    case AGENT_ASSIGN_AGENCY_ERROR:
      return {
        ...state,
        assignedLoading: false,
        assignedError: action.payload.error,
        assignedSuccess: false,
      };

    case AGENT_UNASSIGN_AGENCY:
      return {
        ...state,
        unassignLoading: true,
        unassignError: null,
        unassignSuccess: false,
      };
    case AGENT_UNASSIGN_AGENCY_SUCCESS:
      return {
        ...state,
        assignedData: action.payload,
        unassignedLoading: false,
        unassignedError: null,
      };
    case AGENT_UNASSIGN_AGENCY_ERROR:
      return {
        ...state,
        unassignedLoading: false,
        unassignedError: action.payload.error,
      };

    case AGENT_FETCH_ASSIGNED_AGENCIES:
      return {
        ...state,
        assignedFetchLoading: true,
        assignedFetchError: null,
        assignedData: [],
        assignedPage: 0,
        assignedPages: 0,
      };
    case AGENT_FETCH_ASSIGNED_AGENCIES_SUCCESS:
      return {
        ...state,
        assignedFetchLoading: false,
        assignedFetchError: null,
        assignedData: action.payload.data,
        assignedPages: action.payload.lastPage,
        assignedPage: action.payload.page,
      };
    case AGENT_FETCH_ASSIGNED_AGENTS_ERROR:
      return {
        ...state,
        assignedFetchLoading: false,
        assignedFetchError: action.payload,
      };

    default:
      return state;
  }
};
