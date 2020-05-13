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
import AgentList from './components/AgentList';
import IntlMessages from '../../../../../helpers/IntlMessages';
import {
  fetchAgentsSubscription,
  enableSubscriptionAgent,
  ableSubscriptionAgentReset,
  disableSubscriptionAgent,
} from '../../../../../redux/subscription/actions';
import DataTablePagination from '../../../../../components/DatatablePagination';
import CustomSpinner from '../../../../../components/customSpinner';

class AgentsList extends Component {
  state = {
    tab: 0,
    width: window.innerWidth,
    search: '',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.props.fetchAgentsSubscription();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.ableSuccess && nextProps.ableSuccess) {
      this.onPageChange(this.props.page - 1);
      this.props.ableSubscriptionAgentReset();
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

  onPageChange = page => {
    this.props.fetchAgentsSubscription({
      page: page + 1,
      requests: Boolean(this.state.tab),
      name: this.state.search,
    });
  };

  searchName = () => {
    this.props.fetchAgentsSubscription({
      requests: Boolean(this.state.tab),
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
                      <IntlMessages id="subs.manageAgent" />
                    </h4>
                  </div>
                </div>
              </Col>

              <Col className="col">
                <InputGroup>
                  <Input
                    placeholder="Pesquisar"
                    onKeyPress={e => e.key === 'Enter' && this.searchName()}
                    onChange={this.handleSearch}
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
                      `/app/admin/subscriptions/agent/new`
                    )
                  }
                >
                  <IntlMessages id="agency.add-button" />
                </Button>
              </Col>
            </Row>

            <Row>
              <Suspense fallback={<div className="loading" />}>
                <AgentList
                  history={this.props.history}
                  agents={this.props.data}
                  enableSubscriptionAgent={this.props.enableSubscriptionAgent}
                  disableSubscriptionAgent={this.props.disableSubscriptionAgent}
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
  fetchAgentsSubscription,
  enableSubscriptionAgent,
  disableSubscriptionAgent,
  ableSubscriptionAgentReset,
};

export default connect(mapStateToProps, mapActionsToProps)(AgentsList);
