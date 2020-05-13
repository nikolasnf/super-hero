import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Requests = React.lazy(() =>
  import(/* webpackChunkName: "users" */ './Requests/List')
);

const RequestInfo = React.lazy(() =>
  import(/* webpackChunkName: "users" */ './Requests/Profile')
);
const CreciRequests = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={props => <Requests {...props} />}
      />
      <Route
        path={`${match.url}/info/:id`}
        render={props => <RequestInfo {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default CreciRequests;
