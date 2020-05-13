import React, { Component, Fragment } from 'react';
import { Row, Col, Container, Card, CardBody, Input } from 'reactstrap';
import {
  imobDashboardGetAgents,
  dashboardList,
} from '../../../../redux/dashboard/actions';
import DashboardDataAgency from '../../../../components/dashboardDataAgency';
import './styles.css';
import { connect } from 'react-redux';
import CustomSpinner from '../../../../components/customSpinner';

class Dashboard extends Component {
  state = {
    selectedYear: '',
    selectedMonth: '',
    agent_id: '',
    accepted: false,
  };

  componentDidMount() {
    this.props.imobDashboardGetAgents();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    this.setState({
      selectedYear: currentYear,
      selectedMonth: currentMonth + 1,
    });
  }

  handleAgent = e => {
    this.setState({ agent_id: e });
    this.props.dashboardList({
      agent_id: e,
      month: this.state.selectedMonth,
      year: this.state.selectedYear,
    });
  };

  handleSelectMonth = e => {
    this.setState({ selectedMonth: e });
    this.props.dashboardList({
      agent_id: this.state.agent_id,
      month: e,
      year: this.state.selectedYear,
    });
  };

  handleSelectYear = e => {
    this.setState({ selectedYear: e });
    this.props.dashboardList({
      agent_id: this.state.agent_id,
      month: this.state.selectedMonth,
      year: e,
    });
  };

  render() {
    const year = new Date().getFullYear();
    const years = Array.from(new Array(5), (val, index) => year - index);
    const { data } = this.props.agents;

    if (this.props.approved === 0) {
      this.props.history.push(`/app/agency/waiting`);
    }

    return (
      <Card>
        <CardBody>
          <Container fluid>
            <h2>Dashboard</h2>
            <div className="inputs">
              <Col sm={12} md={4} lg={3} className="mt-3">
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  onChange={e => this.handleAgent(e.target.value)}
                >
                  <option value="main" selected disabled>
                    Nome do Corretor
                  </option>
                  <option value="all">Todos</option>
                  {data?.map(item => {
                    return (
                      <option value={item?.id} key={item?.profile?.id}>
                        {item?.profile?.name}
                      </option>
                    );
                  })}
                </Input>
              </Col>

              <Col sm={12} md={4} lg={3} className="mt-3">
                <Input
                  type="select"
                  value={this.state.selectedMonth}
                  name="select"
                  id="exampleSelect"
                  onChange={e => this.handleSelectMonth(e.target.value)}
                >
                  <option value="main" selected disabled>
                    Mês
                  </option>
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
                  value={this.state.selectedYear}
                  name="year"
                  id="year"
                  placeholder="Ano"
                  onChange={e => this.handleSelectYear(e.target.value)}
                >
                  <option value="main" selected disabled>
                    Ano
                  </option>
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
              <>
                {this.props.data && (
                  <Row className="mt-5 mb-5">
                    <Col sm="12" md="12" lg="12">
                      <div className="customContainer">
                        <div className="cardsContainer">
                          <DashboardDataAgency
                            title="?"
                            type="Imóveis autorizados"
                          />
                          <DashboardDataAgency
                            title={this.props.data.scheduled_accepted}
                            type="Visitas agendadas"
                          />
                          <DashboardDataAgency
                            title={this.props.data.scheduled_cancelled}
                            type="Visitas canceladas"
                          />
                          <DashboardDataAgency
                            title={this.props.data.scheduled_done}
                            type="Visitas concluídas"
                          />
                          <DashboardDataAgency
                            title={this.props.data.visits_done}
                            type=' "Visite Agora" atendidos'
                          />
                          <DashboardDataAgency
                            title={this.props.data.ad_selled}
                            type="Imóveis vendidos"
                          />
                          <DashboardDataAgency
                            title={this.props.data.visits_action}
                            type='Visite agora" acionados'
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                )}
              </>
            )}
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  approved: state.authUser.approved,
  data: state.dashboard.data,
  agents: state.dashboard.agents,
  loading: state.dashboard.loading,
  error: state.dashboard.error,
});

const mapActionsToProps = {
  imobDashboardGetAgents,
  dashboardList,
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
