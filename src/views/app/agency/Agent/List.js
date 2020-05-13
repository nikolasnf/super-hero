import React, { Component, Fragment, Suspense } from 'react';
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
} from 'reactstrap';
import { connect } from 'react-redux';
import classNames from 'classnames';
import './styles.scss';
import {
  fetchAgents,
  approveAssign,
  unassignAgent,
} from '../../../../redux/agent_imob/actions';
import AgentList from './components/AgentList';
import IntlMessages from '../../../../helpers/IntlMessages';
import DataTablePagination from '../../../../components/DatatablePagination';
import CustomSpinner from '../../../../components/customSpinner';

class UserList extends Component {
  state = {
    tab: 0,
    width: window.innerWidth,
    search: '',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.props.fetchAgents({ status: 'assigned' });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.ableSuccess && nextProps.ableSuccess) {
      this.onPageChange(this.props.page - 1);
      // this.props.ableUsersReset();
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
    this.props.fetchAgents({
      status: this.state.tab === 1 ? 'pending' : 'assigned',
      // requests: Boolean(this.state.tab),
      name: this.state.search,
    });
  };

  onPageChange = page => {
    this.props.fetchAgents({
      status: this.state.tab === 1 ? 'pending' : 'assigned',
      page: page + 1,
      // requests: Boolean(this.state.tab),
      name: this.state.search,
    });
  };

  handleTabChange = tab => {
    const { search } = this.state;
    this.props.fetchAgents({
      status: tab === 1 ? 'pending' : 'assigned',
      ...(tab === 1 && { requested_by: 'agent' }),
      ...(search && { name: search }),
    });
    this.setState({ tab });
  };

  handleApproval = id => {
    this.props.approveAssign({
      request_id: id,
      status: 'assigned',
    });
  };

  handleRevoke = id => {
    this.props.approveAssign({
      request_id: id,
      status: 'revoked',
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
                      this.state.tab === 0 ? 'font-weight-bold' : 'text-muted'
                    )}
                    onClick={() => this.handleTabChange(0)}
                  >
                    <IntlMessages id="imob.agents-linked" />
                  </div>
                  |
                  <div
                    className={classNames(
                      'text-truncate',
                      'text-nowrap',
                      'agent-tab',
                      this.state.tab === 1 ? 'font-weight-bold' : 'text-muted'
                    )}
                    onClick={() => this.handleTabChange(1)}
                  >
                    <IntlMessages id="agency.awaiting-requests" />
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
                    this.props.history.push(`/app/agency/agent/search`)
                  }
                >
                  <IntlMessages id="imob.agents-search" />
                </Button>
              </Col>
            </Row>

            <Row>
              <Suspense fallback={<div className="loading" />}>
                {this.props.loading ||
                this.props.unassignLoading ||
                this.props.approveLoading ? (
                  <CustomSpinner />
                ) : (
                  <AgentList
                    history={this.props.history}
                    tab={this.state.tab}
                    agents={this.props.data}
                    handleApproval={this.handleApproval}
                    handleUnassign={this.props.unassignAgent}
                  />
                )}
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
  page: state.agentImob.page,
  pages: state.agentImob.pages,
  data: state.agentImob.data,
  loading: state.agentImob.fetchLoading,
  error: state.agentImob.fetchError,

  approveLoading: state.agentImob.approveLoading,
  unassignLoading: state.agentImob.unassignLoading,
});

const mapActionsToProps = {
  fetchAgents,
  approveAssign,
  unassignAgent,
};

export default connect(mapStateToProps, mapActionsToProps)(UserList);
