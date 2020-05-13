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
import PlanList from './components/PlanList';
import IntlMessages from '../../../../helpers/IntlMessages';
import {
  fetchPlans,
  enablePlan,
  disablePlan,
  ablePlansReset,
} from '../../../../redux/plans/actions';
import DataTablePagination from '../../../../components/DatatablePagination';
import CustomSpinner from '../../../../components/customSpinner';

class PlansList extends Component {
  state = {
    tab: 0,
    width: window.innerWidth,
    search: '',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.props.fetchPlans();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
    this.props.fetchPlans();
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.ableSuccess && nextProps.ableSuccess) {
      this.onPageChange(this.props.page - 1);
      this.props.ablePlansReset();
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
    this.props.fetchPlans({
      name: this.state.search,
    });
  };

  onPageChange = page => {
    this.props.fetchPlans({
      page: page + 1,
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
                      'plans-tab',
                      'align-items-center',
                      'font-weight-bold'
                    )}
                  >
                    <h4 className={classNames('mb-0')}>
                      <IntlMessages id="plans.manage" />
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
                    this.props.history.push(`/app/admin/plans/new`)
                  }
                >
                  <IntlMessages id="agency.add-button" />
                </Button>
              </Col>
            </Row>

            <Row>
              <Suspense fallback={<div className="loading" />}>
                <PlanList
                  history={this.props.history}
                  plans={this.props.data}
                  disablePlan={this.props.disablePlan}
                  enablePlan={this.props.enablePlan}
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
  page: state.plans.page,
  pages: state.plans.pages,
  data: state.plans.data,
  loading: state.plans.fetchLoading,
  error: state.plans.fetchError,
  ableSuccess: state.plans.ableSuccess,
});

const mapActionsToProps = {
  fetchPlans,
  disablePlan,
  enablePlan,
  ablePlansReset,
};

export default connect(mapStateToProps, mapActionsToProps)(PlansList);
