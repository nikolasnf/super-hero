import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../../layout/AppLayout';

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "dashboard" */ './dashboard.js')
);

const Agency = React.lazy(() =>
  import(/* webpackChunkName: "viwes-dashboard" */ './Agency')
);

const Agent = React.lazy(() =>
  import(/* webpackChunkName: "viwes-dashboard" */ './Agent')
);

const Users = React.lazy(() =>
  import(/* webpackChunkName: "viwes-dashboard" */ './Users')
);

const Subscriptions = React.lazy(() =>
  import(/* webpackChunkName: "viwes-dashboard" */ './Subscriptions')
);

const Plans = React.lazy(() =>
  import(/* webpackChunkName: "viwes-d-ashboard" */ './Plans')
);

const Transactions = React.lazy(() =>
  import(/* webpackChunkName: "viwes-d-ashboard" */ './Transactions')
);

const Ratings = React.lazy(() =>
  import(/* webpackChunkName: "viwes-dashboard" */ './Ratings')
);

const Issues = React.lazy(() =>
  import(/* webpackChunkName: "Issues" */ './Issues')
);

const CreciRequests = React.lazy(() =>
  import(/* webpackChunkName: "CreciRequests" */ './CreciRequests')
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
            path={`${match.url}/agency`}
            render={props => <Agency {...props} />}
          />
          <Route
            path={`${match.url}/agent`}
            render={props => <Agent {...props} />}
          />
          <Route
            path={`${match.url}/users`}
            render={props => <Users {...props} />}
          />
          <Route
            path={`${match.url}/subscriptions`}
            render={props => <Subscriptions {...props} />}
          />
          <Route
            path={`${match.url}/plans`}
            render={props => <Plans {...props} />}
          />
          <Route
            path={`${match.url}/transactions`}
            render={props => <Transactions {...props} />}
          />
          <Route
            path={`${match.url}/ratings`}
            render={props => <Ratings {...props} />}
          />
          <Route
            path={`${match.url}/issues`}
            render={props => <Issues {...props} />}
          />
          <Route
            path={`${match.url}/creci-requests`}
            render={props => <CreciRequests {...props} />}
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
