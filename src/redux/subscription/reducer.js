import {
  AGENCY_SUBSCRIPTION_FETCH_ID,
  AGENCY_SUBSCRIPTION_FETCH_ID_SUCCESS,
  AGENCY_SUBSCRIPTION_FETCH_ID_ERROR,
  AGENCY_SUBSCRIPTION_FETCH_LIST,
  AGENCY_SUBSCRIPTION_FETCH_LIST_SUCCESS,
  AGENCY_SUBSCRIPTION_FETCH_LIST_ERROR,
  AGENCY_SUBSCRIPTION_SAVE,
  AGENCY_SUBSCRIPTION_SAVE_SUCCESS,
  AGENCY_SUBSCRIPTION_SAVE_ERROR,
  AGENCY_SUBSCRIPTION_EDIT,
  AGENCY_SUBSCRIPTION_EDIT_SUCCESS,
  AGENCY_SUBSCRIPTION_EDIT_RESET,
  AGENCY_SUBSCRIPTION_EDIT_ERROR,
  AGENCY_SUBSCRIPTION_ENABLE,
  AGENCY_SUBSCRIPTION_DISABLE,
  AGENCY_SUBSCRIPTION_ABLE_SUCCESS,
  AGENCY_SUBSCRIPTION_ABLE_RESET,
  AGENCY_SUBSCRIPTION_ASSIGN,
  AGENCY_SUBSCRIPTION_ASSIGN_SUCCESS,
  AGENCY_SUBSCRIPTION_ASSIGN_ERROR,
  AGENT_SUBSCRIPTION_SAVE,
  AGENT_SUBSCRIPTION_SAVE_SUCCESS,
  AGENT_SUBSCRIPTION_SAVE_ERROR,
  AGENT_SUBSCRIPTION_SAVE_RESET,
  AGENT_FETCH_SUBSCRIPTION,
  AGENT_FETCH_SUBSCRIPTION_SUCCESS,
  AGENT_SUBSCRIPTION_ENABLE,
  AGENT_SUBSCRIPTION_ABLE_RESET,
  AGENT_SUBSCRIPTION_ABLE_SUCCESS,
  AGENT_SUBSCRIPTION_DISABLE,
  AGENT_SUBSCRIPTION_FETCH_ID,
  AGENT_SUBSCRIPTION_FETCH_ID_SUCCESS,
  AGENT_SUBSCRIPTION_PUT,
  AGENT_SUBSCRIPTION_PUT_SUCCESS,
  AGENT_SUBSCRIPTION_PUT_RESET,
  AGENT_SUBSCRIPTION_PUT_ERROR,
  ACTUAL_SUBSCRIPTION,
  ACTUAL_SUBSCRIPTION_ERROR,
  ACTUAL_SUBSCRIPTION_SUCCESS,
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

  subscriptionData: [],
  fetchSubscriptionError: null,
  fetchSubscriptionLoading: false,

  saveError: null,
  saveSuccess: false,
  saveLoading: false,
  saveAgentSubscriptionSuccess: false,

  assignError: null,
  assignSuccess: false,
  assignLoading: false,

  approvalLoading: false,
  approvalSuccess: false,
  approvalError: null,

  ableSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTUAL_SUBSCRIPTION:
      return {
        ...state,
        subscriptionData: [],
        fetchSubscriptionError: null,
        fetchSubscriptionLoading: true,
        page: 0,
        pages: 0,
      };
    case ACTUAL_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        fetchSubscriptionLoading: false,
        fetchSubscriptionError: null,
        subscriptionData: action.payload.data,
        pages: action.payload.lastPage,
        page: action.payload.page,
      };
    case ACTUAL_SUBSCRIPTION_ERROR:
      return {
        ...state,
        fetchSubscriptionLoading: false,
        fetchSubscriptionError: action.payload,
      };

    case AGENCY_SUBSCRIPTION_FETCH_ID:
      return {
        ...state,
        fetchIdLoading: true,
        fetchIdError: null,
        dataId: null,
      };
    case AGENCY_SUBSCRIPTION_FETCH_ID_SUCCESS:
      return {
        ...state,
        fetchIdLoading: false,
        fetchIdError: null,
        dataId: action.payload,
      };
    case AGENCY_SUBSCRIPTION_FETCH_ID_ERROR:
      return { ...state, fetchIdLoading: false, fetchIdError: action.payload };

    case AGENCY_SUBSCRIPTION_FETCH_LIST:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
        data: [],
        page: 0,
        pages: 0,
      };
    case AGENCY_SUBSCRIPTION_FETCH_LIST_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        data: action.payload.data,
        pages: action.payload.lastPage,
        page: action.payload.page,
      };
    case AGENCY_SUBSCRIPTION_FETCH_LIST_ERROR:
      return { ...state, fetchLoading: false, fetchError: action.payload };

    case AGENCY_SUBSCRIPTION_SAVE:
      return {
        ...state,
        saveLoading: true,
        saveError: null,
        saveSuccess: false,
      };
    case AGENCY_SUBSCRIPTION_SAVE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
        saveError: null,
        saveSuccess: true,
      };
    case AGENCY_SUBSCRIPTION_SAVE_ERROR:
      return {
        ...state,
        saveLoading: false,
        saveError: action.payload.error,
        saveSuccess: false,
      };
    case AGENCY_SUBSCRIPTION_EDIT:
      console.log('chegou no reducer');
      return {
        ...state,
        saveLoading: true,
        saveError: null,
        saveSuccess: false,
      };
    case AGENCY_SUBSCRIPTION_EDIT_SUCCESS:
      return {
        ...state,
        saveLoading: false,
        saveError: null,
        saveSuccess: true,
      };
    case AGENCY_SUBSCRIPTION_EDIT_RESET:
      return {
        ...state,
        saveSuccess: false,
        saveLoading: false,
      };
    case AGENCY_SUBSCRIPTION_EDIT_ERROR:
      return {
        ...state,
        saveLoading: false,
        saveError: action.payload.error,
        saveSuccess: false,
      };

    case AGENCY_SUBSCRIPTION_ENABLE:
      return {
        ...state,
        userId: action.payload.userId,
      };
    case AGENCY_SUBSCRIPTION_DISABLE:
      return {
        ...state,
        userId: action.payload.userId,
      };

    case AGENCY_SUBSCRIPTION_ABLE_SUCCESS:
      return {
        ...state,
        ableSuccess: true,
      };
    case AGENCY_SUBSCRIPTION_ABLE_RESET:
      return {
        ...state,
        ableSuccess: false,
      };
    case AGENCY_SUBSCRIPTION_ASSIGN:
      return {
        ...state,
        assignLoading: true,
        assignError: null,
        assignSuccess: false,
      };
    case AGENCY_SUBSCRIPTION_ASSIGN_SUCCESS:
      return {
        ...state,
        assignLoading: false,
        assignError: null,
        assignSuccess: true,
      };
    case AGENCY_SUBSCRIPTION_ASSIGN_ERROR:
      return {
        ...state,
        assignLoading: false,
        assignError: action.payload.error,
        assignSuccess: false,
      };
    case AGENT_SUBSCRIPTION_SAVE:
      return {
        ...state,
        saveError: null,
        saveSuccess: false,
        saveLoading: true,
      };
    case AGENT_SUBSCRIPTION_SAVE_SUCCESS:
      return {
        ...state,
        saveError: null,
        saveSuccess: true,
        saveLoading: false,
      };
    case AGENT_SUBSCRIPTION_SAVE_ERROR:
      return {
        ...state,
        saveError: action.payload.error,
        saveSuccess: false,
        saveLoading: false,
      };
    case AGENT_SUBSCRIPTION_SAVE_RESET:
      return {
        ...state,
        saveSuccess: false,
        saveLoading: false,
      };
    case AGENT_FETCH_SUBSCRIPTION:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
        data: [],
        page: 0,
        pages: 0,
      };
    case AGENT_FETCH_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        data: action.payload.data,
        pages: action.payload.lastPage,
        page: action.payload.page,
      };
    case AGENT_SUBSCRIPTION_ENABLE:
      return {
        ...state,
        ableSuccess: false,
      };
    case AGENT_SUBSCRIPTION_ABLE_SUCCESS:
      return {
        ...state,
        ableSuccess: true,
      };
    case AGENT_SUBSCRIPTION_ABLE_RESET:
      return {
        ...state,
        ableSuccess: false,
      };
    case AGENT_SUBSCRIPTION_DISABLE:
      return {
        ...state,
        ableSuccess: false,
      };
    case AGENT_SUBSCRIPTION_FETCH_ID:
      return {
        ...state,
        fetchIdLoading: true,
        fetchIdError: null,
        dataId: null,
      };
    case AGENT_SUBSCRIPTION_FETCH_ID_SUCCESS:
      return {
        ...state,
        fetchIdLoading: false,
        fetchIdError: null,
        dataId: action.payload,
      };
    case AGENT_SUBSCRIPTION_PUT:
      return {
        ...state,
        saveError: null,
        saveSuccess: false,
        saveLoading: true,
      };
    case AGENT_SUBSCRIPTION_PUT_SUCCESS:
      return {
        ...state,
        saveError: null,
        saveSuccess: true,
        saveLoading: false,
      };
    case AGENT_SUBSCRIPTION_PUT_RESET:
      return {
        ...state,
        saveSuccess: false,
        saveLoading: false,
      };
    case AGENT_SUBSCRIPTION_PUT_ERROR:
      return {
        ...state,
        saveError: action.payload.error,
        saveSuccess: false,
        saveLoading: false,
      };
    default:
      return state;
  }
};
