import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import agency from './agency/reducer';
import agent from './agent/reducer';
import user from './user/reducer';
import subscription from './subscription/reducer';
import rating from './rating/reducer';
import plans from './plans/reducer';
import transaction from './transaction/reducer';
import issues from './issues/reducer';
import ad from './ad/reducer';
import agentImob from './agent_imob/reducer';
import creci from './creci/reducer';
import dashboard from './dashboard/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  agency,
  agent,
  user,
  rating,
  plans,
  subscription,
  transaction,
  issues,
  ad,
  agentImob,
  creci,
  dashboard,
});

export default reducers;
