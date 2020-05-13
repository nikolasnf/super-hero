import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Agent = React.lazy(() =>
  import(/* webpackChunkName: "agentHistory" */ './AgentHistory.js')
);

const Agency = React.lazy(() =>
  import(/* webpackChunkName: "agencyHistory" */ './AgencyHistory.js')
);

const User = React.lazy(() =>
  import(/* webpackChunkName: "userHistory" */ './UserHistory.js')
);

const TransactionsRoute = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/agent`} />
      <Route
        path={`${match.url}/agent`}
        render={props => <Agent {...props} />}
      />
      <Route
        path={`${match.url}/agency`}
        render={props => <Agency {...props} />}
      />
      <Route
        path={`${match.url}/users`}
        render={props => <User {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default TransactionsRoute;
