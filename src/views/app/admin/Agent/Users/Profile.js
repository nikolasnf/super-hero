import React, { PureComponent } from 'react';
import {
  Card,
  CardBody,
  Container,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Button,
} from 'reactstrap';
import classNames from 'classnames';
import './styles.scss';
import { connect } from 'react-redux';
import Viewer from 'react-viewer';
import FormTitle from '../../../../../components/forms/FormTitle';
import FormInfo from '../../../../../components/forms/FormInfo';
import { fetchAgentId } from '../../../../../redux/agent/actions';
import IntlMessages from '../../../../../helpers/IntlMessages';
import BackButtonText from '../../../../../components/BackButtonText';

const assignStatus = {
  pending: 'Pendente',
  revoked: 'Recusado',
  assigned: 'Vinculado',
};

class AgentProfile extends PureComponent {
  state = {
    visibleImage: false,
    visibleCreci: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAgent(id);
  }

  renderAgency = agency => {
    const { address } = agency?.profile;
    return (
      <Row className="pt-3 pb-3">
        <Col sm="10" md="2" lg="2">
          <img className="rounded agent-image" src={agency?.profile?.photo} />
        </Col>
        <Col sm="10" md="10" lg="10">
          <Row>
            <Col>
              <span className="font-weight-bold">{agency?.fantasy_name}</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="font-weight-light">CRECI - {agency?.creci}</span>
            </Col>
          </Row>

          <Row>
            <Col>
              <span className="font-weight-bold mt-2">
                Endereço:{' '}
                {`${address.street}, ${address.number} - ${address.city}/ ${address.state}`}
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  render() {
    if (this.props.loading) {
      return <div className="loading" />;
    }

    const { id } = this.props.match.params;
    const { data } = this.props;

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
                  <button
                    className="imageButton"
                    onClick={() => this.setState({ visibleCreci: true })}
                  >
                    <img
                      src={data?.agent?.photo_creci}
                      className="agent-image mb-1"
                    />
                  </button>
                  <Viewer
                    visible={this.state.visibleCreci}
                    onClose={() => {
                      this.setState({ visibleCreci: false });
                    }}
                    noToolbar
                    noFooter
                    noNavbar
                    zoomable={false}
                    drag={false}
                    disableMouseZoom
                    defaultSize={{ width: 300, height: 300 }}
                    images={[{ src: data?.agent?.photo_creci, alt: '' }]}
                  />
                  <div className="justify-content-center d-flex flex-row">
                    <IntlMessages id="agents.photo-creci" />
                  </div>
                </div>
                <div className="justify-content-center d-flex flex-column">
                  <button
                    className="imageButton"
                    onClick={() => this.setState({ visibleImage: true })}
                  >
                    <img src={data?.photo} className="agent-image mb-1" />
                  </button>
                  <IntlMessages id="agents.photo-agent" />
                  <Viewer
                    className="agent-image mt-1"
                    visible={this.state.visibleImage}
                    onClose={() => {
                      this.setState({ visibleImage: false });
                    }}
                    noToolbar
                    noFooter
                    noNavbar
                    zoomable={false}
                    drag={false}
                    disableMouseZoom
                    defaultSize={{ width: 300, height: 300 }}
                    images={[{ src: data?.photo, alt: '' }]}
                  />
                </div>
              </Col>
            </Row>

            <FormTitle
              title={<IntlMessages id="agents.link-agency" />}
              className="mb-2 mt-3"
            />
            <Row>
              <Col sm="12" md="5" lg="5">
                <FormInfo
                  label={<IntlMessages id="agency.status" />}
                  value={
                    assignStatus[data?.profile?.agent?.request[0]?.status] ||
                    'Não Vinculado'
                  }
                />
              </Col>
              <Col>
                <Button
                  color="primary"
                  onClick={() =>
                    this.props.history.push(
                      `/app/admin/agent/assign/${data?.profile?.agent?.id}`
                    )
                  }
                >
                  <IntlMessages id="agency.link-button" />
                </Button>
              </Col>
            </Row>

            {data?.profile?.agent?.request[0] &&
              this.renderAgency(data?.profile?.agent?.request[0].agency)}

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
});

const mapActionsToProps = {
  fetchAgent: fetchAgentId,
};

export default connect(mapStateToProps, mapActionsToProps)(AgentProfile);
