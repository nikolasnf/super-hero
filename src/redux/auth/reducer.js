import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  LOGIN_USER_TOKEN,
  CHECK_TOKEN,
  CHECK_TOKEN_SUCCESS,
} from '../actions';

const INIT_STATE = {
  user: null,
  token: null,
  roles: [],
  approved: false,
  authenticated: false,
  forgotUserMail: null,
  newPassword: '',
  resetPasswordCode: '',
  refreshAttempt: false,
  loading: false,
  error: '',
  inputReset: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_TOKEN:
      return { ...state, loading: true, error: '', refreshAttempt: true };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: action.payload.roles,
        approved: action.payload.approved,
        approved_at: action.payload.approved_at,
        reproved_message: action.payload.reproved_message,
        error: '',
        authenticated: true,
        token: action.payload.token,
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: '',
        authenticated: false,
        error: action.payload.message,
      };
    case FORGOT_PASSWORD:
      return { ...state, loading: true, error: '' };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotUserMail: action.payload,
        error: '',
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        forgotUserMail: '',
        error: action.payload.message,
      };
    case RESET_PASSWORD:
      return { ...state, loading: true, error: '' };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        newPassword: action.payload,
        resetPasswordCode: '',
        error: '',
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        newPassword: '',
        resetPasswordCode: '',
        error: action.payload.message,
      };
    case REGISTER_USER:
      return { ...state, loading: true, error: '' };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload.uid, error: '' };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: '',
        error: action.payload.message,
      };
    case LOGOUT_USER:
      return { ...state, user: null, error: '', authenticated: false };
    case CHECK_TOKEN:
      return {
        ...state,
        resetPasswordCode: action.payload.resetPasswordCode,
        message: '',
      };
    case CHECK_TOKEN_SUCCESS:
      return {
        ...state,
        inputResetPassword: action.payload.inputResetPassword,
      };
    default:
      return { ...state };
  }
};
