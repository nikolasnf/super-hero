import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { auth } from '../../helpers/Firebase';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  LOGIN_USER_TOKEN,
  CHECK_TOKEN,
} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  checkTokenSuccess,
} from './actions';
import { login, forgotPasswordReq, checkTokenReq } from './api';
import { setNotifications, resetNotifications } from '../menu/actions';
import { fetchConstants } from '../ad/actions';

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginAsync = async params => await login(params);

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const { data, status } = yield call(loginAsync, {
      email,
      password,
    });

    if (data.token) {
      sessionStorage.setItem('@access_token', data.token);
      localStorage.setItem('@refresh_token', data.refreshToken);
      yield put(
        loginUserSuccess({
          roles: data.roles,
          token: data.token,
          approved: data.approved,
          approved_at: data.approved_at,
          reproved_message: data.reproved_message,
        })
      );
      yield put(fetchConstants());
      history.push('/');
    } else {
      yield put(loginUserError(data[0].message));
    }
  } catch (error) {
    sessionStorage.removeItem('@access_token');
    localStorage.removeItem('@refresh_token');

    if (error.response && error.response.data) {
      if (error.response.data.code === 'E_INVALID_JWT_REFRESH_TOKEN') {
        return yield put(loginUserError('Realize o Login Novamente'));
      }
      yield put(
        loginUserError(
          'Erro no login. Verificque suas credenciais ou tente mais tarde'
        )
      );
    } else {
      yield put(loginUserError('Ocorreu um erro interno'));
    }
  }
}

export function* watchLoginUserToken() {
  yield takeEvery(LOGIN_USER_TOKEN, loginWithToken);
}

function* loginWithToken({ payload }) {
  const token = localStorage.getItem('@refresh_token');

  try {
    const { data } = yield call(loginAsync, { refresh_token: token });
    if (data.token) {
      sessionStorage.setItem('@access_token', data.token);
      localStorage.setItem('@refresh_token', data.refreshToken);

      yield put(
        loginUserSuccess({
          roles: data.roles,
          token: data.token,
          approved: data.approved,
          approved_at: data.approved_at,
          reproved_message: data.reproved_message,
        })
      );
      yield put(fetchConstants());
    } else {
      yield put(loginUserError(data[0].message));
    }
  } catch (error) {
    sessionStorage.removeItem('@access_token');
    localStorage.removeItem('@refresh_token');
    console.log(error);
    if (error.response && error.response.data) {
      if (error.response.data.code === 'E_INVALID_JWT_REFRESH_TOKEN') {
        return yield put(loginUserError('Realize o Login Novamente'));
      }
      yield put(
        loginUserError(
          'Erro no login. Verificque suas credenciais ou tente mais tarde'
        )
      );
    } else {
      console.log(error);
      yield put(loginUserError('Ocorreu um Erro'));
    }
  }
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) =>
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then(authUser => authUser)
    .catch(error => error);

function* registerWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      email,
      password
    );
    if (!registerUser.message) {
      localStorage.setItem('user_id', registerUser.user.uid);
      yield put(registerUserSuccess(registerUser));
      history.push('/');
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async history => {
  await auth
    .signOut()
    .then(authUser => authUser)
    .catch(error => error);
  history.push('/');
};

function* logout({ payload }) {
  const { history } = payload;
  try {
    yield call(logoutAsync, history);
    yield put(resetNotifications());
    localStorage.removeItem('@refresh_token');
    sessionStorage.removeItem('@access_token');
  } catch (error) {}
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async email => await forgotPasswordReq(email);

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, { email });
    console.log(forgotPasswordStatus);
    if (forgotPasswordStatus) {
      yield put(forgotPasswordSuccess(email));
    } else {
      yield put(forgotPasswordError('E-mail não encontrado'));
    }
  } catch (error) {
    yield put(forgotPasswordError('E-mail não encontrado'));
  }
}

export function* watchCheckToken() {
  yield takeEvery(CHECK_TOKEN, checkToken);
}

const checkTokenAsync = async params => await checkTokenReq(params);

function* checkToken({ payload }) {
  const { forgotUserMail, resetPasswordCode } = payload;
  const email = forgotUserMail;
  const token = resetPasswordCode;
  try {
    const { data } = yield call(checkTokenAsync, { email, token });
    // console.log(data)
    if (data.status === 'success') {
      yield put(checkTokenSuccess(true));
    } else {
      yield put(checkTokenSuccess(false));
    }
  } catch (error) {
    yield put(checkTokenSuccess(false));
  }
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then(user => user)
    .catch(error => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUserToken),
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchCheckToken),
  ]);
}
