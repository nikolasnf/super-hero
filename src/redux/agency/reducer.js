import {
  AGENCY_FETCH_ID,
  AGENCY_FETCH_ID_SUCCESS,
  AGENCY_FETCH_ID_ERROR,
  AGENCY_FETCH_LIST,
  AGENCY_FETCH_LIST_SUCCESS,
  AGENCY_FETCH_LIST_ERROR,
  AGENCY_SAVE,
  AGENCY_SAVE_SUCCESS,
  AGENCY_SAVE_ERROR,
  AGENCY_ACCEPT,
  AGENCY_BLOCK,
  AGENCY_APPROVAL_ERROR,
  AGENCY_APPROVAL_SUCCESS,
  AGENCY_FETCH_AD_LIST,
  AGENCY_FETCH_AD_LIST_SUCCESS,
  AGENCY_FETCH_AD_LIST_ERROR,
  AGENCY_FETCH_AD_ID,
  AGENCY_FETCH_AD_ID_SUCCESS,
  AGENCY_FETCH_AD_ID_ERROR,
  AGENCY_DISABLE_AD,
  AGENCY_ASSIGN_AGENT,
  AGENCY_ASSIGN_AGENT_SUCCESS,
  AGENCY_ASSIGN_AGENT_ERROR,
  AGENCY_FETCH_ASSIGNED_AGENTS,
  AGENCY_FETCH_ASSIGNED_AGENTS_SUCCESS,
  AGENCY_FETCH_ASSIGNED_AGENTS_ERROR,
  AGENCY_GET_PROFILE,
  AGENCY_GET_PROFILE_SUCCESS,
  AGENCY_GET_PROFILE_ERROR,
  AGENCY_EDIT_PROFILE,
  AGENCY_EDIT_PROFILE_SUCCESS,
  AGENCY_EDIT_PROFILE_ERROR,
  AGENCY_UNASSIGN_AGENT,
  AGENCY_UNASSIGN_AGENT_SUCCESS,
  AGENCY_UNASSIGN_AGENT_ERROR,
  AGENCY_CLOSE_MODAL,
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

  assignedPages: 0,
  assignedPage: 0,
  assignedData: [],
  assignedFetchError: null,
  assignedFetchLoading: false,

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
  saveSuccess: true,
  saveLoading: false,
  showModal: false,

  approvalLoading: false,
  approvalSuccess: false,
  approvalError: null,

  assignedLoading: false,
  assignedSucess: false,
  assignedError: null,

  myProfile: null,
  myProfileLoading: false,
  myProfileError: false,

  editLoading: false,
  editSuccess: false,
  editError: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case AGENCY_FETCH_ID:
      return {
        ...state,
        fetchIdLoading: true,
        fetchIdError: null,
        dataId: null,
      };
    case AGENCY_FETCH_ID_SUCCESS:
      return {
        ...state,
        fetchIdLoading: false,
        fetchIdError: null,
        dataId: action.payload,
      };
    case AGENCY_FETCH_ID_ERROR:
      return { ...state, fetchIdLoading: false, fetchIdError: action.payload };

    case AGENCY_ACCEPT:
    case AGENCY_BLOCK:
      return {
        ...state,
        approvalLoading: true,
        approvalSuccess: false,
        approvalError: null,
      };

    case AGENCY_APPROVAL_ERROR:
      return {
        ...state,
        approvalLoading: false,
        approvalSuccess: false,
        approvalError: action.payload,
      };
    case AGENCY_APPROVAL_SUCCESS:
      return {
        ...state,
        approvalLoading: false,
        approvalSuccess: true,
        approvalError: null,
      };

    case AGENCY_FETCH_LIST:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
        data: [],
        page: 0,
        pages: 0,
      };
    case AGENCY_FETCH_LIST_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        data: action.payload.data,
        pages: action.payload.lastPage,
        page: action.payload.page,
      };
    case AGENCY_FETCH_LIST_ERROR:
      return { ...state, fetchLoading: false, fetchError: action.payload };

    case AGENCY_SAVE:
      return {
        ...state,
        saveLoading: true,
        saveError: null,
        saveSuccess: false,
        showModal: false,
      };
    case AGENCY_SAVE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
        saveError: null,
        saveSuccess: true,
        showModal: true,
      };
    case AGENCY_SAVE_ERROR:
      return {
        ...state,
        saveLoading: false,
        saveError: action.payload.error,
        saveSuccess: false,
        showModal: false,
      };
    case AGENCY_CLOSE_MODAL:
      return {
        showModal: false,
      };
    case AGENCY_FETCH_AD_LIST:
      return {
        ...state,
        adFetchLoading: true,
        adFetchError: null,
        adData: [],
        adPage: 0,
        adPages: 0,
      };
    case AGENCY_FETCH_AD_LIST_SUCCESS:
      return {
        ...state,
        adFetchLoading: false,
        adFetchError: null,
        adData: action.payload.data,
        adPages: action.payload.lastPage,
        adPage: action.payload.page,
      };
    case AGENCY_FETCH_AD_LIST_ERROR:
      return { ...state, adFetchLoading: false, adFetchError: action.payload };
    case AGENCY_FETCH_AD_ID:
      return {
        ...state,
        adFetchIdLoading: true,
        adFetchIdError: null,
        adDataId: null,
      };
    case AGENCY_FETCH_AD_ID_SUCCESS:
      return {
        ...state,
        adFetchIdLoading: false,
        adFetchIdError: null,
        adDataId: action.payload,
      };
    case AGENCY_FETCH_AD_ID_ERROR:
      return {
        ...state,
        adFetchIdLoading: false,
        adFetchIdError: action.payload,
      };

    case AGENCY_DISABLE_AD:
      return {
        ...state,
        userId: action.payload.userId,
      };

    case AGENCY_ASSIGN_AGENT:
      return {
        ...state,
        assignedLoading: true,
        assignedError: null,
        assignedSuccess: false,
      };
    case AGENCY_ASSIGN_AGENT_SUCCESS:
      return {
        ...state,
        assignedData: action.payload,
        assignedLoading: false,
        assignedError: null,
      };
    case AGENCY_ASSIGN_AGENT_ERROR:
      return {
        ...state,
        assignedLoading: false,
        assignedError: action.payload.error,
        assignedSuccess: false,
      };

    case AGENCY_UNASSIGN_AGENT:
      return {
        ...state,
        unassignLoading: true,
        unassignError: null,
        unassignSuccess: false,
      };
    case AGENCY_UNASSIGN_AGENT_SUCCESS:
      return {
        ...state,
        assignedData: action.payload,
        unassignedLoading: false,
        unassignedError: null,
      };
    case AGENCY_UNASSIGN_AGENT_ERROR:
      return {
        ...state,
        unassignedLoading: false,
        unassignedError: action.payload.error,
      };

    case AGENCY_FETCH_ASSIGNED_AGENTS:
      return {
        ...state,
        assignedFetchLoading: true,
        assignedFetchError: null,
        assignedData: [],
        assignedPage: 0,
        assignedPages: 0,
      };
    case AGENCY_FETCH_ASSIGNED_AGENTS_SUCCESS:
      return {
        ...state,
        assignedFetchLoading: false,
        assignedFetchError: null,
        assignedData: action.payload.data,
        assignedPages: action.payload.lastPage,
        assignedPage: action.payload.page,
      };
    case AGENCY_FETCH_ASSIGNED_AGENTS_ERROR:
      return {
        ...state,
        assignedFetchLoading: false,
        assignedFetchError: action.payload,
      };
    case AGENCY_GET_PROFILE:
      return {
        ...state,
        myProfileLoading: true,
        myProfileError: false,
        myProfile: null,
      };
    case AGENCY_GET_PROFILE_SUCCESS:
      return {
        ...state,
        myProfileLoading: false,
        myProfileError: false,
        myProfile: action.payload,
      };
    case AGENCY_GET_PROFILE_ERROR:
      return {
        ...state,
        myProfileLoading: false,
        myProfileError: action.payload,
      };
    case AGENCY_EDIT_PROFILE:
      return {
        ...state,
        editLoading: true,
        editSuccess: false,
        editError: null,
      };
    case AGENCY_EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        editLoading: false,
        editError: false,
        editSuccess: true,
      };
    case AGENCY_EDIT_PROFILE_ERROR:
      return {
        ...state,
        editLoading: false,
        editSuccess: false,
        editError: action.payload,
      };

    default:
      return state;
  }
};
