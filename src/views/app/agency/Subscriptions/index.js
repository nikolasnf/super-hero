import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const List = React.lazy(() =>
  import(/* webpackChunkName: "dashboard" */ './List')
);

const Payment = React.lazy(() =>
  import(/* webpackChunkName: "subscription" */ './PaymentForm')
);

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
          <Route
            path={`${match.url}/list`}
            render={props => <List {...props} />}
          />
          <Route
            path={`${match.url}/payment/:id`}
            render={props => <Payment {...props} />}
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
