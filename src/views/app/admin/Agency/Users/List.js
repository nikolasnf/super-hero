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
  Spinner,
} from 'reactstrap';
import { connect } from 'react-redux';
import classNames from 'classnames';
import './styles.scss';
import moment from 'moment';
import {
  fetchAgencies,
  approvalAgency,
} from '../../../../../redux/agency/actions';
import AgencyList from './components/AgencyList';
import IntlMessages from '../../../../../helpers/IntlMessages';
import DataTablePagination from '../../../../../components/DatatablePagination';
import {
  disableUsers,
  enableUsers,
  ableUsersReset,
} from '../../../../../redux/user/actions';
import CustomSpinner from '../../../../../components/customSpinner';

class AgencyListing extends Component {
  state = {
    tab: 0,
    width: window.innerWidth,
    search: '',
    showModal: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.props.fetchAgencies();
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

  resizeListener = () => {
    const width = window.innerWidth;
    this.setState({ width });
  };

  handleSearch = e => {
    this.setState({ search: e.target.value });
  };

  searchName = () => {
    this.props.fetchAgencies({
      requests: Boolean(this.state.tab),
      name: this.state.search,
    });
  };

  onPageChange = page => {
    this.props.fetchAgencies({
      page: page + 1,
      requests: Boolean(this.state.tab),
      name: this.state.search,
    });
  };

  handleTabChange = tab => {
    this.setState({ tab });
    this.props.fetchAgencies({
      requests: Boolean(tab),
      name: this.state.search,
    });
  };

  handleApproval = (id, approved) => {
    this.props.approvalAgency({
      id,
      approved,
      page: this.props.page,
      requests: true,
    });
  };

  handleApprovalMessage = (id, approved, reproved_message, allow_resend) => {
    this.props.approvalAgency({
      id,
      approved,
      reproved_message,
      allow_resend,
    });
  };

  handleShowModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
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
                      'agency-tab',
                      this.state.tab === 0 ? 'font-weight-bold' : 'text-muted'
                    )}
                    onClick={() => this.handleTabChange(0)}
                  >
                    <IntlMessages id="agency.registered-agency" />
                  </div>
                  |
                  <div
                    className={classNames(
                      'text-truncate',
                      'text-nowrap',
                      'agency-tab',
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
                    onChange={this.handleSearch}
                    onKeyPress={e => e.key === 'Enter' && this.searchName()}
                  />
                  <InputGroupAddon addonType="append">
                    <Button outline color="primary" onClick={this.searchName}>
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
                    this.props.history.push(`/app/admin/agency/new`)
                  }
                >
                  <IntlMessages id="agency.add-button" />
                </Button>
              </Col>
            </Row>

            <Row>
              <Suspense fallback={<div className="loading" />}>
                <AgencyList
                  history={this.props.history}
                  tab={this.state.tab}
                  agencies={this.props.data}
                  handleApproval={this.handleApproval}
                  disableUsers={this.props.disableUsers}
                  enableUsers={this.props.enableUsers}
                  handleApprovalMessage={this.handleApprovalMessage}
                  showModal={this.state.showModal}
                  handleShowModal={this.handleShowModal}
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
  page: state.agency.page,
  pages: state.agency.pages,
  data: state.agency.data,
  loading: state.agency.fetchLoading,
  error: state.agency.fetchError,
  ableSuccess: state.user.ableSuccess,
});

const mapActionsToProps = {
  fetchAgencies,
  approvalAgency,
  enableUsers,
  disableUsers,
  ableUsersReset,
};

export default connect(mapStateToProps, mapActionsToProps)(AgencyListing);
