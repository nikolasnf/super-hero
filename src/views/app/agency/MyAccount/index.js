import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Me = React.lazy(() => import(/* webpackChunkName: "me" */ './Me'));

const MyAccount = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/me`} />
      <Route path={`${match.url}/me`} render={props => <Me {...props} />} />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MyAccount;
