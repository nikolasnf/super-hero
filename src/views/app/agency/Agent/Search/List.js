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
import '../styles.scss';
import {
  fetchSearchAgents,
  approveAssign,
  unassignAgent,
  requestAgent,
} from '../../../../../redux/agent_imob/actions';
import AgentList from './components/AgentList';
import IntlMessages from '../../../../../helpers/IntlMessages';
import DataTablePagination from '../../../../../components/DatatablePagination';
import CustomSpinner from '../../../../../components/customSpinner';

class UserList extends Component {
  state = {
    tab: 0,
    width: window.innerWidth,
    search: '',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.props.fetchSearchAgents();
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
    this.props.fetchSearchAgents({
      name: this.state.search,
    });
  };

  onPageChange = page => {
    this.props.fetchSearchAgents({
      page: page + 1,
      name: this.state.search,
    });
  };

  handleApproval = id => {
    this.props.approveAssign({
      request_id: id,
      status: 'assigned',
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
                  <div className="font-weight-bold">
                    <h4>
                      <IntlMessages id="agency.select-agent" />
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
                    // handleApproval={this.handleApproval}
                    approveAssign={this.props.approveAssign}
                    requestAgent={this.props.requestAgent}
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
  fetchSearchAgents,
  approveAssign,
  unassignAgent,
  requestAgent,
};

export default connect(mapStateToProps, mapActionsToProps)(UserList);
