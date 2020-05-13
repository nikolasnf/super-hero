import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  PLANS_SAVE,
  PLANS_FETCH_LIST,
  PLANS_FETCH_ID,
  PLANS_ENABLE,
  PLANS_DISABLE,
  PLANS_EDIT,
} from '../actions';
import {
  getAllPlans,
  getPlan,
  savePlan,
  disablePlan,
  activatePlan,
  editPlan,
} from './api';
import {
  fetchPlansSuccess,
  fetchPlansError,
  fetchPlanIdSuccess,
  fetchPlanIdError,
  savePlansSuccess,
  fetchPlans as fetchPlanAction,
  savePlansError,
  enablePlan,
  ablePlansSuccess,
} from './actions';
import { NotificationManager } from '../../components/common/react-notifications';

export function* watchSavePlan() {
  yield takeLatest(PLANS_SAVE, savePlanSaga);
}
export function* watchFetchPlans() {
  yield takeLatest(PLANS_FETCH_LIST, fetchPlans);
}
export function* watchFetchPlanId() {
  yield takeLatest(PLANS_FETCH_ID, fetchPlanId);
}
export function* watchEditPlan() {
  yield takeLatest(PLANS_EDIT, editPlanSaga);
}
export function* watchEnablePlans() {
  yield takeEvery(PLANS_ENABLE, enablePlans);
}
export function* watchDisablePlans() {
  yield takeEvery(PLANS_DISABLE, disablePlans);
}

const fetchPlansAsync = async filters => await getAllPlans(filters);

export function* fetchPlans({ payload }) {
  const { filters } = payload;

  try {
    const { data, status } = yield call(fetchPlansAsync, filters);
    if (status === 200) {
      yield put(fetchPlansSuccess(data));
    }
  } catch (err) {
    yield put(fetchPlansError('Erro ao carregar Planos'));
  }
}

const fetchPlanIdAsync = async id => await getPlan(id);

export function* fetchPlanId({ payload }) {
  const { id } = payload;

  try {
    const { data, status } = yield call(fetchPlanIdAsync, id);
    if (status === 200) {
      yield put(fetchPlanIdSuccess(data));
    }
  } catch (err) {
    yield put(fetchPlanIdError('Erro ao carregar Plano'));
  }
}

const savePlansAsync = async params => await savePlan(params);

export function* savePlanSaga({ payload }) {
  const { params, history } = payload;

  try {
    const { data, status } = yield call(savePlansAsync, params);
    if (status === 200) {
      yield put(savePlansSuccess(data));
      NotificationManager.success(
        'Plano cadastrado com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      history.goBack();
      yield put(fetchPlanAction());
    }
  } catch (err) {
    yield put(savePlansError('Erro ao salvar Plano'));
  }
}

const editPlansAsync = async (id, params) => await editPlan(id, params);

export function* editPlanSaga({ payload }) {
  const { id, params, history } = payload;

  try {
    const { data, status } = yield call(editPlansAsync, id, params);
    if (status === 200) {
      yield put(savePlansSuccess(data));
      NotificationManager.success(
        'Plano editado com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      history.goBack();
      yield put(fetchPlanAction());
    }
  } catch (err) {
    yield put(savePlansError('Erro ao editar Plano'));
  }
}

const disablePlansAsync = async id => await disablePlan(id);

export function* disablePlans({ payload }) {
  const { id } = payload;
  try {
    const {
      data: { success },
    } = yield call(disablePlansAsync, id);
    if (success) {
      NotificationManager.success(
        'Sucesso ao desabilitar plano',
        'Sucesso',
        3000,
        null,
        null
      );
    }
    yield put(ablePlansSuccess());
  } catch (err) {
    NotificationManager.error(
      'Erro ao desabilitar plano',
      'Erro',
      3000,
      null,
      null
    );
  }
}

const enablePlansAsync = async id => await activatePlan(id);

export function* enablePlans({ payload }) {
  const { id } = payload;

  try {
    const {
      data: { success },
    } = yield call(enablePlansAsync, id);
    if (success) {
      NotificationManager.success(
        'Sucesso ao habilitar plano',
        'Sucesso',
        3000,
        null,
        null
      );

      yield put(ablePlansSuccess());
    }
  } catch (err) {
    NotificationManager.error(
      'Erro ao habilitar plano ',
      'Erro',
      3000,
      null,
      null
    );
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchSavePlan),
    fork(watchFetchPlans),
    fork(watchFetchPlanId),
    fork(watchDisablePlans),
    fork(watchEnablePlans),
    fork(watchEditPlan),
  ]);
}
