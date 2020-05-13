import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { Redirect } from 'react-router-dom';
import {
  AD_SAVE,
  AD_FETCH_LIST,
  AD_FETCH_CONSTANTS,
  AD_ENABLE,
  AD_DISABLE,
  AD_FETCH_ID,
  AD_FETCH_CEP,
  AD_SOLD,
  AD_EDIT,
  AD_ACCEPT_REQUEST,
  AD_REQUEST_LIST,
  AD_REMOVE_REQUEST,
  AD_REQUEST_ID,
  AD_ACCEPT_SOLD_REQUEST,
  AD_REMOVE_SOLD_REQUEST,
} from '../actions';
import {
  getConstants,
  activateAds,
  deleteAds,
  getAd,
  getAds,
  getUserAd,
  createAd,
  getCep,
  getAdId,
  soldAdRequest,
  editAdRequest,
  getAdRequest,
  acceptAdRequest,
  removeAdRequest,
  getAdRequestId,
  acceptAdSoldRequest,
  removeAdSoldRequest,
} from './api';
import {
  fetchAdsSuccess,
  fetchAdsError,
  fetchConstantsSuccess,
  fetchConstantsError,
  saveAdSuccess,
  saveAdError,
  fetchAds as fetchAdsAction,
  fetchCepSuccess,
  fetchCepError,
  enableAdSuccess,
  enableAdError,
  disableAdSuccess,
  disableAdError,
  fetchAdIdSuccess,
  fetchAdIdError,
  soldAdSuccess,
  soldAdError,
  editAdSuccess,
  editAdError,
  acceptAdRequestError,
  acceptAdRequestSuccess,
  fetchAdRequestError,
  fetchAdRequestSuccess,
  removeAdRequestError,
  removeAdRequestSuccess,
  fetchAdRequestIdError,
  fetchAdRequestIdSuccess,
  acceptAdSoldRequestError,
  acceptAdSoldRequestSuccess,
  removeAdSoldRequestError,
  removeAdSoldRequestSuccess,
} from './actions';

import { NotificationManager } from '../../components/common/react-notifications';

const fetchConstantsAsync = async filters => await getConstants(filters);

const fetchCepAsync = async cep => await getCep(cep);

export function* fetchConstants({ payload }) {
  const { filters } = payload;

  try {
    const { data, status } = yield call(fetchConstantsAsync, filters);

    if (status === 200) {
      yield put(fetchConstantsSuccess(data));
    }
  } catch (err) {
    yield put(fetchConstantsError('Erro ao carregar constantes'));
  }
}

export function* fetchCep({ payload: { cep } }) {
  try {
    const { data, status } = yield call(fetchCepAsync, cep);

    if (status === 200) {
      yield put(fetchCepSuccess(data));
    }
  } catch (err) {
    yield put(fetchCepError());
  }
}

const saveAdAsync = async params => await createAd(params);

// const uploadAdImageAsync = async (profileFile, config) => await uploadProfileImage(profileFile, config);

