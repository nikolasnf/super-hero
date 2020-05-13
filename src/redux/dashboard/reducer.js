import {
  DASHBOARD_LIST,
  DASHBOARD_LIST_SUCCESS,
  DASHBOARD_LIST_ERROR,
  IMOB_DASHBOARD_GET_AGENTS,
  IMOB_DASHBOARD_GET_AGENTS_ERROR,
  IMOB_DASHBOARD_GET_AGENTS_SUCCESS,
} from '../actions';

const INIT_STATE = {
  page: 0,
  pages: 0,
  loading: false,
  data: null,
  agents: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case DASHBOARD_LIST:
      return { ...state, loading: true };
    case DASHBOARD_LIST_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case DASHBOARD_LIST_ERROR:
      return { ...state, loading: false };
    case IMOB_DASHBOARD_GET_AGENTS:
      return { ...state, loading: true };
    case IMOB_DASHBOARD_GET_AGENTS_SUCCESS:
      return { ...state, agents: action.payload, loading: false };
    case IMOB_DASHBOARD_GET_AGENTS_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
};
