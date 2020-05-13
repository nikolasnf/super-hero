import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects';
import {
  AGENCY_SAVE,
  AGENCY_FETCH_LIST,
  AGENCY_FETCH_ID,
  AGENCY_ACCEPT,
  AGENCY_FETCH_AD_LIST,
  AGENCY_FETCH_AD_ID,
  AGENCY_DISABLE_AD,
  AGENCY_ENABLE_AD,
  AGENCY_ASSIGN_AGENT,
  AGENCY_FETCH_ASSIGNED_AGENTS,
  AGENCY_GET_PROFILE,
  AGENCY_EDIT_PROFILE,
  AGENCY_UNASSIGN_AGENT,
} from '../actions';
import {
  getAgencies,
  createAgency,
  getAgency,
  approvalAgency,
  getAds,
  getAd,
  deleteAds,
  activateAds,
  uploadProfileImage,
  assignAgentAdmin,
  getAssignedAgentsAdmin,
  createAgencyNoAuth,
  assignAgent,
  unassignAgentAdmin,
  getAssignedAgents,
  getMe,
  editPerfil,
  editProfileImage,
} from './api';
import {
  fetchAgenciesSuccess,
  fetchAgenciesError,
  saveAgencySuccess,
  saveAgencyError,
  fetchAgencies as fetchAgenciesAction,
  fetchAgencyIdError,
  fetchAgencyIdSuccess,
  agencyApprovalSuccess,
  agencyApprovalError,
  fetchAdAgenciesSuccess,
  fetchAdAgenciesError,
  fetchAdAgencyIdSuccess,
  fetchAdAgencyIdError,
  AssignAgentSuccess,
  AssignAgentError,
  fetchAssignedAgentsSuccess,
  fetchAssignedAgentsError,
  fetchAssignedAgents as fetchAssignedAgentsAction,
  getMyProfileSuccess,
  getMyProfileError,
  editMyProfileSuccess,
  editMyProfileError,
  unassignAgentSuccess,
  unassignAgentError,
} from './actions';

import { NotificationManager } from '../../components/common/react-notifications';

const fetchAgenciesAsync = async filters => await getAgencies(filters);

export function* fetchAgencies({ payload }) {
  const { filters } = payload;

  try {
    const { data, status } = yield call(fetchAgenciesAsync, filters);

    if (status === 200) {
      const filteredData = data.data.map(item => ({
        ...item,
        ...item.profile.agency,
        ...item.profile.address,
        ...item.profile,
      }));
      yield put(fetchAgenciesSuccess({ ...data, data: filteredData }));
    }
  } catch (err) {
    yield put(fetchAgenciesError('Erro ao carregar Imobiliárias'));
  }
}

const fetchAgencyIdAsync = async id => await getAgency(id);

export function* fetchAgencyId({ payload }) {
  const { id } = payload;

  try {
    const { data, status } = yield call(fetchAgencyIdAsync, id);
    if (status === 200) {
      yield put(
        fetchAgencyIdSuccess({
          ...data,
          ...data.profile.agency,
          ...data.profile.address,
          ...data.profile,
        })
      );
    }
  } catch (err) {
    yield put(fetchAgencyIdError('Erro ao carregar Imobiliária'));
  }
}

export const agencyApprovalAsync = async (id, params) =>
  await approvalAgency(id, params);

