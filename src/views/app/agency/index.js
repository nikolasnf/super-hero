import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../../layout/AppLayout';

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "dashboard" */ './Dashboard')
);

const Subscriptions = React.lazy(() =>
  import(/* webpackChunkName: "subscription" */ './Subscriptions')
);

const Ad = React.lazy(() =>
  import(/* webpackChunkName: "viwes-dashboard" */ './Ad')
);

const MyAccount = React.lazy(() =>
  import(/* webpackChunkName: "views-dashboard" */ './MyAccount')
);

const Agent = React.lazy(() =>
  import(/* webpackChunkName: "dashboard" */ './Agent')
);
const Waiting = React.lazy(() =>
  import(/* webpackChunkName: "dashboard" */ './waiting.js')
);

class App extends Component {
  render() {
    const { match } = this.props;
    return (
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect
            exact
            from={`${match.url}/`}
            to={`${match.url}/dashboard`}
          />
          <Route
            path={`${match.url}/dashboard`}
            render={props => <Dashboard {...props} />}
          />
          <Route
            path={`${match.url}/waiting`}
            render={props => <Waiting {...props} />}
          />
          <Route
            path={`${match.url}/announcements`}
            render={props => <Ad {...props} />}
          />
          <Route
            path={`${match.url}/account`}
            render={props => <MyAccount {...props} />}
          />
          <Route
            path={`${match.url}/agent`}
            render={props => <Agent {...props} />}
          />
          <Route
            path={`${match.url}/subscriptions`}
            render={props => <Subscriptions {...props} />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;

  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
