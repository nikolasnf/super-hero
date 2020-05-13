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

const INIT_STATE = {
  page: 0,
  pages: 0,
  loading: false,
  data: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CRECI_LIST:
      return { ...state, loading: true };
    case CRECI_LIST_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case CRECI_LIST_ERROR:
      return { ...state, loading: false };
    case CRECI_BY_ID:
      return { ...state, loading: true };
    case CRECI_BY_ID_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case CRECI_BY_ID_ERROR:
      return { ...state, loading: false };
    case CRECI_APPROVE:
      return { ...state, loading: true };
    case CRECI_APPROVE_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case CRECI_APPROVE_ERROR:
      return { ...state, loading: false };
    case CRECI_REPROVE:
      return { ...state, loading: true };
    case CRECI_REPROVE_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case CRECI_REPROVE_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
};
