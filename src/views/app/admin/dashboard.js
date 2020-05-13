import React, { Component, Fragment } from 'react';
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import { connect } from 'react-redux';
import IntlMessages from '../../../helpers/IntlMessages';
import DashboardData from '../../../components/dashboardData';
import { dashboardList } from '../../../redux/dashboard/actions';
import CustomSpinner from '../../../components/customSpinner';
import './styles.css';

class Dashboard extends Component {
  state = {
    selectedYear: '',
    selectedMonth: '',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.props.dashboardList();
  }

  handleSelectMonth = e => {
    this.setState({ selectedMonth: e });
    this.props.dashboardList({
      month: e,
      year: this.state.selectedYear,
    });
  };

  handleSelectYear = e => {
    this.setState({ selectedYear: e });
    this.props.dashboardList({
      month: this.state.selectedMonth,
      year: e,
    });
  };

  render() {
    const { data } = this.props;
    const year = new Date().getFullYear();
    const years = Array.from(new Array(5), (val, index) => year - index);
    return (
      <Container fluid>
        <h2>Dashboard</h2>
        <div className="inputs">
          <Col sm={12} md={4} lg={3} className="mt-3">
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              onChange={e => this.handleSelectMonth(e.target.value)}
            >
              <option>Mês</option>
              <option value={1}>Janeiro</option>
              <option value={2}>Fervereiro</option>
              <option value={3}>Março</option>
              <option value={4}>Abril</option>
              <option value={5}>Maio</option>
              <option value={6}>Junho</option>
              <option value={7}>Julho</option>
              <option value={8}>Agosto</option>
              <option value={9}>Setembro</option>
              <option value={10}>Outubro</option>
              <option value={11}>Novembro</option>
              <option value={12}>Dezembro</option>
            </Input>
          </Col>
          <Col sm={12} md={4} lg={3} className="mt-3">
            <Input
              type="select"
              name="year"
              id="year"
              placeholder="Ano"
              onChange={e => this.handleSelectYear(e.target.value)}
            >
              {years.map((year, index) => {
                return (
                  <option key={`year${index}`} value={year}>
                    {year}
                  </option>
                );
              })}
            </Input>
          </Col>
        </div>
        {this.props.loading ? (
          <CustomSpinner />
        ) : (
          <Row className="mt-5 mb-5">
            <Col sm="12" md="9" lg="9">
              <div className="customContainer">
                <div className="cardsContainer">
                  <div className="cards">
                    <DashboardData
                      type={<IntlMessages id="dashboard.new-ads" />}
                      title={data?.ads_new}
                    />
                  </div>
                  <div className="cards">
                    <DashboardData
                      type={<IntlMessages id="dashboard.ad-views" />}
                      title={data?.ad_views}
                    />
                  </div>
                  <div className="cards">
                    <DashboardData
                      type={<IntlMessages id="dashboard.new-users" />}
                      title={data?.users_new}
                    />
                  </div>
                  <div className="cards">
                    <DashboardData
                      type={<IntlMessages id="dashboard.new-agents" />}
                      title={data?.agents_new}
                    />
                  </div>
                  <div className="cards">
                    <DashboardData
                      type={<IntlMessages id="dashboard.agents-count" />}
                      title={data?.agents_count}
                    />
                  </div>
                  <div className="cards">
                    <DashboardData
                      type={<IntlMessages id="dashboard.schedule-now-count" />}
                      title={data?.schedule_now_count}
                    />
                  </div>
                </div>
              </div>
              {/* BOTTOM CARD */}
              <Card
                style={{
                  borderRadius: 12,
                }}
              >
                <CardBody>
                  <Container fluid>
                    <Row className="d-flex align-items-center w-100 justify-content-between flex-wrap">
                      {/* AGENDAMENTOS */}
                      <Col sm="12" md="6" lg="5">
                        <div className="w-100 d-flex justify-content-center">
                          <p>
                            <IntlMessages id="dashboard.schedulling" />
                          </p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>
                            <h1>{data?.scheduled?.accepted}</h1>
                            <h2>
                              <IntlMessages id="dashboard.schedules" />
                            </h2>
                          </div>
                          <div>
                            <h1>{data?.scheduled?.done}</h1>
                            <h2>
                              <IntlMessages id="dashboard.done" />
                            </h2>
                          </div>
                          <div>
                            <h1>{data?.scheduled?.cancelled}</h1>
                            <h2>
                              <IntlMessages id="dashboard.cancelled" />
                            </h2>
                          </div>
                        </div>
                      </Col>
                      {/* VISIT */}
                      <Col sm="12" md="6" lg="2">
                        <div>
                          <div className="w-100 d-flex flex-column align-items-center">
                            <p>
                              <IntlMessages id="dashboard.visit" />
                            </p>
                            <h1>{data?.all_visits}</h1>
                          </div>
                          <div className="w-100 d-flex flex-column align-items-center">
                            <p>
                              <IntlMessages id="dashboard.sales" />
                            </p>
                            {/* TODAS AS VENDAS COM PENDÊNCIA */}
                            <h1>{data?.all_sales}</h1>
                          </div>
                        </div>
                      </Col>
                      {/* VISITE AGORA */}
                      <Col sm="12" md="6" lg="5">
                        <div className="w-100 d-flex justify-content-center">
                          <p>
                            <IntlMessages id="dashboard.schedule-now" />
                          </p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>
                            <h1>{data?.visits?.accepted}</h1>
                            <h2>
                              <IntlMessages id="dashboard.schedulling" />
                            </h2>
                          </div>
                          <div>
                            <h1>{data?.visits?.done}</h1>
                            <h2>
                              <IntlMessages id="dashboard.done" />
                            </h2>
                          </div>
                          <div>
                            <h1>{data?.visits?.cancelled}</h1>
                            <h2>
                              <IntlMessages id="dashboard.cancelled" />
                            </h2>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>

            {/* RIGHT CARD */}
            <Col sm="12" md="3" lg="3">
              <div className="rightCard">
                <Card
                  style={{
                    borderRadius: 12,
                    height: '100%',
                  }}
                >
                  <CardBody>
                    <Container>
                      <p>
                        <IntlMessages id="dashboard.final-users" />
                      </p>
                    </Container>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  data: state.dashboard.data,
  loading: state.dashboard.loading,
  error: state.dashboard.error,
});

const mapActionsToProps = {
  dashboardList,
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