export function* agencyApproval({ payload }) {
  const { id, ...params } = payload;
  try {
    const { data, status } = yield call(agencyApprovalAsync, id, params);
    if (status === 200) {
      NotificationManager.success(
        params.approved
          ? 'Cadastro aprovado com sucesso'
          : 'Cadastro recusado com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      yield put(agencyApprovalSuccess());
      yield put(fetchAgenciesAction(params));
    }
  } catch (err) {
    NotificationManager.error(
      params.approved ? 'Erro ao aprovar cadastro' : 'Erro ao recusar cadastro',
      'Erro',
      3000,
      null,
      null,
      ''
    );
    yield put(agencyApprovalError(err));
  }
}

export function* watchAgencyApproval() {
  yield takeEvery(AGENCY_ACCEPT, agencyApproval);
}

const saveAgenciesAsync = async (params, noAuthorization) =>
  noAuthorization
    ? await createAgencyNoAuth(params)
    : await createAgency(params);

const uploadImageAsync = async (file, config) =>
  await uploadProfileImage(file, config);

export function* saveAgency({ payload }) {
  const { params, file, noAuthorization } = payload;

  const { history } = params;

  try {
    const { data, status } = yield call(
      saveAgenciesAsync,
      params,
      noAuthorization
    );

    if (status === 200) {
      if (file) {
        const formData = new FormData();
        formData.append('photo', file);
        yield call(uploadImageAsync, formData, {
          headers: { Authorization: `Bearer ${data.token}` },
        });
      }

      yield put(saveAgencySuccess(data));
      NotificationManager.success(
        'Imobiliária cadastrada com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      history.goBack();
      yield put(fetchAgenciesAction());
    } else {
      yield put(saveAgencyError('Erro ao salvar Imobiliária'));
    }
  } catch (err) {
    yield put(saveAgencyError('Erro ao salvar Imobiliária'));
  }
}

const fetchAdAgenciesAsync = async filters =>
  await getAds({ ...filters, profile_type: 'Agency' });

export function* fetchAdAgencies({ payload }) {
  const { filters } = payload;

  try {
    const { data, status } = yield call(fetchAdAgenciesAsync, filters);
    if (status === 200) {
      yield put(
        fetchAdAgenciesSuccess({
          data: data.data,
          lastPage: data.lastPage,
          page: data.page,
        })
      );
    }
  } catch (err) {
    yield put(fetchAdAgenciesError('Erro ao carregar Anúncios'));
  }
}

const fetchAgencyAdIdAsync = async id => await getAd(id);

export function* fetchAgencyAdId({ payload }) {
  const { id } = payload;
  try {
    const { data, status } = yield call(fetchAgencyAdIdAsync, id);
    if (status === 200) {
      yield put(
        fetchAdAgencyIdSuccess({
          ...data,
        })
      );
    }
  } catch (err) {
    yield put(fetchAdAgencyIdError('Erro ao carregar Imobiliária'));
  }
}

const disableAgencyAdAsync = async userId => await deleteAds(userId);

export function* disableAgencyAd({ payload }) {
  const { userId } = payload;
  try {
    const { status } = yield call(disableAgencyAdAsync, userId);
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
        } = yield call(fetchAdAgenciesAsync, filters);
        if (status === 200) {
          yield put(
            fetchAdAgenciesSuccess({
              data,
              lastPage: data.lastPage,
              page: data.page,
            })
          );
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
        yield put(fetchAdAgenciesError('Erro ao carregar Anúncios'));
      }
    } else {
      console.log('erro');
    }
  } catch (err) {
    yield put(fetchAdAgenciesError('Erro ao desabilitar Anúncio'));
  }
}

export function* watchDisableAgencyAd() {
  yield takeEvery(AGENCY_DISABLE_AD, disableAgencyAd);
}

const enableAgencyAdAsync = async userId => await activateAds(userId);

export function* enableAgencyAd({ payload }) {
  const { userId } = payload;
  try {
    const { status } = yield call(enableAgencyAdAsync, userId);
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
        } = yield call(fetchAdAgenciesAsync, filters);
        if (status === 200) {
          yield put(
            fetchAdAgenciesSuccess({
              data,
              lastPage: data.lastPage,
              page: data.page,
            })
          );
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
        yield put(fetchAdAgenciesError('Erro ao carregar Anúncios'));
      }
    } else {
      console.log('erro');
    }
  } catch (err) {
    yield put(fetchAdAgenciesError('Erro ao habilitar Anúncio'));
  }
}

export function* watchEnableAgencyAd() {
  yield takeEvery(AGENCY_ENABLE_AD, enableAgencyAd);
}

const fetchAssignedAgentsAsync = async (id, filters) =>
  await getAssignedAgentsAdmin(id, filters);

export function* fetchAssignedAgents({ payload }) {
  const { id, filters } = payload;

  try {
    const { data, status } = yield call(fetchAssignedAgentsAsync, id, filters);

    if (status === 200) {
      yield put(fetchAssignedAgentsSuccess(data));
    }
  } catch (err) {
    yield put(
      fetchAssignedAgentsError('Erro ao carregar corretores vinculados')
    );
  }
}

export function* watchFetchAssignedAgents() {
  yield takeLatest(AGENCY_FETCH_ASSIGNED_AGENTS, fetchAssignedAgents);
}

const assignAgentAsync = async (id, agentId) =>
  await assignAgentAdmin(id, agentId);

