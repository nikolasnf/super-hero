import {
  DASHBOARD_LIST,
  DASHBOARD_LIST_SUCCESS,
  DASHBOARD_LIST_ERROR,
  IMOB_DASHBOARD_GET_AGENTS,
  IMOB_DASHBOARD_GET_AGENTS_SUCCESS,
  IMOB_DASHBOARD_GET_AGENTS_ERROR,
} from '../actions';

export const dashboardList = payload => ({
  type: DASHBOARD_LIST,
  payload,
});

export const dashboardListSuccess = payload => ({
  type: DASHBOARD_LIST_SUCCESS,
  payload,
});

export const dashboardListError = payload => ({
  type: DASHBOARD_LIST_ERROR,
  payload,
});

export const imobDashboardGetAgents = payload => ({
  type: IMOB_DASHBOARD_GET_AGENTS,
  payload,
});

export const imobDashboardGetAgentsSuccess = payload => ({
  type: IMOB_DASHBOARD_GET_AGENTS_SUCCESS,
  payload,
});

export const imobDashboardGetAgentsError = payload => ({
  type: IMOB_DASHBOARD_GET_AGENTS_ERROR,
  payload,
});
