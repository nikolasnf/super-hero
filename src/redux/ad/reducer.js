import {
  AD_FETCH_CONSTANTS,
  AD_FETCH_CONSTANTS_SUCCESS,
  AD_FETCH_CONSTANTS_ERROR,
  AD_FETCH_LIST,
  AD_FETCH_LIST_SUCCESS,
  AD_FETCH_LIST_ERROR,
  AD_FETCH_ID,
  AD_FETCH_ID_SUCCESS,
  AD_FETCH_ID_ERROR,
  AD_SAVE,
  AD_SAVE_SUCCESS,
  AD_SAVE_ERROR,
  AD_ENABLE,
  AD_DISABLE,
  AD_DISABLE_SUCCESS,
  AD_DISABLE_ERROR,
  AD_FETCH_CEP,
  AD_FETCH_CEP_SUCCESS,
  AD_FETCH_CEP_ERROR,
  AD_ENABLE_SUCCESS,
  AD_ENABLE_ERROR,
  AD_SOLD_SUCCESS,
  AD_SOLD_ERROR,
  AD_SOLD,
  AD_EDIT,
  AD_EDIT_SUCCESS,
  AD_EDIT_ERROR,
  AD_ACCEPT_REQUEST,
  AD_ACCEPT_REQUEST_ERROR,
  AD_ACCEPT_REQUEST_SUCCESS,
  AD_REQUEST_LIST,
  AD_REQUEST_LIST_ERROR,
  AD_REQUEST_LIST_SUCCESS,
  AD_REMOVE_REQUEST,
  AD_REMOVE_REQUEST_ERROR,
  AD_REMOVE_REQUEST_SUCCESS,
  AD_REQUEST_ID,
  AD_REQUEST_ID_ERROR,
  AD_REQUEST_ID_SUCCESS,
  AD_ACCEPT_SOLD_REQUEST,
  AD_ACCEPT_SOLD_REQUEST_ERROR,
  AD_ACCEPT_SOLD_REQUEST_SUCCESS,
  AD_REMOVE_SOLD_REQUEST,
  AD_REMOVE_SOLD_REQUEST_ERROR,
  AD_REMOVE_SOLD_REQUEST_SUCCESS,
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

  saveError: null,
  saveSuccess: false,
  saveLoading: false,
  features: {},
  building_features: {},

  cepLoading: false,
  cep: [],

  constants: null,
  constantsError: null,
  constantsLoading: false,

  adRequestError: null,
  adRequestSuccess: false,
  adRequestLoading: false,
  adRequestData: [],

  adRequestIdError: null,
  adRequestIdSuccess: false,
  adRequestIdLoading: false,
  adRequestIdData: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case AD_FETCH_LIST:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
        data: [],
        page: 0,
        pages: 0,
      };
    case AD_FETCH_LIST_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        data: action.payload.data,
        pages: action.payload.lastPage,
        page: action.payload.page,
      };
    case AD_FETCH_LIST_ERROR:
      return { ...state, fetchLoading: false, fetchError: action.payload };

    case AD_FETCH_ID:
      return {
        ...state,
        fetchIdLoading: true,
        fetchIdError: null,
        dataId: null,
      };
    case AD_FETCH_ID_SUCCESS:
      return {
        ...state,
        fetchIdLoading: false,
        fetchIdError: null,
        data: action.payload,
      };
    case AD_FETCH_ID_ERROR:
      return { ...state, fetchIdLoading: false, fetchIdError: action.payload };

    case AD_SAVE:
      return {
        ...state,
        saveLoading: true,
        saveError: null,
        saveSuccess: false,
      };
    case AD_SAVE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
        saveError: null,
        saveSuccess: true,
      };
    case AD_SAVE_ERROR:
      return {
        ...state,
        saveLoading: false,
        saveError: action.payload.error,
        saveSuccess: false,
      };
    case AD_FETCH_CONSTANTS:
      return {
        ...state,
        constants: null,
        constantsLoading: true,
        constantsError: null,
      };
    case AD_FETCH_CONSTANTS_SUCCESS:
      return {
        ...state,
        features: action.payload.features,
        building_features: action.payload.building_features,
        constants: action.payload,
        constantsLoading: true,
        constantsError: null,
      };
    case AD_FETCH_CONSTANTS_ERROR:
      return {
        ...state,
        constantsLoading: true,
        constantsError: action.payload.error,
      };
    case AD_FETCH_CEP:
      return { ...state, cepLoading: true };
    case AD_FETCH_CEP_SUCCESS:
      return { ...state, cepLoading: false, cep: action.payload };
    case AD_FETCH_CEP_ERROR:
      return { ...state, cepLoading: false };
    case AD_ENABLE:
      return { ...state, fetchLoading: true };
    case AD_ENABLE_SUCCESS:
      return { ...state, ...action.payload, fetchLoading: false };
    case AD_ENABLE_ERROR:
      return { ...state, fetchLoading: false };
    case AD_DISABLE:
      return { ...state, fetchLoading: true };
    case AD_DISABLE_SUCCESS:
      return { ...state, ...action.payload, fetchLoading: false };
    case AD_DISABLE_ERROR:
      return { ...state, fetchLoading: false };
    case AD_SOLD:
      return { ...state, fetchLoading: true };
    case AD_SOLD_SUCCESS:
      return { ...state, ...action.payload, fetchLoading: false };
    case AD_SOLD_ERROR:
      return { ...state, fetchLoading: false };
    case AD_EDIT:
      return { ...state, fetchLoading: true };
    case AD_EDIT_SUCCESS:
      return { ...state, ...action.payload, fetchLoading: false };
    case AD_EDIT_ERROR:
      return { ...state, fetchLoading: false };

    case AD_REQUEST_LIST:
      return {
        ...state,
        adRequestLoading: true,
        adRequestError: null,
        adRequestData: [],
      };
    case AD_REQUEST_LIST_SUCCESS:
      return {
        ...state,
        adRequestLoading: false,
        adRequestError: null,
        adRequestData: action.payload.data,
      };
    case AD_REQUEST_LIST_ERROR:
      return {
        ...state,
        adRequestLoading: false,
        adRequestError: action.payload,
      };
    case AD_ACCEPT_REQUEST:
      return {
        ...state,
        adRequestLoading: true,
        adRequestError: null,
        adRequestData: false,
      };
    case AD_ACCEPT_REQUEST_SUCCESS:
      return {
        ...state,
        adRequestLoading: false,
        adRequestError: null,
        adRequestSuccess: true,
      };
    case AD_ACCEPT_REQUEST_ERROR:
      return {
        ...state,
        adRequestLoading: false,
        adRequestError: action.payload.error,
        adRequestSuccess: false,
      };
    case AD_REMOVE_REQUEST:
      return {
        ...state,
        adRequestLoading: true,
        adRequestError: null,
        adRequestData: false,
      };
    case AD_REMOVE_REQUEST_SUCCESS:
      return {
        ...state,
        adRequestLoading: false,
        adRequestError: null,
        adRequestSuccess: true,
      };
    case AD_REMOVE_REQUEST_ERROR:
      return {
        ...state,
        adRequestLoading: false,
        adRequestError: action.payload.error,
        adRequestSuccess: false,
      };
    case AD_REQUEST_ID:
      return {
        ...state,
        adRequestIdLoading: true,
        adRequestIdError: null,
        adRequestIdData: [],
      };
    case AD_REQUEST_ID_SUCCESS:
      return {
        ...state,
        adRequestIdLoading: false,
        adRequestIdError: null,
        adRequestIdData: action.payload.data,
      };
    case AD_REQUEST_ID_ERROR:
      return {
        ...state,
        adRequestIdLoading: false,
        adRequestIdError: action.payload,
      };
    case AD_ACCEPT_SOLD_REQUEST:
      return {
        ...state,
        adRequestLoading: true,
        adRequestError: null,
        adRequestData: false,
      };
    case AD_ACCEPT_SOLD_REQUEST_SUCCESS:
      return {
        ...state,
        adRequestLoading: false,
        adRequestError: null,
        adRequestSuccess: true,
      };
    case AD_ACCEPT_SOLD_REQUEST_ERROR:
      return {
        ...state,
        adRequestLoading: false,
        adRequestError: action.payload.error,
        adRequestSuccess: false,
      };
    case AD_REMOVE_SOLD_REQUEST:
      return {
        ...state,
        adRequestLoading: true,
        adRequestError: null,
        adRequestData: false,
      };
    case AD_REMOVE_SOLD_REQUEST_SUCCESS:
      return {
        ...state,
        adRequestLoading: false,
        adRequestError: null,
        adRequestSuccess: true,
      };
    case AD_REMOVE_SOLD_REQUEST_ERROR:
      return {
        ...state,
        adRequestLoading: false,
        adRequestError: action.payload.error,
        adRequestSuccess: false,
      };
    default:
      return state;
  }
};