export function* agentAssigning({ payload }) {
  const { agentId, agencyId } = payload;
  const list = yield select(state => state.agency.assignedData);
  try {
    const response = yield call(assignAgentAsync, agencyId, {
      agent_id: agentId,
    });

    if (response.status === 200) {
      const { agent } = response.data;
      NotificationManager.success(
        'Corretor vinculado com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      const index = list.findIndex(item => item.id === agentId);

      // const before = list;
      const after = [...list];
      after[index] = agent;

      yield put(AssignAgentSuccess([...after]));
    } else {
      yield put(AssignAgentError('Erro ao vincular corretor'));
    }
  } catch (err) {
    NotificationManager.error(
      'Ocorreu um erro ao vincular corretor',
      'erro',
      3000,
      null,
      null,
      ''
    );
    yield put(AssignAgentError('Erro ao vincular corretor'));
  }
}

export function* watchAssignAgent() {
  yield takeEvery(AGENCY_ASSIGN_AGENT, agentAssigning);
}

const unassignAgentAsync = async (id, agentId) =>
  await unassignAgentAdmin(id, agentId);

export function* unassignAgent({ payload }) {
  const { agentId, agencyId } = payload;
  const list = yield select(state => state.agency.assignedData);
  const dataId = yield select(state => state.agency.dataId);
  try {
    const response = yield call(unassignAgentAsync, agencyId, {
      agent_id: agentId,
    });

    if (response.status === 200) {
      const { agent } = response.data;
      NotificationManager.success(
        'Corretor desvinculado com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      const copyData = { ...dataId };
      const agentFound = copyData?.profile?.agency?.agents.findIndex(
        item => item.id === agentId
      );

      if (typeof agentFound === 'number' && agentFound !== -1) {
        const removed = copyData?.profile?.agency?.agents.splice(agentFound, 1);
        yield put(
          fetchAgencyIdSuccess({
            ...copyData,
            ...copyData.profile.agency,
            ...copyData.profile.address,
            ...copyData.profile,
          })
        );
      }

      const index = list.findIndex(item => item.id === agentId);
      // const before = list;
      const after = [...list];
      after[index] = agent;

      yield put(unassignAgentSuccess([...after]));
    } else {
      yield put(unassignAgentError('Erro ao vincular corretor'));
    }
  } catch (err) {
    NotificationManager.error(
      'Ocorreu um erro ao desvincular corretor',
      'Erro',
      3000,
      null,
      null,
      ''
    );
    yield put(unassignAgentError('Erro ao vincular corretor'));
  }
}

export function* watchUnassignAgent() {
  yield takeEvery(AGENCY_UNASSIGN_AGENT, unassignAgent);
}

export function* watchSaveAgency() {
  yield takeLatest(AGENCY_SAVE, saveAgency);
}

export function* watchFetchAgencyId() {
  yield takeLatest(AGENCY_FETCH_ID, fetchAgencyId);
}

export function* watchFetchAdAgency() {
  yield takeLatest(AGENCY_FETCH_AD_LIST, fetchAdAgencies);
}

export function* watchFetchAgencyAdId() {
  yield takeLatest(AGENCY_FETCH_AD_ID, fetchAgencyAdId);
}

export function* watchFetchAgency() {
  yield takeLatest(AGENCY_FETCH_LIST, fetchAgencies);
}

const getMeAsync = async () => await getMe();

export function* getMyProfile() {
  try {
    const response = yield call(getMeAsync);
    yield put(getMyProfileSuccess(response.data));
  } catch (err) {
    NotificationManager.error(
      'Erro ao carregar dados',
      'Erro',
      3000,
      null,
      null,
      ''
    );
    yield put(getMyProfileError('Erro ao carregar dados'));
  }
}

export function* watchGetMyProfile() {
  yield takeEvery(AGENCY_GET_PROFILE, getMyProfile);
}

const editProfileAsync = async params => await editPerfil(params);

const editImageAsync = async file => await editProfileImage(file);

export function* editMyProfile({ payload }) {
  const { params, file } = payload;
  const { history } = params;

  try {
    const { status } = yield call(editProfileAsync, params);
    if (status === 200) {
      if (file) {
        const formData = new FormData();
        formData.append('photo', file);
        yield call(editImageAsync, formData);
      }

      yield put(editMyProfileSuccess());
      NotificationManager.success(
        'Perfil atualizado com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      yield call(getMyProfile);
    } else {
      yield put(editMyProfileError('Erro ao atualizar perfil'));
    }
  } catch (err) {
    yield put(editMyProfileError('Erro ao atualizar perfil'));
  }
}

export function* watchEditMyProfile() {
  yield takeEvery(AGENCY_EDIT_PROFILE, editMyProfile);
}

export default function* rootSaga() {
  yield all([
    fork(watchAgencyApproval),
    fork(watchSaveAgency),
    fork(watchFetchAgency),
    fork(watchFetchAgencyId),
    fork(watchFetchAdAgency),
    fork(watchFetchAgencyAdId),
    fork(watchDisableAgencyAd),
    fork(watchEnableAgencyAd),
    fork(watchFetchAssignedAgents),
    fork(watchAssignAgent),
    fork(watchGetMyProfile),
    fork(watchEditMyProfile),
    fork(watchUnassignAgent),
  ]);
}
