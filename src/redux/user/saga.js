import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  USER_SAVE,
  USER_FETCH_LIST,
  USER_FETCH_ID,
  USER_FETCH_AD_LIST,
  USER_FETCH_AD_ID,
  USER_DISABLE_AD,
  USERS_DISABLE,
  USERS_ENABLE,
  USER_ENABLE_AD,
} from '../actions';
import {
  getUsers,
  createUser,
  getUser,
  getAds,
  getAd,
  deleteAds,
  disableUser,
  activateUser,
} from './api';
import {
  fetchUsersSuccess,
  fetchUsersError,
  saveUserSuccess,
  saveUserError,
  fetchUserIdError,
  fetchUserIdSuccess,
  fetchAdUsersSuccess,
  fetchAdUsersError,
  fetchAdUserIdSuccess,
  fetchAdUserIdError,
  ableUsersSuccess,
  ableUsersReset,
} from './actions';
import { NotificationManager } from '../../components/common/react-notifications';
import { activateAds } from '../agency/api';

export function* watchSaveUser() {
  yield takeLatest(USER_SAVE, saveUser);
}

export function* watchFetchUser() {
  yield takeLatest(USER_FETCH_LIST, fetchUsers);
}

export function* watchFetchUserId() {
  yield takeLatest(USER_FETCH_ID, fetchUserId);
}

export function* watchFetchAdUser() {
  yield takeLatest(USER_FETCH_AD_LIST, fetchAdUsers);
}

export function* watchFetchUserAdId() {
  yield takeLatest(USER_FETCH_AD_ID, fetchUserAdId);
}

const fetchUsersAsync = async filters => await getUsers(filters);

export function* fetchUsers({ payload }) {
  const { filters } = payload;

  try {
    const { data, status } = yield call(fetchUsersAsync, filters);
    if (status === 200) {
      const filteredData = data.data.map(item => ({
        ...item,
        ...item.profile.agency,
        ...item.profile.address,
        ...item.profile,
      }));
      yield put(fetchUsersSuccess({ ...data, data: filteredData }));
    }
  } catch (err) {
    yield put(fetchUsersError('Erro ao carregar Imobiliárias'));
  }
}

const fetchUserIdAsync = async id => await getUser(id);

export function* fetchUserId({ payload }) {
  const { id } = payload;

  try {
    const { data, status } = yield call(fetchUserIdAsync, id);
    if (status === 200) {
      yield put(
        fetchUserIdSuccess({
          ...data,
          ...data.profile.advertiser,
          ...data.profile.address,
          ...data.profile,
        })
      );
      console.log(id);
    }
  } catch (err) {
    yield put(fetchUserIdError('Erro ao carregar Usuário'));
  }
}

const saveUsersAsync = async params => await createUser(params);

export function* saveUser(payload) {
  const { params } = payload;

  try {
    const { data, status } = yield call(saveUsersAsync, params);
    if (status === 200) {
      yield put(saveUserSuccess(data));
    }
  } catch (err) {
    yield put(saveUserError('Erro ao salvar Imobiliária'));
  }
}

const fetchAdUsersAsync = async filters =>
  await getAds({ ...filters, profile_type: 'Advertiser' });

export function* fetchAdUsers({ payload }) {
  const { filters } = payload;
  try {
    const { data, status } = yield call(fetchAdUsersAsync, filters);
    if (status === 200) {
      yield put(
        fetchAdUsersSuccess({
          data: data.data,
          lastPage: data.lastPage,
          page: data.page,
        })
      );
    }
  } catch (err) {
    yield put(fetchAdUsersError('Erro ao carregar Anúncios'));
  }
}

const fetchUserAdIdAsync = async id => await getAd(id);

export function* fetchUserAdId({ payload }) {
  const { id } = payload;
  try {
    const { data, status } = yield call(fetchUserAdIdAsync, id);
    if (status === 200) {
      yield put(
        fetchAdUserIdSuccess({
          ...data,
        })
      );
    }
  } catch (err) {
    yield put(fetchAdUserIdError('Erro ao carregar Anúncio'));
  }
}

