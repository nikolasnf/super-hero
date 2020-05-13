import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  USER_RATING_FETCH_LIST,
  USER_RATING_FETCH_ID,
  AGENCY_RATING_FETCH_LIST,
  AGENCY_RATING_FETCH_ID,
  AGENT_RATING_FETCH_LIST,
  AGENT_RATING_FETCH_ID,
  RATING_READ,
} from '../actions';
import { getReviews, getReview, readReview } from './api';
import {
  fetchUsersRatingSuccess,
  fetchUsersRatingError,
  fetchUsersRating as fetchUsersRatingAction,
  fetchUserRatingIdError,
  fetchUserRatingIdSuccess,
  fetchAgenciesRatingSuccess,
  fetchAgenciesRatingError,
  fetchAgenciesRating as fetchAgenciesRatingAction,
  fetchAgencyRatingIdError,
  fetchAgencyRatingIdSuccess,
  fetchAgentsRatingSuccess,
  fetchAgentsRatingError,
  fetchAgentsRating as fetchAgentsRatingAction,
  fetchAgentRatingIdError,
  fetchAgentRatingIdSuccess,
  readRatingSuccess,
  readRatingError,
} from './actions';
import { NotificationManager } from '../../components/common/react-notifications';

// USER

export function* watchFetchUserRating() {
  yield takeLatest(USER_RATING_FETCH_LIST, fetchUsersRating);
}

const fetchUsersRatingAsync = async filters => await getReviews(filters);

export function* fetchUsersRating({ payload }) {
  const { filters } = payload;

  try {
    const { data, status } = yield call(fetchUsersRatingAsync, filters);
    if (status === 200) {
      const filteredData = data.data.map(item => ({
        ...item,
      }));
      yield put(fetchUsersRatingSuccess({ ...data, data: filteredData }));
    }
  } catch (err) {
    yield put(fetchUsersRatingError('Erro ao carregar avaliações'));
  }
}

export function* watchFetchUserRatingId() {
  yield takeLatest(USER_RATING_FETCH_ID, fetchUserRatingId);
}

const fetchUserRatingIdAsync = async id => await getReview(id);

export function* fetchUserRatingId({ payload }) {
  const { id } = payload;
  const readId = { ids: [id], read: true };
  try {
    const { data, status } = yield call(fetchUserRatingIdAsync, id);
    if (status === 200) {
      yield call(readRatingAsync, readId);
      yield put(
        fetchUserRatingIdSuccess({
          ...data,
        })
      );
    }
  } catch (err) {
    yield put(fetchUserRatingIdError('Erro ao carregar comentário'));
  }
}

// AGENCIES
export function* watchFetchAgencyRating() {
  yield takeLatest(AGENCY_RATING_FETCH_LIST, fetchAgenciesRating);
}

const fetchAgenciesRatingAsync = async filters => await getReviews(filters);

export function* fetchAgenciesRating({ payload }) {
  const { filters } = payload;

  try {
    const { data, status } = yield call(fetchAgenciesRatingAsync, filters);
    if (status === 200) {
      const filteredData = data.data.map(item => ({
        ...item,
      }));
      yield put(fetchAgenciesRatingSuccess({ ...data, data: filteredData }));
    }
  } catch (err) {
    yield put(fetchAgenciesRatingError('Erro ao carregar avaliações'));
  }
}

export function* watchFetchAgencyRatingId() {
  yield takeLatest(AGENCY_RATING_FETCH_ID, fetchAgencyRatingId);
}

const fetchAgencyRatingIdAsync = async id => await getReview(id);

export function* fetchAgencyRatingId({ payload }) {
  const { id } = payload;
  const readId = { ids: [id], read: true };
  try {
    const { data, status } = yield call(fetchAgencyRatingIdAsync, id);
    if (status === 200) {
      yield call(readRatingAsync, readId);
      yield put(
        fetchAgencyRatingIdSuccess({
          ...data,
          ...data.profile.agency,
          ...data.profile.address,
          ...data.profile,
        })
      );
    }
  } catch (err) {
    yield put(fetchAgencyRatingIdError('Erro ao carregar comentário'));
  }
}

// AGENTS

export function* watchFetchAgentRating() {
  yield takeLatest(AGENT_RATING_FETCH_LIST, fetchAgentsRating);
}

const fetchAgentsRatingAsync = async filters => await getReviews(filters);

export function* fetchAgentsRating({ payload }) {
  const { filters } = payload;

  try {
    const { data, status } = yield call(fetchAgentsRatingAsync, filters);
    if (status === 200) {
      const filteredData = data.data.map(item => ({
        ...item,
      }));
      yield put(fetchAgentsRatingSuccess({ ...data, data: filteredData }));
    }
  } catch (err) {
    yield put(fetchAgentsRatingError('Erro ao carregar avaliações'));
  }
}

export function* watchFetchAgentRatingId() {
  yield takeLatest(AGENT_RATING_FETCH_ID, fetchAgentRatingId);
}

const fetchAgentRatingIdAsync = async id => await getReview(id);

export function* fetchAgentRatingId({ payload }) {
  const { id } = payload;
  const readId = { ids: [id], read: true };
  try {
    const { data, status } = yield call(fetchAgentRatingIdAsync, id);
    if (status === 200) {
      yield call(readRatingAsync, readId);

      yield put(
        fetchAgentRatingIdSuccess({
          ...data,
        })
      );
    }
  } catch (err) {
    yield put(fetchAgentRatingIdError('Erro ao carregar comentário'));
  }
}

export function* watchReadRating() {
  yield takeEvery(RATING_READ, readRating);
}

const readRatingAsync = async id => await readReview(id);

export function* readRating({ payload }) {
  const { id, readBool, all } = payload;
  const readId = { ids: id, read: readBool, all };
  try {
    const { status } = yield call(readRatingAsync, readId);

    if (status === 200) {
      yield put(readRatingSuccess(payload));
    }
  } catch (err) {
    yield put(readRatingError('Erro ao ler comentario'));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchUserRating),
    fork(watchFetchUserRatingId),
    fork(watchFetchAgencyRating),
    fork(watchFetchAgencyRatingId),
    fork(watchFetchAgentRating),
    fork(watchFetchAgentRatingId),
    fork(watchReadRating),
  ]);
}
