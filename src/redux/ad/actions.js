import {
  AD_FETCH_CONSTANTS,
  AD_FETCH_CONSTANTS_SUCCESS,
  AD_FETCH_CONSTANTS_ERROR,
  AD_FETCH_LIST,
  AD_FETCH_LIST_SUCCESS,
  AD_FETCH_LIST_ERROR,
  AD_FETCH_ID,
  AD_FETCH_ID_ERROR,
  AD_FETCH_ID_SUCCESS,
  AD_SAVE,
  AD_SAVE_SUCCESS,
  AD_SAVE_ERROR,
  AD_ENABLE,
  AD_ENABLE_SUCCESS,
  AD_ENABLE_ERROR,
  AD_DISABLE,
  AD_DISABLE_SUCCESS,
  AD_DISABLE_ERROR,
  AD_FETCH_CEP,
  AD_FETCH_CEP_SUCCESS,
  AD_FETCH_CEP_ERROR,
  AD_SOLD,
  AD_SOLD_ERROR,
  AD_SOLD_SUCCESS,
  AD_EDIT,
  AD_EDIT_ERROR,
  AD_EDIT_SUCCESS,
  AD_REQUEST_LIST,
  AD_REQUEST_LIST_SUCCESS,
  AD_REQUEST_LIST_ERROR,
  AD_REQUEST_ID,
  AD_REQUEST_ID_SUCCESS,
  AD_REQUEST_ID_ERROR,
  AD_ACCEPT_REQUEST,
  AD_ACCEPT_REQUEST_SUCCESS,
  AD_ACCEPT_REQUEST_ERROR,
  AD_REMOVE_REQUEST,
  AD_REMOVE_REQUEST_SUCCESS,
  AD_REMOVE_REQUEST_ERROR,
  AD_ACCEPT_SOLD_REQUEST,
  AD_ACCEPT_SOLD_REQUEST_SUCCESS,
  AD_ACCEPT_SOLD_REQUEST_ERROR,
  AD_REMOVE_SOLD_REQUEST,
  AD_REMOVE_SOLD_REQUEST_SUCCESS,
  AD_REMOVE_SOLD_REQUEST_ERROR,
} from '../actions';

export const fetchConstants = filters => ({
  type: AD_FETCH_CONSTANTS,
  payload: { filters },
});

export const fetchConstantsSuccess = data => ({
  type: AD_FETCH_CONSTANTS_SUCCESS,
  payload: data,
});

export const fetchConstantsError = error => ({
  type: AD_FETCH_CONSTANTS_ERROR,
  payload: { error },
});

export const fetchCep = payload => ({
  type: AD_FETCH_CEP,
  payload,
});

export const fetchCepSuccess = payload => ({
  type: AD_FETCH_CEP_SUCCESS,
  payload,
});

export const fetchCepError = error => ({
  type: AD_FETCH_CEP_ERROR,
  payload: { error },
});

export const fetchAds = payload => ({
  type: AD_FETCH_LIST,
  payload,
});

export const fetchAdsSuccess = data => ({
  type: AD_FETCH_LIST_SUCCESS,
  payload: data,
});

export const fetchAdsError = error => ({
  type: AD_FETCH_LIST_ERROR,
  payload: { error },
});

export const enableAd = payload => ({
  type: AD_ENABLE,
  payload,
});

export const enableAdSuccess = payload => ({
  type: AD_ENABLE_SUCCESS,
  payload,
});

export const enableAdError = error => ({
  type: AD_ENABLE_ERROR,
  payload: { error },
});

export const disableAd = payload => ({
  type: AD_DISABLE,
  payload,
});

export const disableAdSuccess = payload => ({
  type: AD_DISABLE_SUCCESS,
  payload,
});

export const disableAdError = error => ({
  type: AD_DISABLE_ERROR,
  payload: { error },
});

export const fetchAdId = payload => ({
  type: AD_FETCH_ID,
  payload,
});

export const fetchAdIdSuccess = data => ({
  type: AD_FETCH_ID_SUCCESS,
  payload: data,
});

export const fetchAdIdError = error => ({
  type: AD_FETCH_ID_ERROR,
  payload: { error },
});

export const saveAd = (params, file) => ({
  type: AD_SAVE,
  payload: { params, file },
});

export const saveAdSuccess = data => ({
  type: AD_SAVE_SUCCESS,
  payload: { data },
});

export const saveAdError = error => ({
  type: AD_SAVE_ERROR,
  payload: { error },
});

export const soldAd = payload => ({
  type: AD_SOLD,
  payload,
});

export const soldAdSuccess = payload => ({
  type: AD_SOLD_SUCCESS,
  payload,
});

export const soldAdError = error => ({
  type: AD_SOLD_ERROR,
  payload: { error },
});

export const editAd = payload => ({
  type: AD_EDIT,
  payload,
});

export const editAdSuccess = payload => ({
  type: AD_EDIT_SUCCESS,
  payload,
});

export const editAdError = error => ({
  type: AD_EDIT_ERROR,
  payload: { error },
});

export const fetchAdRequest = filters => ({
  type: AD_REQUEST_LIST,
  payload: { filters },
});

export const fetchAdRequestSuccess = data => ({
  type: AD_REQUEST_LIST_SUCCESS,
  payload: data,
});

export const fetchAdRequestError = error => ({
  type: AD_REQUEST_LIST_ERROR,
  payload: { error },
});

export const acceptAdRequest = payload => ({
  type: AD_ACCEPT_REQUEST,
  payload,
});

export const acceptAdRequestSuccess = payload => ({
  type: AD_ACCEPT_REQUEST_SUCCESS,
  payload,
});

export const acceptAdRequestError = payload => ({
  type: AD_ACCEPT_REQUEST_ERROR,
  payload,
});

export const removeAdRequest = payload => ({
  type: AD_REMOVE_REQUEST,
  payload,
});

export const removeAdRequestSuccess = payload => ({
  type: AD_REMOVE_REQUEST_SUCCESS,
  payload,
});

export const removeAdRequestError = payload => ({
  type: AD_REMOVE_REQUEST_ERROR,
  payload,
});

export const fetchAdRequestId = payload => ({
  type: AD_REQUEST_ID,
  payload,
});

export const fetchAdRequestIdSuccess = data => ({
  type: AD_REQUEST_ID_SUCCESS,
  payload: data,
});

export const fetchAdRequestIdError = error => ({
  type: AD_REQUEST_ID_ERROR,
  payload: { error },
});

export const acceptAdSoldRequest = payload => ({
  type: AD_ACCEPT_SOLD_REQUEST,
  payload,
});

export const acceptAdSoldRequestSuccess = payload => ({
  type: AD_ACCEPT_SOLD_REQUEST_SUCCESS,
  payload,
});

export const acceptAdSoldRequestError = payload => ({
  type: AD_ACCEPT_SOLD_REQUEST_ERROR,
  payload,
});

export const removeAdSoldRequest = payload => ({
  type: AD_REMOVE_SOLD_REQUEST,
  payload,
});

export const removeAdSoldRequestSuccess = payload => ({
  type: AD_REMOVE_SOLD_REQUEST_SUCCESS,
  payload,
});

export const removeAdSoldRequestError = payload => ({
  type: AD_REMOVE_SOLD_REQUEST_ERROR,
  payload,
});
