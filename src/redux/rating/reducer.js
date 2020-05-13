import {
  USER_RATING_FETCH_ID,
  USER_RATING_FETCH_ID_SUCCESS,
  USER_RATING_FETCH_ID_ERROR,
  USER_RATING_FETCH_LIST,
  USER_RATING_FETCH_LIST_SUCCESS,
  USER_RATING_FETCH_LIST_ERROR,
  RATING_READ,
  RATING_READ_SUCCESS,
  RATING_READ_ERROR,
  AGENCY_RATING_FETCH_ID,
  AGENCY_RATING_FETCH_ID_SUCCESS,
  AGENCY_RATING_FETCH_ID_ERROR,
  AGENCY_RATING_FETCH_LIST,
  AGENCY_RATING_FETCH_LIST_SUCCESS,
  AGENCY_RATING_FETCH_LIST_ERROR,
  AGENT_RATING_FETCH_ID,
  AGENT_RATING_FETCH_ID_SUCCESS,
  AGENT_RATING_FETCH_ID_ERROR,
  AGENT_RATING_FETCH_LIST,
  AGENT_RATING_FETCH_LIST_SUCCESS,
  AGENT_RATING_FETCH_LIST_ERROR,
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

  readSucess: false,

  cordiality: 'Corretor cordial',
  punctuality: 'Corretor pontual',
  knowledge: 'Não conhece bem',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // USERS

    case USER_RATING_FETCH_ID:
      return {
        ...state,
        fetchIdLoading: true,
        fetchIdError: null,
        dataId: null,
      };
    case USER_RATING_FETCH_ID_SUCCESS:
      return {
        ...state,
        fetchIdLoading: false,
        fetchIdError: null,
        dataId: action.payload,
      };
    case USER_RATING_FETCH_ID_ERROR:
      return { ...state, fetchIdLoading: false, fetchIdError: action.payload };

    case USER_RATING_FETCH_LIST:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
        data: [],
        page: 0,
        pages: 0,
      };
    case USER_RATING_FETCH_LIST_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        data: action.payload.data,
        pages: action.payload.lastPage,
        page: action.payload.page,
      };
    case USER_RATING_FETCH_LIST_ERROR:
      return { ...state, fetchLoading: false, fetchError: action.payload };

    case RATING_READ:
      return {
        ...state,
        readSucess: false,
      };
    case RATING_READ_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data.map(e => {
            const { id, readBool } = action.payload;

            const ratingRow = id.find(find => find === e.id);

            if (ratingRow) {
              e.read = readBool ? 1 : 0;
            }
            console.log(e);
            return e;
          }),
        ],
        readSucess: true,
      };

    case RATING_READ_ERROR:
      return {
        ...state,
        readSucess: false,
      };

    // AGENCIES

    case AGENCY_RATING_FETCH_ID:
      return {
        ...state,
        fetchIdLoading: true,
        fetchIdError: null,
        dataId: null,
      };
    case AGENCY_RATING_FETCH_ID_SUCCESS:
      return {
        ...state,
        fetchIdLoading: false,
        fetchIdError: null,
        dataId: action.payload,
      };
    case AGENCY_RATING_FETCH_ID_ERROR:
      return { ...state, fetchIdLoading: false, fetchIdError: action.payload };

    case AGENCY_RATING_FETCH_LIST:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
        data: [],
        page: 0,
        pages: 0,
      };
    case AGENCY_RATING_FETCH_LIST_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        data: action.payload.data,
        pages: action.payload.lastPage,
        page: action.payload.page,
      };
    case AGENCY_RATING_FETCH_LIST_ERROR:
      return { ...state, fetchLoading: false, fetchError: action.payload };

    // AGENTS

    case AGENT_RATING_FETCH_ID:
      return {
        ...state,
        fetchIdLoading: true,
        fetchIdError: null,
        dataId: null,
      };
    case AGENT_RATING_FETCH_ID_SUCCESS:
      return {
        ...state,
        fetchIdLoading: false,
        fetchIdError: null,
        dataId: action.payload,
      };
    case AGENT_RATING_FETCH_ID_ERROR:
      return { ...state, fetchIdLoading: false, fetchIdError: action.payload };

    case AGENT_RATING_FETCH_LIST:
      return {
        ...state,
        fetchLoading: true,
        fetchError: null,
        data: [],
        page: 0,
        pages: 0,
      };
    case AGENT_RATING_FETCH_LIST_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchError: null,
        data: action.payload.data,
        pages: action.payload.lastPage,
        page: action.payload.page,
      };
    case AGENT_RATING_FETCH_LIST_ERROR:
      return { ...state, fetchLoading: false, fetchError: action.payload };

    default:
      return state;
  }
};
