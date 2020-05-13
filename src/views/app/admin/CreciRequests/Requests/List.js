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
import CreciList from './components/CreciList';
import IntlMessages from '../../../../../helpers/IntlMessages';
import DataTablePagination from '../../../../../components/DatatablePagination';
import {
  creciList,
  creciReprove,
  creciApprove,
} from '../../../../../redux/creci/actions';
import CustomSpinner from '../../../../../components/customSpinner';

class List extends Component {
  state = {
    tab: 0,
    width: window.innerWidth,
    search: '',
    showModal: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.props.creciList();
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
    this.props.creciList({
      requests: Boolean(this.state.tab),
      name: this.state.search,
    });
  };

  onPageChange = page => {
    this.props.creciList({
      page: page + 1,
      requests: Boolean(this.state.tab),
      name: this.state.search,
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
                      'agent-tab',
                      'font-weight-bold'
                    )}
                  >
                    <IntlMessages id="menu.creci-requests" />
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Suspense fallback={<div className="loading" />}>
                {this.props.loading ? (
                  <CustomSpinner />
                ) : (
                  <CreciList
                    requests={this.props.data}
                    creciReprove={this.props.creciReprove}
                    creciApprove={this.props.creciApprove}
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
  page: state.creci.page,
  pages: state.creci.pages,
  data: state.creci.data,
  loading: state.creci.loading,
});

const mapActionsToProps = {
  creciList,
  creciReprove,
  creciApprove,
};

export default connect(mapStateToProps, mapActionsToProps)(List);
