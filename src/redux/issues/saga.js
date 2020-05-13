import {
  all,
  call,
  fork,
  put,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';
import { ISSUES_FETCH, ISSUES_FETCH_ID, ISSUE_READ } from '../actions';
import { getIssues, getIssue, readIssueReq } from './api';
import {
  fetchIssuesSuccess,
  fetchIssuesError,
  fetchIssueIdSuccess,
  fetchIssueIdError,
  readIssueSuccess,
  readIssueError,
} from './actions';

export function* watchFetchIssues() {
  yield takeLatest(ISSUES_FETCH, fetchIssues);
}

const fetchIssuesAsync = async params => await getIssues(params);

export function* fetchIssues({ payload }) {
  const { filters } = payload;
  try {
    const { data, status } = yield call(fetchIssuesAsync, filters);
    if (status === 200) {
      yield put(fetchIssuesSuccess(data));
    }
    yield put(fetchIssuesError('Erro ao buscar problemas relatados.'));
  } catch (err) {
    yield put(fetchIssuesError('Erro ao buscar problemas relatados.'));
  }
}

export function* watchFetchIssuesId() {
  yield takeLatest(ISSUES_FETCH_ID, fetchIssuesId);
}

const fetchIssuesIdAsync = async params => await getIssue(params);

export function* fetchIssuesId({ payload }) {
  const { id } = payload;
  try {
    const { data, status } = yield call(fetchIssuesIdAsync, id);
    if (status === 200) {
      yield put(fetchIssueIdSuccess(data));
    }
    yield put(fetchIssueIdError('Erro ao carregar problema relatado.'));
  } catch (err) {
    yield put(fetchIssueIdError('Erro ao carregar problema relatado.'));
  }
}

const readIssueAsync = async id => await readIssueReq(id);

export function* readIssue({ payload }) {
  const { id, readBool, all } = payload;
  const readId = { ids: id, read: readBool, all };
  try {
    const { status } = yield call(readIssueAsync, readId);

    if (status === 200) {
      yield put(readIssueSuccess(payload));
    }
  } catch (err) {
    yield put(readIssueError('Erro ao ler comentario'));
  }
}

export function* watchReadIssue() {
  yield takeEvery(ISSUE_READ, readIssue);
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchIssues),
    fork(watchFetchIssuesId),
    fork(watchReadIssue),
  ]);
}
