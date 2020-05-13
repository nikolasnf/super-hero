import {
  LOGIN_USER_TOKEN,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  CHECK_TOKEN,
  CHECK_TOKEN_SUCCESS,
} from '../actions';

export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history },
});
export const loginUserToken = history => ({
  type: LOGIN_USER_TOKEN,
  payload: { history },
});
export const loginUserSuccess = data => ({
  type: LOGIN_USER_SUCCESS,
  payload: data,
});
export const loginUserError = message => ({
  type: LOGIN_USER_ERROR,
  payload: { message },
});
export const forgotPassword = (forgotUserMail, history) => ({
  type: FORGOT_PASSWORD,
  payload: { forgotUserMail, history },
});
export const forgotPasswordSuccess = forgotUserMail => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: forgotUserMail,
});
export const forgotPasswordError = message => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: { message },
});

export const resetPassword = ({ resetPasswordCode, newPassword, history }) => ({
  type: RESET_PASSWORD,
  payload: { resetPasswordCode, newPassword, history },
});
export const resetPasswordSuccess = newPassword => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: newPassword,
});
export const resetPasswordError = message => ({
  type: RESET_PASSWORD_ERROR,
  payload: { message },
});

export const registerUser = (user, history) => ({
  type: REGISTER_USER,
  payload: { user, history },
});
export const registerUserSuccess = user => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});
export const registerUserError = message => ({
  type: REGISTER_USER_ERROR,
  payload: { message },
});

export const logoutUser = history => ({
  type: LOGOUT_USER,
  payload: { history },
});

export const checkToken = ({ resetPasswordCode, forgotUserMail, history }) => ({
  type: CHECK_TOKEN,
  payload: { resetPasswordCode, forgotUserMail, history },
});

export const checkTokenSuccess = inputResetPassword => ({
  type: CHECK_TOKEN_SUCCESS,
  payload: { inputResetPassword },
});