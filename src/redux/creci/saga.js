import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { Redirect } from 'react-router-dom';
import {
  CRECI_LIST,
  CRECI_APPROVE,
  CRECI_REPROVE,
  CRECI_BY_ID,
} from '../actions';
import {
  getCreciRequest,
  getCreciRequests,
  approveCreciRequest,
  reproveCreciRequest,
} from './api';
import {
  creciListSuccess,
  creciListError,
  creciByIdSuccess,
  creciByIdError,
  creciApproveSuccess,
  creciApproveError,
  creciReproveSuccess,
  creciReproveError,
} from './actions';

import { fetchAgents as fetchAgentsAction } from '../agent/actions';

import { NotificationManager } from '../../components/common/react-notifications';

const approveRequestAsync = async id => await approveCreciRequest(id);

export function* approveRequest({ payload }) {
  try {
    const { data, status } = yield call(approveRequestAsync, payload);
    if (status === 200) {
      const oldData = yield select(state => state.creci.data);
      if (oldData.id && oldData.id === +payload) {
        yield put(
          creciApproveSuccess({
            data,
          })
        );
      } else {
        yield put(
          creciApproveSuccess({
            data: [...oldData.filter(e => e.id !== payload), data],
          })
        );
      }
    }
  } catch (err) {
    yield put(creciApproveError('Erro ao aprovar atualização de CRECI'));
  }
}

const reproveRequestAsync = async id => await reproveCreciRequest(id);

export function* reproveRequest({ payload }) {
  try {
    const { data, status } = yield call(reproveRequestAsync, payload);
    if (status === 200) {
      const oldData = yield select(state => state.creci.data);
      if (oldData.id && oldData.id === +payload) {
        yield put(
          creciReproveSuccess({
            data,
          })
        );
      } else {
        yield put(
          creciReproveSuccess({
            data: [...oldData.filter(e => e.id !== payload), data],
          })
        );
      }
    }
  } catch (err) {
    yield put(creciReproveError('Erro ao reprovar atualização de CRECI'));
  }
}

const fetchRequestAsync = async id => await getCreciRequest(id);

export function* fetchRequest({ payload }) {
  try {
    const { data, status } = yield call(fetchRequestAsync, payload);
    if (status === 200) {
      yield put(creciByIdSuccess({ data }));
    }
  } catch (err) {
    yield put(creciByIdError('Erro ao carregar atualização de CRECI'));
  }
}

const fetchRequestsAsync = async filters => await getCreciRequests(filters);

export function* fetchRequests({ payload }) {
  try {
    const { data, status } = yield call(fetchRequestsAsync, payload);
    if (status === 200) {
      yield put(
        creciListSuccess({
          data: data.data,
          page: data.page,
          pages: data.lastPage,
        })
      );
    }
  } catch (err) {
    yield put(creciListError('Erro ao carregar atualizações de CRECI'));
  }
}

export function* watchFetchRequests() {
  yield takeLatest(CRECI_LIST, fetchRequests);
}

export function* watchFetchRequest() {
  yield takeLatest(CRECI_BY_ID, fetchRequest);
}

export function* watchApproveRequest() {
  yield takeLatest(CRECI_APPROVE, approveRequest);
}

export function* watchReproveRequest() {
  yield takeLatest(CRECI_REPROVE, reproveRequest);
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchRequests),
    fork(watchFetchRequest),
    fork(watchApproveRequest),
    fork(watchReproveRequest),
  ]);
}
