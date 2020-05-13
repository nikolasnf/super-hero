import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Users = React.lazy(() =>
  import(/* webpackChunkName: "users" */ './List')
);

const Brokerage = React.lazy(() =>
  import(/* webpackChunkName: "users" */ './Brokerage')
);

const BrokerageInfo = React.lazy(() =>
  import(/* webpackChunkName: "users" */ './BrokerageInfo')
);

const Profile = React.lazy(() =>
  import(/* webpackChunkName: "users" */ './Profile')
);

const AddUser = React.lazy(() =>
  import(/* webpackChunkName: "users" */ './Form')
);

const SearchAgent = React.lazy(() =>
  import(/* webpackChunkName: "users" */ './Search/List')
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
        path={`${match.url}/request/:id`}
        render={props => <AddUser {...props} />}
      />
      <Route
        path={`${match.url}/info/:id`}
        render={props => <Profile {...props} />}
      />
      <Route
        path={`${match.url}/search`}
        render={props => <SearchAgent {...props} />}
      />
      <Route
        path={`${match.url}/brokerage/:id`}
        render={props => <BrokerageInfo {...props} />}
      />
      <Route
        path={`${match.url}/brokerage`}
        render={props => <Brokerage {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Agent;
