import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';

const Admin = React.lazy(() =>
  import(/* webpackChunkName: "dashboard" */ './admin')
);

const Agency = React.lazy(() =>
  import(/* webpackChunkName: "dashboard" */ './agency')
);

class App extends Component {
  renderView = () => {
    const {
      roles,
      match,
      history,
      location: { pathname },
    } = this.props;
    if (roles.includes('admin')) {
      if (pathname === '/app' || pathname === '/app/') {
        history.push('/app/admin');
      }

      return (
        <>
          {/* <Redirect from={`${match.url}/`} to={`${match.url}/admin`} /> */}
          <Route
            path={`${match.url}/admin`}
            render={props => <Admin {...props} />}
          />
        </>
      );
    }

    if (roles.includes('agency')) {
      if (pathname === '/app' || pathname === '/app/') {
        history.push('/app/agency');
      }

      return (
        <>
          {/* <Redirect exact from="/app/" to="/app/agency" /> */}
          <Route
            path={`${match.url}/agency`}
            render={props => <Agency {...props} />}
          />
        </>
      );
    }
  };

  render() {
    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>{this.renderView()}</Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { roles } = authUser;

  return { roles };
};

export default withRouter(connect(mapStateToProps, {})(App));
