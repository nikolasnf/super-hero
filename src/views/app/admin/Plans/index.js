import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Plans = React.lazy(() =>
  import(/* webpackChunkName: "plans" */ './List')
);

const NewPlan = React.lazy(() =>
  import(/* webpackChunkName: "newPlan" */ './NewPlan')
);

const EditPlan = React.lazy(() =>
  import(/* webpackChunkName: "editPlan" */ './EditPlan')
);

const Plan = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={props => <Plans {...props} />}
      />
      <Route
        path={`${match.url}/new`}
        render={props => <NewPlan {...props} />}
      />
      <Route
        path={`${match.url}/edit/:id`}
        render={props => <EditPlan {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Plan;
