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
  AGENT_SAVE,
  AGENT_FETCH_LIST,
  AGENT_FETCH_ID,
  AGENT_ACCEPT,
  AGENT_ASSIGN_AGENCY,
  AGENT_FETCH_ASSIGNED_AGENCIES,
  AGENT_UNASSIGN_AGENCY,
} from '../actions';
import {
  getAgents,
  createAgent,
  getAgent,
  approvalAgent,
  uploadCreciImage,
  uploadProfileImage,
  getAssignedAgenciesAdmin,
  assignAgencyAdmin,
  unassignAgencyAdmin,
} from './api';
import {
  fetchAgentsSuccess,
  fetchAgentsError,
  saveAgentSuccess,
  saveAgentError,
  fetchAgents as fetchAgentsAction,
  fetchAgentIdSuccess,
  fetchAgentIdError,
  agentApprovalSuccess,
  agentApprovalError,
  fetchAssignedAgencies as fetchAssignedAgenciesAction,
  fetchAssignedAgenciesSuccess,
  fetchAssignedAgenciesError,
  AssignAgencySuccess,
  AssignAgencyError,
} from './actions';
import { NotificationManager } from '../../components/common/react-notifications';
import { unassignAgentSuccess, unassignAgentError } from '../agency/actions';

export function* watchSaveAgent() {
  yield takeLatest(AGENT_SAVE, saveAgent);
}
export function* watchFetchAgent() {
  yield takeLatest(AGENT_FETCH_LIST, fetchAgents);
}
export function* watchFetchAgentId() {
  yield takeLatest(AGENT_FETCH_ID, fetchAgentId);
}

const fetchAgentsAsync = async filters => await getAgents(filters);

export function* fetchAgents({ payload }) {
  const { filters } = payload;

  try {
    const { data, status } = yield call(fetchAgentsAsync, filters);
    if (status === 200) {
      const filteredData = data.data.map(item => ({
        ...item,
        ...item.profile.agent,
        ...item.profile.address,
        ...item.profile,
      }));
      yield put(fetchAgentsSuccess({ ...data, data: filteredData }));
    }
  } catch (err) {
    yield put(fetchAgentsError('Erro ao carregar Imobiliárias'));
  }
}

const fetchAgentIdAsync = async id => await getAgent(id);

export function* fetchAgentId({ payload }) {
  const { id } = payload;

  try {
    const { data, status } = yield call(fetchAgentIdAsync, id);
    if (status === 200) {
      yield put(
        fetchAgentIdSuccess({
          ...data,
          ...data.profile.agent,
          ...data.profile.address,
          ...data.profile,
        })
      );
    }
  } catch (err) {
    yield put(fetchAgentIdError('Erro ao carregar Corretor'));
  }
}

export function* watchAgentApproval() {
  yield takeEvery(AGENT_ACCEPT, agentApproval);
}

export const agentApprovalAsync = async (id, params) =>
  await approvalAgent(id, params);

export function* agentApproval({ payload }) {
  const { id, ...params } = payload;
  try {
    const { data, status } = yield call(agentApprovalAsync, id, params);
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
      yield put(agentApprovalSuccess());
      yield put(fetchAgentsAction(params));
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
    yield put(agentApprovalError(err));
  }
}

const saveAgentsAsync = async params => await createAgent(params);

const uploadProfileImageAsync = async (profileFile, config) =>
  await uploadProfileImage(profileFile, config);

const uploadCreciImageAsync = async (creciFile, config) =>
  await uploadCreciImage(creciFile, config);

export function* saveAgent({ payload }) {
  const { params, profileFile, creciFile } = payload;
  const { history } = params;

  try {
    const { data, status } = yield call(saveAgentsAsync, params);

    if (status === 200) {
      if (profileFile) {
        const formDataProfile = new FormData();
        formDataProfile.append('photo', profileFile);
        yield call(uploadProfileImageAsync, formDataProfile, {
          headers: { Authorization: `Bearer ${data.token}` },
        });
      }

      if (creciFile) {
        const formDataCreci = new FormData();
        formDataCreci.append('photo', creciFile);
        yield call(uploadCreciImageAsync, formDataCreci, {
          headers: { Authorization: `Bearer ${data.token}` },
        });
      }

      yield put(saveAgentSuccess(data));
      NotificationManager.success(
        'Corretor cadastrado com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      history.goBack();
      yield put(fetchAgentsAction());
    }
  } catch (err) {
    yield put(saveAgentError('Erro ao salvar corretor'));
  }
}

const fetchAssignedAgenciesAsync = async (id, filters) =>
  await getAssignedAgenciesAdmin(id, filters);

export function* fetchAssignedAgencies({ payload }) {
  const { id, filters } = payload;

  try {
    const { data, status } = yield call(
      fetchAssignedAgenciesAsync,
      id,
      filters
    );

    if (status === 200) {
      yield put(fetchAssignedAgenciesSuccess(data));
    }
  } catch (err) {
    yield put(
      fetchAssignedAgenciesError('Erro ao carregar corretores vinculados')
    );
  }
}

export function* watchFetchAssignedAgencies() {
  yield takeLatest(AGENT_FETCH_ASSIGNED_AGENCIES, fetchAssignedAgencies);
}

const assignAgencyAsync = async (id, agentId) =>
  await assignAgencyAdmin(id, agentId);

export function* agentAssigning({ payload }) {
  const { agentId, agencyId } = payload;
  const list = yield select(state => state.agent.assignedData);
  try {
    const response = yield call(assignAgencyAsync, agentId, {
      agency_id: agencyId,
    });

    if (response.status === 200) {
      const { agency } = response.data;
      NotificationManager.success(
        'Corretor vinculado com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      const index = list.findIndex(item => item.id === agencyId);

      //const before = list;
      const after = [...list];
      after[index] = agency;

      yield put(AssignAgencySuccess([...after]));
    } else {
      yield put(AssignAgencyError('Erro ao vincular corretor'));
    }
  } catch (err) {
    if (err.response?.data?.success === false) {
      NotificationManager.error(
        err.response.data.message[0],
        'Erro',
        3000,
        null,
        null,
        ''
      );
    } else {
      NotificationManager.error(
        'Ocorreu um erro ao vincular corretor',
        'erro',
        3000,
        null,
        null,
        ''
      );
    }
    yield put(AssignAgencyError('Erro ao vincular corretor'));
  }
}

export function* watchAssignAgent() {
  yield takeEvery(AGENT_ASSIGN_AGENCY, agentAssigning);
}

const unassignAgencyAsync = async (id, agentId) =>
  await unassignAgencyAdmin(id, agentId);

export function* unassignAgency({ payload }) {
  const { agentId, agencyId, history } = payload;
  const list = yield select(state => state.agent.assignedData);
  try {
    const response = yield call(unassignAgencyAsync, agentId, {
      agency_id: agencyId,
    });

    if (response.status === 200) {
      const { agency } = response.data;
      NotificationManager.success(
        'Corretor desvinculado com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );

      const index = list.findIndex(item => item.id === agencyId);

      //const before = list;
      console.log(index);
      const after = [...list];

      after[index] = agency;

      history && history.goBack();

      yield put(unassignAgentSuccess([...after]));
      history.goBack();
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
  yield takeEvery(AGENT_UNASSIGN_AGENCY, unassignAgency);
}

export default function* rootSaga() {
  yield all([
    fork(watchAgentApproval),
    fork(watchSaveAgent),
    fork(watchFetchAgent),
    fork(watchFetchAgentId),
    fork(watchUnassignAgent),
    fork(watchAssignAgent),
    fork(watchFetchAssignedAgencies),
  ]);
}
