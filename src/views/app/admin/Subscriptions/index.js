import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const NewAgency = React.lazy(() =>
  import(/* webpackChunkName: "newAgency" */ './Agencies/NewSubscription')
);

const EditAgency = React.lazy(() =>
  import(/* webpackChunkName: "editAgency" */ './Agencies/EditSubscription')
);

const Agency = React.lazy(() =>
  import(/* webpackChunkName: "agencies" */ './Agencies/List')
);

const NewAgent = React.lazy(() =>
  import(/* webpackChunkName: "newAgent" */ './Agents/NewSubscription')
);

const EditAgent = React.lazy(() =>
  import(/* webpackChunkName: "editAgent" */ './Agents/EditSubscription')
);

const Agent = React.lazy(() =>
  import(/* webpackChunkName: "agents" */ './Agents/List')
);

const Subscriptions = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/agent`} />

      <Route
        path={`${match.url}/agency/new`}
        render={props => <NewAgency {...props} />}
      />
      <Route
        path={`${match.url}/agency/edit/:id`}
        render={props => <EditAgency {...props} />}
      />
      <Route
        path={`${match.url}/agency`}
        render={props => <Agency {...props} />}
      />

      <Route
        path={`${match.url}/agent/new`}
        render={props => <NewAgent {...props} />}
      />
      <Route
        path={`${match.url}/agent/edit/:id`}
        render={props => <EditAgent {...props} />}
      />
      <Route
        path={`${match.url}/agent`}
        render={props => <Agent {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Subscriptions;
