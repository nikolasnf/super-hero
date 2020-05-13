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
} from '../../../../../redux/agent_imob/actions';
import {
  fetchAdRequest,
  acceptAdSoldRequest,
  removeAdSoldRequest,
} from '../../../../../redux/ad/actions';
import SoldList from './components/SoldList';
import IntlMessages from '../../../../../helpers/IntlMessages';
import DataTablePagination from '../../../../../components/DatatablePagination';
import CustomSpinner from '../../../../../components/customSpinner';

class SoldRequest extends Component {
  state = {
    tab: 0,
    width: window.innerWidth,
    search: '',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.props.fetchAdRequest();
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
                      'font-weight-bold'
                    )}
                  >
                    <IntlMessages id="menu.ad-info-sold" />
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
                  <SoldList
                    pending
                    requests={this.props.adRequestData}
                    removeAdSoldRequest={this.props.removeAdSoldRequest}
                    acceptAdSoldRequest={this.props.acceptAdSoldRequest}
                    history={this.props.history}
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

  adRequestData: state.ad.adRequestData,
  adRequestLoading: state.ad.adRequestLoading,
});

const mapActionsToProps = {
  fetchAdRequest,
  acceptAdSoldRequest,
  removeAdSoldRequest,
};

export default connect(mapStateToProps, mapActionsToProps)(SoldRequest);
