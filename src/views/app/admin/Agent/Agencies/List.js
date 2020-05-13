import React, { Component, Fragment, Suspense, PureComponent } from 'react';
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
import { connect } from 'react-redux';
import classNames from 'classnames';
import Loading from '../../../../../components/Loading';
import {
  assignAgency,
  unassignAgency,
  fetchAssignedAgencies,
} from '../../../../../redux/agent/actions';
import AgentList from './components/AgentList';
import './styles.scss';

import IntlMessages from '../../../../../helpers/IntlMessages';
import DataTablePagination from '../../../../../components/DatatablePagination';
import {
  enableUsers,
  disableUsers,
  ableUsersReset,
} from '../../../../../redux/user/actions';
import CustomSpinner from '../../../../../components/customSpinner';

class UserList extends PureComponent {
  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    const { id } = this.props.match?.params;
    this.props.fetchAssignedAgencies(id);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.ableSuccess && nextProps.ableSuccess) {
      this.onPageChange(this.props.page - 1);
      this.props.ableUsersReset();
      return false;
    }
    return true;
  }

  searchName = () => {
    const { id } = this.props.match?.params;
    this.props.fetchAssignedAgencies(id);
  };

  onPageChange = page => {
    const { id } = this.props.match.params;

    this.props.fetchAssignedAgencies(id, {
      page: page + 1,
    });
  };

  handleApproval = (id, approved) => {
    this.props.approvalAgent({
      id,
      approved,
      page: this.props.page,
      requests: true,
    });
  };

  render() {
    const { id } = this.props.match.params;

    return (
      <Loading loading={this.props.assignLoading}>
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
                        'font-weight-bold'
                      )}
                    >
                      <IntlMessages id="agents.registered-agency" />
                    </div>
                  </div>
                </Col>

                <Col className="col">
                  <InputGroup>
                    <Input
                      placeholder="Pesquisar"
                      onKeyPress={() => {}} // e => e.key === 'Enter' && this.searchName()}
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
                  <AgentList
                    agencies={this.props.data}
                    assignedAgency={this.props.fetchAssignedAgency}
                    assignAgency={this.props.assignAgency}
                    unassignAgency={this.props.unassignAgency}
                    agentId={this.props.match?.params?.id}
                    history={this.props.history}
                  />
                  {this.props.loading && <CustomSpinner />}

                  <div className="mt-3 mb-3 col-12">
                    <DataTablePagination
                      pages={this.props.pages}
                      page={this.props.page - 1}
                      onPageChange={this.onPageChange}
                    />
                  </div>
                  {this.props.loading && <Spinner color="primary" size="sm" />}
                </Suspense>
              </Row>
            </Container>
          </CardBody>
        </Card>
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  page: state.agent.assignedPage,
  pages: state.agent.assignedPages,
  data: state.agent.assignedData,
  loading: state.agent.assignedFetchLoading,
  error: state.agent.assignedFetchError,
  ableSuccess: state.user.ableSuccess,
});

const mapActionsToProps = {
  enableUsers,
  disableUsers,
  ableUsersReset,
  assignAgency,
  unassignAgency,
  fetchAssignedAgencies,
};

export default connect(mapStateToProps, mapActionsToProps)(UserList);
