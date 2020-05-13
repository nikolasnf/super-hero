import React, { Component, Suspense } from 'react';
import {
  Row,
  Container,
  Col,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  Card,
  CardBody,
  Spinner,
} from 'reactstrap';
import classNames from 'classnames';
import { connect } from 'react-redux';
import AgencyList from './components/AgencyList';
import IntlMessages from '../../../../../helpers/IntlMessages';
import './styles.scss';
import {
  fetchAgenciesSubscription,
  ableAgenciesSubscriptionReset,
  enableAgenciesSubscription,
  disableAgenciesSubscription,
} from '../../../../../redux/subscription/actions';
import DataTablePagination from '../../../../../components/DatatablePagination';

import CustomSpinner from '../../../../../components/customSpinner';

class AgenciesSubscriptionList extends Component {
  state = {
    tab: 0,
    width: window.innerWidth,
    search: '',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.props.fetchAgenciesSubscription();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.ableSuccess && nextProps.ableSuccess) {
      this.onPageChange(this.props.page - 1);
      this.props.ableAgenciesSubscriptionReset();
      return false;
    }
    return true;
  }

  resizeListener = () => {
    const width = window.innerWidth;
    this.setState({ width });
  };

  handleSearch = e => {
    this.setState({ search: e.target.value });
  };

  searchName = () => {
    this.props.fetchAgenciesSubscription({
      name: this.state.search,
    });
  };

  onPageChange = page => {
    this.props.fetchAgenciesSubscription({
      page: page + 1,
      name: this.state.search,
    });
  };

  render() {
    return (
      <Card>
        <CardBody>
          <Container fluid>
            <Row className={classNames('align-items-center', 'mb-3')}>
              <Col sm="12" md="6" lg="5">
                <div
                  className={classNames(
                    'justify-content-center',
                    'justify-content-md-start',
                    'd-flex flex-nowrap',
                    'align-items-center',
                    'mb-2'
                  )}
                >
                  <div
                    className={classNames(
                      'text-truncate',
                      'text-nowrap',
                      'agent-tab',
                      'align-items-center',
                      'font-weight-bold'
                    )}
                  >
                    <h4 className={classNames('mb-0')}>
                      <IntlMessages id="subs.manageAgency" />
                    </h4>
                  </div>
                </div>
              </Col>

              <Col className="col">
                <InputGroup>
                  <Input
                    placeholder="Pesquisar"
                    onChange={this.handleSearch}
                    onKeyPress={e => e.key === 'Enter' && this.searchName()}
                  />
                  <InputGroupAddon addonType="append">
                    <Button outline color="primary">
                      <i className="simple-icon-magnifier" />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Col>

              <Col
                sm="12"
                md="12"
                lg="2"
                className={classNames('mb-2', 'mt-2')}
              >
                <Button
                  size="sm"
                  color="primary"
                  block={this.state.width <= 978}
                  onClick={() =>
                    this.props.history.push(
                      `/app/admin/subscriptions/agency/new`
                    )
                  }
                >
                  <IntlMessages id="agency.add-button" />
                </Button>
              </Col>
            </Row>

            <Row>
              <Suspense fallback={<div className="loading" />}>
                {console.log(this.props.data)}
                <AgencyList
                  history={this.props.history}
                  agencies={this.props.data}
                  enableAgency={this.props.enableAgenciesSubscription}
                  disableAgency={this.props.disableAgenciesSubscription}
                  page={this.props.page}
                />
                {this.props.loading && <CustomSpinner />}
                <div className="mt-3 mb-3 col-12">
                  <DataTablePagination
                    pages={this.props.pages}
                    page={this.props.page - 1}
                    onPageChange={this.onPageChange}
                  />
                </div>
              </Suspense>
            </Row>
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  page: state.subscription.page,
  pages: state.subscription.pages,
  data: state.subscription.data,
  loading: state.subscription.fetchLoading,
  error: state.subscription.fetchError,
  ableSuccess: state.subscription.ableSuccess,
});

const mapActionsToProps = {
  fetchAgenciesSubscription,
  enableAgenciesSubscription,
  disableAgenciesSubscription,
  ableAgenciesSubscriptionReset,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AgenciesSubscriptionList);
