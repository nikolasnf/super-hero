import {
  ISSUES_FETCH,
  ISSUES_FETCH_SUCCESS,
  ISSUES_FETCH_ERROR,
  ISSUES_FETCH_ID,
  ISSUES_FETCH_ID_SUCCESS,
  ISSUES_FETCH_ID_ERROR,
  ISSUE_READ,
  ISSUE_READ_SUCCESS,
  ISSUE_READ_ERROR,
} from '../actions';

const INIT_STATE = {
  data: null,
  fetchLoading: false,
  fetchError: null,
  page: null,
  pages: null,

  readSucess: false,

  dataId: null,
  fetchIdError: null,
  fetchIdLoading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ISSUES_FETCH:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
        data: null,
        pages: null,
        page: null,
      };
    case ISSUES_FETCH_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        data: action.payload.data.data,
        pages: action.payload.lastPage,
        page: action.payload.page,
      };
    case ISSUES_FETCH_ERROR:
      return {
        ...state,
        fetchError: action.payload,
      };
    case ISSUES_FETCH_ID:
      return {
        ...state,
        fetchIdError: null,
        fetchIdLoading: true,
        dataId: null,
      };
    case ISSUES_FETCH_ID_SUCCESS:
      return {
        ...state,
        fetchIdError: null,
        fetchIdLoading: false,
        dataId: action.payload,
      };
    case ISSUES_FETCH_ID_ERROR:
      return {
        ...state,
        fetchIdError: action.payload,
      };
    case ISSUE_READ:
      return {
        ...state,
        readSucess: false,
      };
    case ISSUE_READ_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data.map(e => {
            const { id, readBool } = action.payload;
            const issueRow = id.find(find => find === e.id);
            if (issueRow) {
              e.read = readBool ? 1 : 0;
            }
            return e;
          }),
        ],
        readSucess: true,
      };
    case ISSUE_READ_ERROR:
      return {
        ...state,
        readSucess: false,
      };
    default:
      return state;
  }
};
