import { all, call, fork, put, takeLatest, select } from 'redux-saga/effects';
import {
  IMOB_AGENT_FETCH_LIST,
  IMOB_AGENT_APPROVE_ASSIGN,
  IMOB_AGENT_UNASSIGN,
  IMOB_SEARCH_FETCH_LIST,
  AGENCY_REQUEST_AGENT,
} from '../actions';
import { getAgents, aproveAssign, unassignAgent, requestAgent } from './api';
import {
  fetchAgentsSuccess,
  fetchAgentsError,
  fetchSearchAgentsSuccess,
  fetchSearchAgentsError,
  approveAssignSuccess,
  approveAssignError,
  unassignAgentSuccess,
  unassignAgentError,
  requestAgentSuccess,
  requestAgentError,
} from './actions';
import { NotificationManager } from '../../components/common/react-notifications';

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

export function* watchFetchAgent() {
  yield takeLatest(IMOB_AGENT_FETCH_LIST, fetchAgents);
}

const fetchSearchAgentsAsync = async filters => await getAgents(filters);

export function* fetchSearchAgents({ payload }) {
  const { filters } = payload;
  try {
    const { data, status } = yield call(fetchSearchAgentsAsync, filters);
    if (status === 200) {
      yield put(fetchSearchAgentsSuccess(data));
    }
  } catch (err) {
    yield put(fetchSearchAgentsError('Erro ao carregar corretores'));
  }
}

export function* watchFetchSearchAgent() {
  yield takeLatest(IMOB_SEARCH_FETCH_LIST, fetchSearchAgents);
}

const approveAssignAsync = async params => await aproveAssign(params);

export function* approveAssign({ payload }) {
  try {
    const { status, agent } = yield call(approveAssignAsync, payload);
    const imobData = yield select(state => state.agentImob.data);

    if (status === 200) {
      /*const filtered = imobData.map(e => {
        const { status, request_id } = payload;
        if (e?.request?.length) {
          const find = e.request.find(f => f.id === request_id);
          if (find) {
            find.status = status;
          }
        }
        return e;
      });*/

      const filtered = [...imobData];
      console.log('before', filtered);
      const index = imobData.findIndex(item => {
        return item?.request?.find(
          request => request.id === payload.request_id
        );
      });
      if (index !== -1) {
        console.log(index);
        filtered.splice(index, 1);
      }
      console.log('after', filtered);

      yield put(
        approveAssignSuccess({
          data: filtered,
        })
      );
      if (payload.status === 'assigned') {
        NotificationManager.success(
          'Corretor vinculado',
          'Sucesso',
          3000,
          null,
          null,
          ''
        );
      } else {
        NotificationManager.success(
          'Corretor recusado',
          'Sucesso',
          3000,
          null,
          null,
          ''
        );
      }
    }
  } catch (error) {
    yield put(approveAssignError());
    if (payload.status === 'assigned') {
      NotificationManager.error(
        'Erro ao vincular corretor',
        'Erro',
        3000,
        null,
        null,
        ''
      );
    } else {
      NotificationManager.error(
        'Erro ao recusar corretor',
        'Erro',
        3000,
        null,
        null,
        ''
      );
    }
  }
}

export function* watchApproveAssign() {
  yield takeLatest(IMOB_AGENT_APPROVE_ASSIGN, approveAssign);
}

const unassignAgentAsync = async id => await unassignAgent(id);

export function* unassign({ payload }) {
  try {
    const { id, stay } = payload;
    const { status, data } = yield call(unassignAgentAsync, {
      agent_id: id,
    });
    if (status === 200) {
      const imobData = yield select(state => state.agentImob.data);
      const filtered = [...imobData];

      const index = imobData.findIndex(
        item => id === item?.request[0]?.agent_id
      );

      if (index !== -1) {
        // eslint-disable-next-line no-unused-expressions
        stay ? (filtered[index] = data.agent) : filtered.splice(index, 1);
      }
      console.log('after', filtered);

      yield put(
        unassignAgentSuccess({
          data: filtered,
        })
      );
      NotificationManager.success(
        'Corretor desvinculado',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
    } else {
      yield put(unassignAgentError('Erro ao desvincular corretor'));
      NotificationManager.error(
        'Erro ao desvincular corretor',
        'Erro',
        3000,
        null,
        null,
        ''
      );
    }
  } catch (error) {
    console.log(error);
    yield put(unassignAgentError('Erro ao desvincular corretor'));
    NotificationManager.error(
      'Erro ao desvincular corretor',
      'Erro',
      3000,
      null,
      null,
      ''
    );
  }
}

export function* watchUnassign() {
  yield takeLatest(IMOB_AGENT_UNASSIGN, unassign);
}

const agentRequestAsync = async params => await requestAgent(params);

export function* agentRequest({ payload }) {
  try {
    const { data, status } = yield call(agentRequestAsync, {
      agent_id: payload,
    });

    if (status === 200) {
      const imobData = yield select(state => state.agentImob.data);
      yield put(
        requestAgentSuccess({
          data: [...imobData.filter(e => e.id !== payload), data.agent],
        })
      );
      NotificationManager.success(
        'Vinculo requisitado',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
    } else {
      yield put(requestAgentError());
      NotificationManager.error(
        'Erro ao requisitar vínculo',
        'Erro',
        3000,
        null,
        null,
        ''
      );
    }
  } catch (error) {
    yield put(requestAgentError());
    NotificationManager.error(
      'Erro ao requisitar vínculo',
      'Erro',
      3000,
      null,
      null,
      ''
    );
  }
}

export function* watchRequestAgent() {
  yield takeLatest(AGENCY_REQUEST_AGENT, agentRequest);
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchAgent),
    fork(watchApproveAssign),
    fork(watchUnassign),
    fork(watchFetchSearchAgent),
    fork(watchRequestAgent),
  ]);
}