export function* watchDisableUserAd() {
  yield takeEvery(USER_DISABLE_AD, disableUserAd);
}

const disableUserAdAsync = async userId => await deleteAds(userId);

export function* disableUserAd({ payload }) {
  const { userId } = payload;
  try {
    const { status } = yield call(disableUserAdAsync, userId);
    if (status === 200) {
      NotificationManager.success(
        'Anúncio desabilitado com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      try {
        const filters = undefined;
        const {
          data: { data },
          status,
        } = yield call(fetchAdUsersAsync, filters);
        if (status === 200) {
          yield put(
            fetchAdUsersSuccess({
              data,
              lastPage: data.lastPage,
              page: data.page,
            })
          );
        }
      } catch (err) {
        yield put(fetchAdUsersError('Erro ao carregar Anúncios'));
      }
    } else {
      NotificationManager.error(
        'Erro ao desabilitar Anúncio',
        'Erro',
        3000,
        null,
        null,
        ''
      );
      console.log('erro');
    }
  } catch (err) {
    NotificationManager.error(
      'Erro ao desabilitar Anúncio',
      'Erro',
      3000,
      null,
      null,
      ''
    );
    yield put(fetchUsersError('Erro ao desabilitar Anúncio'));
  }
}

export function* watchEnableUserAd() {
  yield takeEvery(USER_ENABLE_AD, enableUserAd);
}

const enableUserAdAsync = async userId => await activateAds(userId);

export function* enableUserAd({ payload }) {
  const { userId } = payload;
  try {
    const { status } = yield call(enableUserAdAsync, userId);
    if (status === 200) {
      NotificationManager.success(
        'Anúncio habilitado com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      try {
        const filters = undefined;
        const {
          data: { data },
          status,
        } = yield call(fetchAdUsersAsync, filters);
        if (status === 200) {
          yield put(
            fetchAdUsersSuccess({
              data,
              lastPage: data.lastPage,
              page: data.page,
            })
          );
        }
      } catch (err) {
        yield put(fetchAdUsersError('Erro ao carregar Anúncios'));
      }
    } else {
      NotificationManager.error(
        'Erro ao habilitar Anúncio',
        'Erro',
        3000,
        null,
        null,
        ''
      );
      console.log('erro');
    }
  } catch (err) {
    NotificationManager.error(
      'Erro ao habilitar Anúncio',
      'Erro',
      3000,
      null,
      null,
      ''
    );
    yield put(fetchUsersError('Erro ao habilitar Anúncio'));
  }
}

export function* watchDisableUsers() {
  yield takeEvery(USERS_DISABLE, disableUsers);
}

const disableUsersAsync = async id => await disableUser(id);

export function* disableUsers({ payload }) {
  const { id } = payload;

  try {
    const {
      data: { success },
    } = yield call(disableUsersAsync, id);
    if (success) {
      NotificationManager.success(
        'Sucesso ao desabilitar usuário',
        'Sucesso',
        3000,
        null,
        null
      );
    }
    yield put(ableUsersSuccess());
  } catch (err) {
    NotificationManager.error(
      'Erro ao desabilitar usuário',
      'Erro',
      3000,
      null,
      null
    );
  }
}

export function* watchEnableUsers() {
  yield takeEvery(USERS_ENABLE, enableUser);
}

const enableUsersAsync = async id => await activateUser(id);

export function* enableUser({ payload }) {
  const { id } = payload;

  try {
    const {
      data: { success },
    } = yield call(enableUsersAsync, id);
    if (success) {
      NotificationManager.success(
        'Sucesso ao habilitar usuário',
        'Sucesso',
        3000,
        null,
        null
      );

      yield put(ableUsersSuccess());
    }
  } catch (err) {
    NotificationManager.error(
      'Erro ao habilitar usuário',
      'Erro',
      3000,
      null,
      null
    );
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchSaveUser),
    fork(watchFetchUser),
    fork(watchFetchUserId),
    fork(watchFetchAdUser),
    fork(watchFetchUserAdId),
    fork(watchDisableUserAd),
    fork(watchEnableUserAd),
    fork(watchDisableUsers),
    fork(watchEnableUsers),
  ]);
}
