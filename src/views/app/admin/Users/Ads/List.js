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
import AdList from './components/AdList';
import IntlMessages from '../../../../../helpers/IntlMessages';
import { fetchAdUsers } from '../../../../../redux/user/actions';
import DataTablePagination from '../../../../../components/DatatablePagination';
import CustomSpinner from '../../../../../components/customSpinner';

class Ad extends Component {
  state = {
    width: window.innerWidth,
    search: '',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.props.fetchAdUsers();
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

  searchName = () => {
    this.props.fetchAdUsers({
      name: this.state.search,
    });
  };

  onPageChange = page => {
    this.props.fetchAdUsers({
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
                      <IntlMessages id="agency.registered-ads" />
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
                    <Button outline color="primary" onClick={this.searchName}>
                      <i className="simple-icon-magnifier" />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
            </Row>

            <Row>
              <Suspense fallback={<div className="loading" />}>
                <AdList ads={this.props.data} history={this.props.history} />
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
  page: state.user.adPage,
  pages: state.user.adPages,
  data: state.user.adData,
  loading: state.user.adFetchLoading,
  error: state.user.adFetchError,
});

const mapActionsToProps = {
  fetchAdUsers,
};

export default connect(mapStateToProps, mapActionsToProps)(Ad);
