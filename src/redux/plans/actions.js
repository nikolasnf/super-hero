import {
  PLANS_RESET_ID,
  PLANS_FETCH_ID,
  PLANS_FETCH_ID_SUCCESS,
  PLANS_FETCH_ID_ERROR,
  PLANS_FETCH_LIST,
  PLANS_FETCH_LIST_SUCCESS,
  PLANS_FETCH_LIST_ERROR,
  PLANS_SAVE,
  PLANS_SAVE_SUCCESS,
  PLANS_SAVE_ERROR,
  PLANS_ENABLE,
  PLANS_DISABLE,
  PLANS_ABLE_SUCCESS,
  PLANS_ABLE_RESET,
  PLANS_EDIT,
} from '../actions';

export const fetchPlans = filters => ({
  type: PLANS_FETCH_LIST,
  payload: { filters },
});

export const fetchPlansSuccess = data => ({
  type: PLANS_FETCH_LIST_SUCCESS,
  payload: data,
});

export const fetchPlansError = error => ({
  type: PLANS_FETCH_LIST_ERROR,
  payload: { error },
});

export const fetchPlanId = id => ({
  type: PLANS_FETCH_ID,
  payload: { id },
});

export const fetchPlanIdSuccess = data => ({
  type: PLANS_FETCH_ID_SUCCESS,
  payload: data,
});

export const fetchPlanIdError = error => ({
  type: PLANS_FETCH_ID_ERROR,
  payload: { error },
});

export const savePlan = (params, history) => ({
  type: PLANS_SAVE,
  payload: { params, history },
});

export const savePlansSuccess = () => ({
  type: PLANS_SAVE_SUCCESS,
});

export const savePlansError = error => ({
  type: PLANS_SAVE_ERROR,
  payload: { error },
});

export const enablePlan = id => ({
  type: PLANS_ENABLE,
  payload: { id },
});
export const disablePlan = id => ({
  type: PLANS_DISABLE,
  payload: { id },
});

export const editPlans = (id, params, history) => ({
  type: PLANS_EDIT,
  payload: { params, id, history },
});

export const ablePlansSuccess = () => ({
  type: PLANS_ABLE_SUCCESS,
});

export const ablePlansReset = () => ({
  type: PLANS_ABLE_RESET,
});
