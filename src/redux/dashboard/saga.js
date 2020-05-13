import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { DASHBOARD_LIST, IMOB_DASHBOARD_GET_AGENTS } from '../actions';
import { getDashboardData, getImobDashboardAgent } from './api';
import { dashboardListError, dashboardListSuccess } from './actions';

const fetchDashboardAsync = async filters => await getDashboardData(filters);

export function* fetchDashboard({ payload }) {
  const { agent_id, month, year } = payload;

  const data = null;
  if (agent_id !== 'all') {
    data = { agent_id, month, year };
  } else {
    data = { month, year };
  }
  try {
    const { data, status } = yield call(fetchDashboardAsync, data);
    if (status === 200) {
      yield put(
        dashboardListSuccess({
          data,
        })
      );
    }
  } catch (err) {
    yield put(dashboardListError('Erro ao carregar dados do dashboard'));
  }
}

const fetchImobDashboardAgentAsync = async filters =>
  await getImobDashboardAgent(filters);

export function* fetchImobDashboardAgent({ payload }) {
  try {
    const { data, status } = yield call(fetchImobDashboardAgentAsync, payload);
    if (status === 200) {
      yield put(
        dashboardListSuccess({
          agents: data,
        })
      );
    }
  } catch (err) {
    yield put(dashboardListError('Erro ao carregar dados do dashboard'));
  }
}

export function* watchFetchDashboard() {
  yield takeLatest(DASHBOARD_LIST, fetchDashboard);
}

export function* watchFetchImobDashboardAgent() {
  yield takeLatest(IMOB_DASHBOARD_GET_AGENTS, fetchImobDashboardAgent);
}

export default function* rootSaga() {
  yield all([fork(watchFetchDashboard), fork(watchFetchImobDashboardAgent)]);
}
