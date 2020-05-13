import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ViewAgent = React.lazy(() =>
  import(/* webpackChunkName: "viewAgent" */ './Agents/ViewAgent')
);

const Agent = React.lazy(() =>
  import(/* webpackChunkName: "agents" */ './Agents/List')
);

const ViewPropertie = React.lazy(() =>
  import(/* webpackChunkName: "viewPropertie" */ './Properties/ViewPropertie')
);

const Propertie = React.lazy(() =>
  import(/* webpackChunkName: "properties" */ './Properties/List')
);

const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "viewUser" */ './Users/ViewUser')
);

const User = React.lazy(() =>
  import(/* webpackChunkName: "users" */ './Users/List')
);

const Ratings = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/agent`} />

      <Route
        path={`${match.url}/agent/view/:id`}
        render={props => <ViewAgent {...props} />}
      />
      <Route
        path={`${match.url}/agent`}
        render={props => <Agent {...props} />}
      />

      <Route
        path={`${match.url}/properties/view/:id`}
        render={props => <ViewPropertie {...props} />}
      />
      <Route
        path={`${match.url}/properties`}
        render={props => <Propertie {...props} />}
      />

      <Route
        path={`${match.url}/users/view/:id`}
        render={props => <ViewUser {...props} />}
      />
      <Route
        path={`${match.url}/users`}
        render={props => <User {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Ratings;
