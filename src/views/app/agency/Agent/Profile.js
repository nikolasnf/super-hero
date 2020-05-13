import React, { PureComponent } from 'react';
import { Card, CardBody, Container, Input, Col, Row } from 'reactstrap';
import './styles.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FormTitle from '../../../../components/forms/FormTitle';
import LoadingButton from '../../../../components/LoadingButton';
import FormInfo from '../../../../components/forms/FormInfo';
import { fetchAgentId } from '../../../../redux/agent/actions';
import {
  unassignAgent,
  unassignAgentRefreshSuccess,
} from '../../../../redux/agent_imob/actions';
import IntlMessages from '../../../../helpers/IntlMessages';
import BackButtonText from '../../../../components/BackButtonText';
import ModalConfirmation from '../../../../components/ModalConfirmation';

class AgentProfile extends PureComponent {
  state = {
    showUnassignModal: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAgent(id);
  }

  handleShowUnassignModal = () => {
    const unassign = this.state.showUnassignModal;
    this.setState({ showUnassignModal: !unassign });
  };

  render() {
    if (this.props.loading) {
      return <div className="loading" />;
    }

    if (this.props.unassignSuccess) {
      this.props.unassignAgentRefreshSuccess();
      return <Redirect to="/app/agency/agent/list" />;
    }

    const { data } = this.props;
    const { agent_id } = this.props.match.params;
    return (
      <Card>
        <CardBody>
          <Container>
            <BackButtonText props={this.props} />
            <FormTitle
              title={<IntlMessages id="agents.registry-agent" />}
              className="mb-2"
            />
            <Row className="align-items-center">
              <Col sm="3" md="4" lg="4">
                <FormInfo
                  label={<IntlMessages id="agency.status" />}
                  value={data?.status ? 'Ativo' : 'Inativo'}
                />
              </Col>
            </Row>

            <FormTitle
              title={<IntlMessages id="agency.datas" />}
              className="mb-2"
            />
            <Row>
              <Col sm="12" md="6" lg="5">
                <FormInfo
                  label={<IntlMessages id="agency.name" />}
                  value={data?.name}
                />
              </Col>
              <Col sm="6" md="3" lg="4">
                <FormInfo
                  label={<IntlMessages id="agency.creci" />}
                  value={data?.creci}
                />
              </Col>
            </Row>

            <Row>
              <Col sm="12" md="5" lg="5">
                <FormInfo
                  label={<IntlMessages id="agency.city" />}
                  value={data?.city}
                />
              </Col>
              <Col sm="6" md="2" lg="2">
                <FormInfo
                  label={<IntlMessages id="agency.state" />}
                  value={data?.state}
                />
              </Col>
              <Col sm="6" md="3" lg="3">
                <FormInfo
                  label={<IntlMessages id="agency.cellPhone" />}
                  value={data?.phone}
                />
              </Col>
            </Row>

            <Row>
              <Col className="d-flex flex-row">
                <div className="justify-content-center d-flex flex-column mr-3">
                  <img
                    src={data?.agent?.photo_creci}
                    className="agent-image mb-1"
                  />
                  <div className="justify-content-center d-flex flex-row">
                    <IntlMessages id="agents.photo-creci" />
                  </div>
                </div>
                <div className="justify-content-center d-flex flex-column">
                  <img src={data?.photo} className="agent-image mb-1" />
                  <IntlMessages id="agents.photo-agent" />
                </div>
              </Col>
            </Row>

            <FormTitle
              title={<IntlMessages id="agents.penalty-history" />}
              className="mb-2 mt-3"
            />
            <Row>
              <Col sm="6" md="4" lg="4">
                <Input type="select" placeholder="Mês">
                  <option>Janeiro</option>
                  <option>Fevereiro</option>
                  <option>Março</option>
                  <option>Abril</option>
                  <option>Maio</option>
                  <option>Junho</option>
                  <option>Julho</option>
                  <option>Agosto</option>
                  <option>Setembro</option>
                  <option>Outubro</option>
                  <option>Novembro</option>
                  <option>Dezembro</option>
                </Input>
              </Col>
              <Col sm="12" md="5" lg="5">
                <Input type="select" placeholder="Ano">
                  <option>2020</option>
                </Input>
              </Col>
            </Row>

            <FormTitle
              title={<IntlMessages id="agents.visit-history" />}
              className="mb-2 mt-3"
            />
            <Row>
              <Col sm="6" md="4" lg="4">
                <Input type="select" placeholder="Mês">
                  <option>Janeiro</option>
                  <option>Fevereiro</option>
                  <option>Março</option>
                  <option>Abril</option>
                  <option>Maio</option>
                  <option>Junho</option>
                  <option>Julho</option>
                  <option>Agosto</option>
                  <option>Setembro</option>
                  <option>Outubro</option>
                  <option>Novembro</option>
                  <option>Dezembro</option>
                </Input>
              </Col>
              <Col sm="12" md="5" lg="5">
                <Input type="select" placeholder="Ano">
                  <option>2020</option>
                </Input>
              </Col>
            </Row>

            <FormTitle
              title={<IntlMessages id="agents.average-score" />}
              className="mb-2 mt-3"
            />
            <Row className="mt-5 justify-content-end">
              <LoadingButton
                color="primary"
                className="ml-2"
                disabled={this.props.unassignLoading}
                onClick={() => this.handleShowUnassignModal()}
                loading={this.props.unassignLoading}
                label={<IntlMessages id="agents.deassign-uppercase" />}
              />
            </Row>
            {/* unassign modal */}
            <ModalConfirmation
              showModal={this.state.showUnassignModal}
              handleShowModal={this.handleShowUnassignModal}
              title={<IntlMessages id="agency.unassign-agent" />}
              onClick={() => {
                this.props.unassignAgent(agent_id);
                this.handleShowUnassignModal(); // close modal after click
              }}
            />
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  data: state.agent.dataId,
  loading: state.agent.fetchIdLoading,
  error: state.agent.fetchIdError,

  unassignLoading: state.agentImob.unassignLoading,
  unassignSuccess: state.agentImob.unassignSuccess,
});

const mapActionsToProps = {
  fetchAgent: fetchAgentId,
  unassignAgent,
  unassignAgentRefreshSuccess,
};

export default connect(mapStateToProps, mapActionsToProps)(AgentProfile);
