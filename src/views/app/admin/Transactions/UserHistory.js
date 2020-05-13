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
import classNames from 'classnames';
import { connect } from 'react-redux';
import HistoryList from './components/HistoryList';
import IntlMessages from '../../../../helpers/IntlMessages';
import { fetchUsersTransaction } from '../../../../redux/transaction/actions';
import DataTablePagination from '../../../../components/DatatablePagination';
import CustomSpinner from '../../../../components/customSpinner';

class UserHistory extends Component {
  state = {
    tab: 0,
    width: window.innerWidth,
    search: '',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.props.fetchUsersTransaction();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  resizeListener = () => {
    const width = window.innerWidth;
    this.setState({ width });
  };

  handleSearch = e => {
    this.setState({ search: e.target.value });
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
                    'align-items-center'
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
                      <IntlMessages id="transactions.transaction-users" />
                    </h4>
                  </div>
                </div>
              </Col>

              <Col className="col">
                <InputGroup>
                  <Input placeholder="Pesquisar" onChange={this.handleSearch} />
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
                <HistoryList itens={this.props.data} />
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
  page: state.transaction.page,
  pages: state.transaction.pages,
  data: state.transaction.data,
  loading: state.transaction.fetchLoading,
  error: state.transaction.fetchError,
});

const mapActionsToProps = {
  fetchUsersTransaction,
};

export default connect(mapStateToProps, mapActionsToProps)(UserHistory);
