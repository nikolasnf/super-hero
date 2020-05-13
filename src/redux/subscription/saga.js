import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  AGENCY_SUBSCRIPTION_SAVE,
  AGENCY_SUBSCRIPTION_FETCH_LIST,
  AGENCY_SUBSCRIPTION_FETCH_ID,
  AGENCY_SUBSCRIPTION_DISABLE,
  AGENCY_SUBSCRIPTION_ENABLE,
  AGENCY_SUBSCRIPTION_EDIT,
  AGENCY_SUBSCRIPTION_ASSIGN,
  AGENT_SUBSCRIPTION_SAVE,
  AGENT_FETCH_SUBSCRIPTION,
  AGENT_SUBSCRIPTION_ENABLE,
  AGENT_SUBSCRIPTION_DISABLE,
  AGENT_SUBSCRIPTION_FETCH_ID,
  AGENT_SUBSCRIPTION_PUT,
  ACTUAL_SUBSCRIPTION,
} from '../actions';
import {
  getAgencySubscriptions,
  createAgencySubscription,
  getAgencySubscription,
  updateAgency,
  disableAgencySubscription,
  activateAgencySubscription,
  createAgentSubscription,
  getAgentsSubscription,
  activateAgentSubscription,
  disableSubsAgent,
  getAgentSubscription,
  putAgentSubscriptionReq,
  assignAgencySubscription,
  getActualSubscription,
} from './api';
import {
  fetchAgenciesSubscriptionSuccess,
  fetchAgenciesSubscriptionError,
  saveAgencySubscriptionSuccess,
  saveAgencySubscriptionError,
  fetchAgenciesSubscription as fetchAgenciesSubscriptionAction,
  fetchAgencySubscriptionIdError,
  fetchAgencySubscriptionIdSuccess,
  ableAgenciesSubscriptionSuccess,
  ableAgenciesSubscriptionReset,
  editAgencySubscriptionSuccess,
  editAgencySubscriptionReset,
  saveAgentSubscriptionSuccess,
  saveAgentSubscriptionError,
  saveAgentSubscriptionReset,
  fetchAgentsSubscriptionSuccess,
  ableSubscriptionAgentSuccess,
  fetchAgentSubscriptionIdSuccess,
  putAgentSubscriptionSuccess,
  putAgentSubscriptionReset,
  putAgentSubscriptionError,
  assignAgencySubscriptionSuccess,
  assignAgencySubscriptionError,
  fetchActualSubscriptionSuccess,
  fetchActualSubscriptionError,
} from './actions';
import { NotificationManager } from '../../components/common/react-notifications';

export function* watchSaveAgencySubscription() {
  yield takeLatest(AGENCY_SUBSCRIPTION_SAVE, saveAgencySubscription);
}

export function* watchFetchAgencySubscription() {
  yield takeLatest(AGENCY_SUBSCRIPTION_FETCH_LIST, fetchAgenciesSubscription);
}

export function* watchFetchAgencySubscriptionId() {
  yield takeLatest(AGENCY_SUBSCRIPTION_FETCH_ID, fetchAgencySubscriptionId);
}

export function* watchFetchActualSubscription() {
  yield takeLatest(ACTUAL_SUBSCRIPTION, fetchActualSubscription);
}

const fetchActualSubscriptionAsync = async filters =>
  await getActualSubscription(filters);

export function* fetchActualSubscription({ payload }) {
  const { filters } = payload;
  try {
    const { data, status } = yield call(fetchActualSubscriptionAsync, filters);
    if (status === 200) {
      yield put(fetchActualSubscriptionSuccess({ data }));
    }
  } catch (err) {
    yield put(
      fetchActualSubscriptionError('Erro ao carregar assinatura atual')
    );
  }
}

const fetchAgenciesSubscriptionAsync = async filters =>
  await getAgencySubscriptions(filters);

export function* fetchAgenciesSubscription({ payload }) {
  const { filters } = payload;

  try {
    const { data, status } = yield call(
      fetchAgenciesSubscriptionAsync,
      filters
    );
    if (status === 200) {
      const filteredData = data.data.map(item => ({
        ...item,
      }));
      yield put(
        fetchAgenciesSubscriptionSuccess({ ...data, data: filteredData })
      );
    }
  } catch (err) {
    yield put(fetchAgenciesSubscriptionError('Erro ao carregar Imobiliárias'));
  }
}

const fetchAgencySubscriptionIdAsync = async id =>
  await getAgencySubscription(id);

export function* fetchAgencySubscriptionId({ payload }) {
  const { id } = payload;

  try {
    const { data, status } = yield call(fetchAgencySubscriptionIdAsync, id);
    if (status === 200) {
      yield put(
        fetchAgencySubscriptionIdSuccess({
          ...data,
        })
      );
    }
  } catch (err) {
    yield put(fetchAgencySubscriptionIdError('Erro ao carregar Imobiliária'));
  }
}

