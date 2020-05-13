import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  USER_TRANSACTION_FETCH_LIST,
  AGENCY_TRANSACTION_FETCH_LIST,
  AGENT_TRANSACTION_FETCH_LIST,
} from '../actions';
import {
  getUserTransactions,
  getAgencyTransactions,
  getAgentTransactions,
} from './api';
import {
  fetchUsersTransactionSuccess,
  fetchUsersTransactionError,
  fetchUsersTransaction as fetchUsersTransactionAction,
  fetchAgenciesTransactionSuccess,
  fetchAgenciesTransactionError,
  fetchAgenciesTransaction as fetchAgenciesTransactionAction,
  fetchAgentsTransactionSuccess,
  fetchAgentsTransactionError,
  fetchAgentsTransaction as fetchAgentsTransactionAction,
} from './actions';
import { NotificationManager } from '../../components/common/react-notifications';

// USER

export function* watchFetchUserTransaction() {
  yield takeLatest(USER_TRANSACTION_FETCH_LIST, fetchUsersTransaction);
}

const fetchUsersTransactionAsync = async filters =>
  await getUserTransactions(filters);

export function* fetchUsersTransaction({ payload }) {
  const { filters } = payload;

  try {
    const { data, status } = yield call(fetchUsersTransactionAsync, filters);
    if (status === 200) {
      const filteredData = data.data.map(item => ({
        ...item,
      }));
      yield put(fetchUsersTransactionSuccess({ ...data, data: filteredData }));
    }
  } catch (err) {
    yield put(fetchUsersTransactionError('Erro ao carregar transações'));
  }
}

// AGENCIES
export function* watchFetchAgencyTransaction() {
  yield takeLatest(AGENCY_TRANSACTION_FETCH_LIST, fetchAgenciesTransaction);
}

const fetchAgenciesTransactionAsync = async filters =>
  await getAgencyTransactions(filters);

export function* fetchAgenciesTransaction({ payload }) {
  const { filters } = payload;

  try {
    const { data, status } = yield call(fetchAgenciesTransactionAsync, filters);
    if (status === 200) {
      const filteredData = data.data.map(item => ({
        ...item,
      }));
      yield put(
        fetchAgenciesTransactionSuccess({ ...data, data: filteredData })
      );
    }
  } catch (err) {
    yield put(fetchAgenciesTransactionError('Erro ao carregar transações'));
  }
}

// AGENTS

export function* watchFetchAgentTransaction() {
  yield takeLatest(AGENT_TRANSACTION_FETCH_LIST, fetchAgentsTransaction);
}

const fetchAgentsTransactionAsync = async filters =>
  await getAgentTransactions(filters);

export function* fetchAgentsTransaction({ payload }) {
  const { filters } = payload;

  try {
    const { data, status } = yield call(fetchAgentsTransactionAsync, filters);
    if (status === 200) {
      const filteredData = data.data.map(item => ({
        ...item,
      }));
      yield put(fetchAgentsTransactionSuccess({ ...data, data: filteredData }));
    }
  } catch (err) {
    yield put(fetchAgentsTransactionError('Erro ao carregar transações'));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchUserTransaction),
    fork(watchFetchAgencyTransaction),
    fork(watchFetchAgentTransaction),
  ]);
}
