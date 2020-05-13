import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import agencySagas from './agency/saga';
import agentSagas from './agent/saga';
import userSagas from './user/saga';
import plansSagas from './plans/saga';
import ratingSagas from './rating/saga';
import subscriptionSagas from './subscription/saga';
import transactionSagas from './transaction/saga';
import issuesSagas from './issues/saga';
import adSagas from './ad/saga';
import agentImobSagas from './agent_imob/saga';
import creciSagas from './creci/saga';
import dashboardSagas from './dashboard/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    agencySagas(),
    agentSagas(),
    userSagas(),
    plansSagas(),
    subscriptionSagas(),
    ratingSagas(),
    transactionSagas(),
    issuesSagas(),
    adSagas(),
    agentImobSagas(),
    creciSagas(),
    dashboardSagas(),
  ]);
}
