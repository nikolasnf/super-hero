import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Issues = React.lazy(() =>
  import(/* webpackChunkName: "issues" */ './List')
);

const ViewIssue = React.lazy(() =>
  import(/* webpackChunkName: "viewIssue" */ './ViewIssue')
);

const Issue = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={props => <Issues {...props} />}
      />
      <Route
        path={`${match.url}/view/:id`}
        render={props => <ViewIssue {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Issue;
