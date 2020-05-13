import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Registered = React.lazy(() =>
  import(/* webpackChunkName: "registered" */ './Registered/List')
);

const AddRegistered = React.lazy(() =>
  import(/* webpackChunkName: "registered" */ './Registered/Form')
);

const BoostAd = React.lazy(() =>
  import(/* webpackChunkName: "boost" */ './Registered/BoostAd')
);

const SoldRequest = React.lazy(() =>
  import(/* webpackChunkName: "boost" */ './SoldRequest/List')
);

const SoldInfo = React.lazy(() =>
  import(/* webpackChunkName: "boost" */ './SoldRequest/SoldInfo')
);

const Ads = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route
        path={`${match.url}/list`}
        render={props => <Registered {...props} />}
      />
      <Route
        path={`${match.url}/disabled`}
        render={props => <Registered {...props} type="disabled" />}
      />
      <Route
        path={`${match.url}/soldRequest/:id`}
        render={props => <SoldInfo {...props} />}
      />
      <Route
        path={`${match.url}/soldRequest`}
        render={props => <SoldRequest {...props} />}
      />
      <Route
        path={`${match.url}/sold`}
        render={props => <Registered {...props} type="sold" />}
      />
      <Route
        path={`${match.url}/new`}
        render={props => <AddRegistered {...props} />}
      />
      <Route
        path={`${match.url}/:id/boost`}
        render={props => <BoostAd {...props} />}
      />

      <Route
        path={`${match.url}/:id`}
        render={props => <AddRegistered {...props} readOnly />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Ads;
