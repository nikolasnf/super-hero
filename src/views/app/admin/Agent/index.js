import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Users = React.lazy(() =>
  import(/* webpackChunkName: "users" */ './Users/List')
);

const Profile = React.lazy(() =>
  import(/* webpackChunkName: "users" */ './Users/Profile')
);

const AddUser = React.lazy(() =>
  import(/* webpackChunkName: "users" */ './Users/Form')
);

const Ad = React.lazy(() =>
  import(/* webpackChunkName: "announcement" */ './Ads')
);

const Assign = React.lazy(() =>
  import(/* webpackChunkName: "assign" */ './Agencies/List')
);

const Agent = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={props => <Users {...props} />}
      />
      <Route
        path={`${match.url}/new`}
        render={props => <AddUser {...props} />}
      />
      <Route
        path={`${match.url}/request/:id`}
        render={props => <AddUser {...props} readOnly />}
      />
      <Route
        path={`${match.url}/info/:id`}
        render={props => <Profile {...props} />}
      />
      <Route
        path={`${match.url}/announcements`}
        render={props => <Ad {...props} />}
      />
      <Route
        path={`${match.url}/assign/:id`}
        render={props => <Assign {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Agent;