export function* saveAd({ payload }) {
  const { params /* , adFile */ } = payload;
  const { history } = params;

  try {
    const response = yield call(saveAdAsync, params);
    if (response.status === 200) {
      // if(adFile) {
      //   const formDataAd = new FormData()
      //   formDataAd.append("photo", adFile);
      //   yield call(uploadAdImageAsync, formDataAd, {headers: {"Authorization": `Bearer ${data.token}`}});
      // }

      yield put(saveAdSuccess(response.data));
      NotificationManager.success(
        'Anúncio cadastrado com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      window.history.back();
    }
  } catch (err) {
    NotificationManager.error(
      'Erro ao cadastrar anuncio',
      'Erro',
      3000,
      null,
      null,
      ''
    );
    yield put(saveAdError('Erro ao salvar anúncio'));
  }
}

const enableAdAsync = async params => await activateAds(params);

export function* enableAd({ payload: { id, changeStatus } }) {
  try {
    const { status } = yield call(enableAdAsync, id);
    const { data } = yield select(state => state.ad);

    if (status === 200) {
      if (changeStatus) {
        data.status = 'active';
        yield put(
          enableAdSuccess({
            data,
          })
        );
      } else {
        yield put(
          enableAdSuccess({
            data: [...data.filter(e => e.id !== id)],
          })
        );
      }
    }
  } catch (err) {
    yield put(enableAdError());
  }
}

const disableAdAsync = async params => await deleteAds(params);

export function* disableAd({ payload: { id, changeStatus } }) {
  try {
    const { status } = yield call(disableAdAsync, id);
    const { data } = yield select(state => state.ad);

    if (status === 200) {
      if (changeStatus) {
        data.status = 'inactive';
        yield put(
          disableAdSuccess({
            data,
          })
        );
      } else {
        yield put(
          disableAdSuccess({
            data: [...data.filter(e => e.id !== id)],
          })
        );
      }
    }
  } catch (err) {
    yield put(disableAdError());
  }
}

const soldAdAsync = async params => await soldAdRequest(params);

export function* soldAd({ payload: { id, is_sold } }) {
  try {
    const { status } = yield call(soldAdAsync, { id, is_sold });
    const { data } = yield select(state => state.ad);

    if (status === 200) {
      data.sold = is_sold;
      yield put(
        soldAdSuccess({
          data,
        })
      );
    }
  } catch (err) {
    yield put(soldAdError());
  }
}

const editAdAsync = async params => await editAdRequest(params);

export function* editAd({ payload: { id, ...rest } }) {
  try {
    const { data, status } = yield call(editAdAsync, { id, ...rest });
    // const { data } = yield select(state => state.ad);

    if (status === 200) {
      yield put(
        editAdSuccess({
          data: data.data,
        })
      );
    }
  } catch (err) {
    yield put(editAdError());
  }
}

const fetchAdsAsync = async filters => await getAds(filters);

export function* fetchAds({ payload }) {
  try {
    const { data, status } = yield call(fetchAdsAsync, payload);
    if (status === 200) {
      const filteredData = data.data.map(item => ({
        ...item,
      }));
      yield put(
        fetchAdsSuccess({
          ...data,
          data: filteredData,
          lastPage: data.lastPage,
          page: data.page,
        })
      );
    }
  } catch (err) {
    yield put(fetchAdsError('Erro ao carregar anúncios'));
  }
}

const fetchAdIdAsync = async id => await getAdId(id);

export function* fetchAdId({ payload: { id } }) {
  try {
    const { data, status } = yield call(fetchAdIdAsync, id);
    if (status === 200) {
      yield put(fetchAdIdSuccess(data));
    }
  } catch (err) {
    yield put(fetchAdIdError('Erro ao carregar anúncio'));
  }
}

const fetchAdRequestAsync = async filters => await getAdRequest(filters);

export function* fetchAdRequestSaga({ payload }) {
  const { filters } = payload;
  console.log(filters);
  try {
    const response = yield call(fetchAdRequestAsync, filters);
    if (response.status === 200) {
      yield put(fetchAdRequestSuccess(response.data));
    }
  } catch (err) {
    yield put(fetchAdRequestError('Erro ao carregar solicitação de venda'));
  }
}

const acceptAdRequestAsync = async id => await acceptAdRequest(id);

export function* acceptAdRequestAd({ payload }) {
  const id = payload;
  try {
    const { status } = yield call(acceptAdRequestAsync, id);
    const { adRequestData } = yield select(state => state.ad);

    if (status === 200) {
      NotificationManager.success(
        'Corretagem aceita com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      yield put(
        acceptAdRequestSuccess({
          adRequestData,
        })
      );
    }
  } catch (err) {
    NotificationManager.success(
      'Erro ao aceitar corretagem',
      'Erro',
      3000,
      null,
      null,
      ''
    );
    yield put(acceptAdRequestError(err));
  }
}

const removeAdRequestAsync = async id => await removeAdRequest(id);

export function* removeAdRequestAd({ payload }) {
  const id = payload;
  try {
    const { status } = yield call(removeAdRequestAsync, id);
    const { adRequestData } = yield select(state => state.ad);

    if (status === 200) {
      NotificationManager.success(
        'Corretagem recusada com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      yield put(
        removeAdRequestSuccess({
          adRequestData,
        })
      );
    }
  } catch (err) {
    NotificationManager.success(
      'Erro ao recusar corretagem',
      'Erro',
      3000,
      null,
      null,
      ''
    );
    yield put(removeAdRequestError(err));
  }
}

const fetchAdRequestIdAsync = async id => await getAdRequestId(id);

export function* fetchAdRequestIdSaga({ payload }) {
  const id = payload;
  try {
    const { data, status } = yield call(fetchAdRequestIdAsync, id);
    if (status === 200) {
      yield put(fetchAdRequestIdSuccess(data));
    }
  } catch (err) {
    yield put(
      fetchAdRequestIdError('Erro ao carregar informações da solicitação')
    );
  }
}

const acceptAdSoldRequestAsync = async id => await acceptAdSoldRequest(id);

export function* acceptAdSoldRequestSaga({ payload }) {
  const id = payload;
  try {
    const { status } = yield call(acceptAdSoldRequestAsync, id);
    const { adRequestData } = yield select(state => state.ad);

    if (status === 200) {
      NotificationManager.success(
        'Solicitação de venda aceita com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      yield put(
        acceptAdSoldRequestSuccess({
          adRequestData,
        })
      );
    }
  } catch (err) {
    NotificationManager.success(
      'Erro ao aceitar solicitação de venda',
      'Erro',
      3000,
      null,
      null,
      ''
    );
    yield put(acceptAdSoldRequestError(err));
  }
}

const removeAdSoldRequestAsync = async id => await removeAdSoldRequest(id);

export function* removeAdSoldRequestSaga({ payload }) {
  const id = payload;
  try {
    const { status } = yield call(removeAdSoldRequestAsync, id);
    const { adRequestData } = yield select(state => state.ad);

    if (status === 200) {
      NotificationManager.success(
        'Solicitação de venda recusada com sucesso',
        'Sucesso',
        3000,
        null,
        null,
        ''
      );
      yield put(
        removeAdSoldRequestSuccess({
          adRequestData,
        })
      );
    }
  } catch (err) {
    NotificationManager.success(
      'Erro ao recusar solicitação de venda',
      'Erro',
      3000,
      null,
      null,
      ''
    );
    yield put(removeAdSoldRequestError(err));
  }
}

export function* watchAcceptAdSoldRequest() {
  yield takeLatest(AD_ACCEPT_SOLD_REQUEST, acceptAdSoldRequestSaga);
}

export function* watchRemoveAdSoldRequest() {
  yield takeLatest(AD_REMOVE_SOLD_REQUEST, removeAdSoldRequestSaga);
}

export function* watchFetchAdRequestId() {
  yield takeLatest(AD_REQUEST_ID, fetchAdRequestIdSaga);
}

export function* watchacceptAdRequest() {
  yield takeLatest(AD_ACCEPT_REQUEST, acceptAdRequestAd);
}

export function* watchremoveAdRequest() {
  yield takeLatest(AD_REMOVE_REQUEST, removeAdRequestAd);
}

export function* watchSaveAd() {
  yield takeLatest(AD_SAVE, saveAd);
}

export function* watchfetchAdRequest() {
  yield takeLatest(AD_REQUEST_LIST, fetchAdRequestSaga);
}
export function* watchFetchConstants() {
  yield takeLatest(AD_FETCH_CONSTANTS, fetchConstants);
}

export function* watchFetchAgencyId() {
  yield takeLatest(AD_FETCH_ID, fetchAdId);
}

export function* watchFetchAds() {
  yield takeLatest(AD_FETCH_LIST, fetchAds);
}

export function* watchFetchCep() {
  yield takeLatest(AD_FETCH_CEP, fetchCep);
}

export function* watchEnableAd() {
  yield takeLatest(AD_ENABLE, enableAd);
}

export function* watchDisableAd() {
  yield takeLatest(AD_DISABLE, disableAd);
}

export function* watchSoldAd() {
  yield takeLatest(AD_SOLD, soldAd);
}

export function* watchEditAd() {
  yield takeLatest(AD_EDIT, editAd);
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchConstants),
    fork(watchFetchAds),
    fork(watchSaveAd),
    fork(watchFetchCep),
    fork(watchEnableAd),
    fork(watchDisableAd),
    fork(watchFetchAgencyId),
    fork(watchSoldAd),
    fork(watchEditAd),
    fork(watchacceptAdRequest),
    fork(watchfetchAdRequest),
    fork(watchremoveAdRequest),
    fork(watchFetchAdRequestId),
    fork(watchAcceptAdSoldRequest),
    fork(watchRemoveAdSoldRequest),
  ]);
}
