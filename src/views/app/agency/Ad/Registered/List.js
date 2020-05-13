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
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import RegisteredList from './components/RegisteredList';
import { fetchAds, disableAd, enableAd } from '../../../../../redux/ad/actions';
import './styles.scss';

import IntlMessages from '../../../../../helpers/IntlMessages';
import DataTablePagination from '../../../../../components/DatatablePagination';
import CustomSpinner from '../../../../../components/customSpinner';
import Loading from '../../../../../components/Loading';

class AdList extends Component {
  state = {
    tab: 0,
    width: window.innerWidth,
    search: '',
  };

  fetchCustomAd(rest) {
    const { type } = this.props;
    const params = { ...rest };
    if (type === 'disabled') {
      params.status = 'blocked,inactive';
    } else if (type === 'sold') {
      params.sold = 1;
    } else {
      params.status = 'active';
      params.sold = 0;
    }
    this.props.fetchAds(params);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.fetchCustomAd();
  }

  componentDidUpdate(prevProps) {
    const { type } = this.props;
    if (prevProps.type !== type) {
      this.fetchCustomAd();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  renderName() {
    const { type } = this.props;
    if (type === 'disabled') {
      return <IntlMessages id="ad.disabled" />;
    }
    if (type === 'sold') {
      return <IntlMessages id="ad.sold" />;
    }
    return <IntlMessages id="ad.registered" />;
  }

  handleSearch = e => {
    this.setState({ search: e.target.value });
  };

  searchName = () => {
    this.fetchCustomAd({
      requests: Boolean(this.state.tab),
      id: this.state.search,
    });
  };

  onPageChange = page => {
    this.fetchCustomAd({
      page: page + 1,
      requests: Boolean(this.state.tab),
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
                    <IntlMessages id="ad.ad" /> {this.renderName()}
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
                    this.props.history.push(`/app/agency/announcements/new`)
                  }
                >
                  <IntlMessages id="agency.add-button" />
                </Button>
              </Col>
            </Row>

            <Row>
              <Suspense fallback={<div className="loading" />}>
                <Loading loading={this.props.loading}>
                  <RegisteredList
                    history={this.props.history}
                    ads={this.props.data}
                    enableAd={this.props.enableAd}
                    disableAd={this.props.disableAd}
                    type={this.props.type}
                  />
                  {this.props.loading && <CustomSpinner />}
                  <div className="mt-3 mb-3 col-12">
                    <DataTablePagination
                      pages={this.props.pages}
                      page={this.props.page - 1}
                      onPageChange={this.onPageChange}
                    />
                  </div>
                </Loading>
              </Suspense>
            </Row>
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  page: state.ad.page,
  pages: state.ad.pages,
  data: state.ad.data,
  loading: state.ad.fetchLoading,
  error: state.ad.fetchError,
  ableSuccess: state.ad.ableSuccess,
});

const mapActionsToProps = {
  fetchAds,
  enableAd,
  disableAd,
  // ableAdsReset
};

export default connect(mapStateToProps, mapActionsToProps)(AdList);
