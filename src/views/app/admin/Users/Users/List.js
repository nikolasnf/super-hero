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
import {
  fetchUsers,
  ableUsersReset,
  enableUsers,
  disableUsers,
} from '../../../../../redux/user/actions';
import UserList from './components/UsersList';
import './styles.scss';
import IntlMessages from '../../../../../helpers/IntlMessages';
import DataTablePagination from '../../../../../components/DatatablePagination';

import CustomSpinner from '../../../../../components/customSpinner';

class Users extends Component {
  state = {
    width: window.innerWidth,
    search: '',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.props.fetchUsers();
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
    this.props.fetchUsers({
      name: this.state.search,
    });
  };

  onPageChange = page => {
    this.props.fetchUsers({
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
                      <IntlMessages id="users.registred" />
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
                <UserList
                  history={this.props.history}
                  users={this.props.data}
                  enableUsers={this.props.enableUsers}
                  disableUsers={this.props.disableUsers}
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
  page: state.user.page,
  pages: state.user.pages,
  data: state.user.data,
  loading: state.user.fetchLoading,
  error: state.user.fetchError,
  ableSuccess: state.user.ableSuccess,
});

const mapActionsToProps = {
  fetchUsers,
  enableUsers,
  disableUsers,
  ableUsersReset,
};

export default connect(mapStateToProps, mapActionsToProps)(Users);