const saveAgenciesSubscriptionAsync = async params =>
  await createAgencySubscription(params);

export function* saveAgencySubscription({ payload }) {
  const { params, history } = payload;

  try {
    const { data, status } = yield call(saveAgenciesSubscriptionAsync, params);
    if (status === 200) {
      yield put(saveAgencySubscriptionSuccess(data));
      NotificationManager.success(
        'Imobiliária cadastrada com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      history.goBack();
      yield put(fetchAgenciesSubscriptionAction());
    } else {
      yield put(saveAgencySubscriptionError('Erro ao salvar Imobiliária'));
    }
  } catch (err) {
    yield put(saveAgencySubscriptionError('Erro ao salvar Imobiliária'));
  }
}

export function* watchAgencyUpdate() {
  yield takeEvery(AGENCY_SUBSCRIPTION_EDIT, agencyUpdate);
}

export const agencyUpdateAsync = async (id, params) =>
  await updateAgency(id, params);

export function* agencyUpdate({ payload }) {
  console.log(payload);
  const {
    params: { id, ...params },
    history,
  } = payload;
  try {
    const { data, status } = yield call(agencyUpdateAsync, id, params);
    if (status === 200) {
      yield put(editAgencySubscriptionSuccess(params));
      NotificationManager.success(
        'Cadastro alterado com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      history.goBack();
      yield put(editAgencySubscriptionReset());
    }
  } catch (err) {
    NotificationManager.error(
      'Erro ao alterar cadastro',
      'Erro',
      3000,
      null,
      null,
      ''
    );
  }
}

export function* watchDisableAgency() {
  yield takeEvery(AGENCY_SUBSCRIPTION_DISABLE, disableAgency);
}

const disableAgencyAsync = async id => await disableAgencySubscription(id);

export function* disableAgency({ payload }) {
  const { id } = payload;

  try {
    const {
      data: { success },
    } = yield call(disableAgencyAsync, id);
    if (success) {
      NotificationManager.success(
        'Sucesso ao desabilitar assinatura',
        'Sucesso',
        3000,
        null,
        null
      );
    }
    yield put(ableAgenciesSubscriptionSuccess());
  } catch (err) {
    NotificationManager.error(
      'Erro ao desabilitar assinatura',
      'Erro',
      3000,
      null,
      null
    );
  }
}

export function* watchEnableAgency() {
  yield takeEvery(AGENCY_SUBSCRIPTION_ENABLE, enableAgencySubscription);
}

const enableSubscriptionAsync = async id =>
  await activateAgencySubscription(id);

export function* enableAgencySubscription({ payload }) {
  const { id } = payload;

  try {
    const {
      data: { success },
    } = yield call(enableSubscriptionAsync, id);
    if (success) {
      NotificationManager.success(
        'Sucesso ao habilitar assinatura',
        'Sucesso',
        3000,
        null,
        null
      );

      yield put(ableAgenciesSubscriptionSuccess());
    }
  } catch (err) {
    NotificationManager.error(
      'Erro ao habilitar assinatura',
      'Erro',
      3000,
      null,
      null
    );
  }
}
export function* watchAssignAgencySub() {
  yield takeEvery(AGENCY_SUBSCRIPTION_ASSIGN, assignAgencySub);
}

const assignAgencySubscriptionAsync = async params =>
  await assignAgencySubscription(params);

export function* assignAgencySub({ payload }) {
  console.log(payload);
  const { params } = payload;

  try {
    const { data, status } = yield call(assignAgencySubscriptionAsync, {
      subscription_id: params,
    });
    if (status === 200) {
      yield put(assignAgencySubscriptionSuccess(data));
      NotificationManager.success(
        'Assinatura feita com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
    } else {
      yield put(assignAgencySubscriptionError('Erro ao adquirir assinatura'));
    }
  } catch (err) {
    yield put(saveAgencySubscriptionError('Erro ao adquirir assinatura'));
  }
}

export function* watchSaveAgentSubscription() {
  yield takeEvery(AGENT_SUBSCRIPTION_SAVE, saveAgentSubscription);
}

const saveAgentSubscriptionAsync = async params =>
  await createAgentSubscription(params);

export function* saveAgentSubscription({ payload }) {
  const { params, history } = payload;
  try {
    const { data, status } = yield call(saveAgentSubscriptionAsync, params);
    if (status === 200) {
      yield put(saveAgentSubscriptionSuccess(data));
      NotificationManager.success(
        'Assinatura cadastrada com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      history.goBack();
      yield put(saveAgentSubscriptionReset());
    } else {
      NotificationManager.error(
        'Erro ao cadastrar assinatura',
        'Erro',
        3000,
        null,
        null,
        ''
      );
      yield put(saveAgentSubscriptionError('Erro ao cadastrar assinatura'));
    }
  } catch (err) {
    NotificationManager.error(
      'Erro ao cadastrar assinatura',
      'Erro',
      3000,
      null,
      null,
      ''
    );
    yield put(saveAgentSubscriptionError(err));
  }
}

export function* watchFetchAgentsSubscription() {
  yield takeEvery(AGENT_FETCH_SUBSCRIPTION, fetchAgentsSubscription);
}

const fetchAgentsSubscriptionAsync = async filters =>
  await getAgentsSubscription(filters);

export function* fetchAgentsSubscription({ payload }) {
  const { filters } = payload;

  try {
    const { data, status } = yield call(fetchAgentsSubscriptionAsync, filters);
    if (status === 200) {
      // const filteredData = data.data.map(item => ({
      //   ...item,
      //   ...item.profile.agent,
      //   ...item.profile.address,
      //   ...item.profile
      // }));
      // console.log(filteredData)
      yield put(fetchAgentsSubscriptionSuccess(data));
    }
  } catch (err) {
    // yield put(fetchAgentsError("Erro ao carregar Imobiliárias"));
  }
}

export function* watchEnableSubscriptionAgent() {
  yield takeEvery(AGENT_SUBSCRIPTION_ENABLE, enableSubscriptionAgent);
}

const enableSubscriptionAgentAsync = async id =>
  await activateAgentSubscription(id);

export function* enableSubscriptionAgent({ payload }) {
  const { id } = payload;
  try {
    const {
      data: { success },
    } = yield call(enableSubscriptionAgentAsync, id);
    if (success) {
      NotificationManager.success(
        'Sucesso ao habilitar assinatura',
        'Sucesso',
        3000,
        null,
        null
      );
      yield put(ableSubscriptionAgentSuccess());
    }
  } catch (err) {
    NotificationManager.error(
      'Erro ao habilitar assinatura',
      'Erro',
      3000,
      null,
      null
    );
  }
}

export function* watchDisableSubscriptionAgent() {
  yield takeEvery(AGENT_SUBSCRIPTION_DISABLE, disableSubscriptionAgent);
}

const disableSubscriptionAgentAsync = async id => await disableSubsAgent(id);

export function* disableSubscriptionAgent({ payload }) {
  const { id } = payload;

  try {
    const {
      data: { success },
    } = yield call(disableSubscriptionAgentAsync, id);
    if (success) {
      NotificationManager.success(
        'Sucesso ao desabilitar assinatura',
        'Sucesso',
        3000,
        null,
        null
      );
    }
    yield put(ableSubscriptionAgentSuccess());
  } catch (err) {
    NotificationManager.error(
      'Erro ao desabilitar assinatura',
      'Erro',
      3000,
      null,
      null
    );
  }
}

export function* watchFetchAgentSubscriptionId() {
  yield takeLatest(AGENT_SUBSCRIPTION_FETCH_ID, fetchAgentSubscriptionId);
}

const fetchAgentSubscriptionIdAsync = async id =>
  await getAgentSubscription(id);

export function* fetchAgentSubscriptionId({ payload }) {
  const { id } = payload;

  try {
    const { data, status } = yield call(fetchAgentSubscriptionIdAsync, id);
    if (status === 200) {
      yield put(fetchAgentSubscriptionIdSuccess(data));
    }
  } catch (err) {
    // yield put(fetchAgentIdError("Erro ao carregar Corretor"));
  }
}

export function* watchPutAgentSubscription() {
  yield takeEvery(AGENT_SUBSCRIPTION_PUT, putAgentSubscription);
}

const putAgentSubscriptionAsync = async params =>
  await putAgentSubscriptionReq(params);

export function* putAgentSubscription({ payload }) {
  const { params, history } = payload;
  const { id } = params;

  try {
    const { data, status } = yield call(
      putAgentSubscriptionAsync,
      (id, params)
    );
    if (status === 200) {
      yield put(putAgentSubscriptionSuccess(data));
      NotificationManager.success(
        'Alteração salva com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      history.goBack();
      yield put(putAgentSubscriptionReset());
    } else {
      NotificationManager.error(
        'Erro ao salvar alteração',
        'Erro',
        3000,
        null,
        null,
        ''
      );
      yield put(putAgentSubscriptionError('Erro ao salvar alteração'));
    }
  } catch (err) {
    NotificationManager.error(
      'Erro ao salvar alteração',
      'Erro',
      3000,
      null,
      null,
      ''
    );
    yield put(putAgentSubscriptionError(err));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchSaveAgencySubscription),
    fork(watchFetchAgencySubscription),
    fork(watchFetchAgencySubscriptionId),
    fork(watchAgencyUpdate),
    fork(watchEnableAgency),
    fork(watchDisableAgency),
    fork(watchSaveAgentSubscription),
    fork(watchFetchAgentsSubscription),
    fork(watchEnableSubscriptionAgent),
    fork(watchDisableSubscriptionAgent),
    fork(watchFetchAgentSubscriptionId),
    fork(watchPutAgentSubscription),
    fork(watchAssignAgencySub),
    fork(watchFetchActualSubscription),
  ]);
}
