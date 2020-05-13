import React, { PureComponent } from 'react';
import { CardBody, Card, Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FormTitle from '../../../../components/forms/FormTitle';
import { fetchAgentId } from '../../../../redux/agent/actions';
import IntlMessages from '../../../../helpers/IntlMessages';
import FormInfo from '../../../../components/forms/FormInfo';
import LoadingButton from '../../../../components/LoadingButton';
import {
  approveAssign,
  approveAssignRefreshSuccess,
} from '../../../../redux/agent_imob/actions';
import ModalConfirmation from '../../../../components/ModalConfirmation';

class AgentForm extends PureComponent {
  state = {
    showRefuseModal: false,
    showApprovalModal: false,
    selected: null,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAgentId(id);
  }

  goBack = () => this.props.history.goBack();

  handleApproval = req_id => {
    this.props.approveAssign({
      request_id: req_id,
      status: 'assigned',
    });
  };

  handleShowRefuseModal = () => {
    const refuse = this.state.showRefuseModal;
    this.setState({ showRefuseModal: !refuse });
  };

  handleShowApprovalModal = () => {
    const approval = this.state.showApprovalModal;
    this.setState({ showApprovalModal: !approval });
  };

  handleRevoke = req_id => {
    this.props.approveAssign({
      request_id: req_id,
      status: 'revoked',
    });
  };

  render() {
    const { data } = this.props;

    if (this.props.approveSuccess) {
      this.props.approveAssignRefreshSuccess();
      return <Redirect to="/app/agency/agent/list" />;
    }

    if (this.props.fetchLoading) {
      return <div className="loading" />;
    }

    return (
      <Card>
        <CardBody>
          <Container>
            <FormTitle
              title={<IntlMessages id="agency.awaiting-link" />}
              className="mb-5"
            />
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
                <div className=" d-flex flex-column mr-3">
                  <img
                    src={this.props.data?.profile?.agent?.photo_creci}
                    width={300}
                    height={300}
                  />
                  <IntlMessages id="agents.photo-agent" />
                </div>

                <div className=" d-flex flex-column">
                  <img
                    src={this.props.data?.profile?.photo}
                    width={300}
                    height={300}
                  />
                  <IntlMessages id="agents.photo-creci" />
                </div>
              </Col>
            </Row>
            <Row className="mt-5 justify-content-end">
              <div>
                <LoadingButton
                  outline
                  color="secondary"
                  onClick={this.goBack}
                  label={<IntlMessages id="user.back-button" />}
                />
                <LoadingButton
                  color="secondary"
                  className="ml-2"
                  disabled={this.props.approveLoading}
                  loading={this.props.approveLoading}
                  onClick={() => this.handleShowRefuseModal()}
                  label={<IntlMessages id="user.refuse-button" />}
                />
                <LoadingButton
                  className="ml-2"
                  disabled={this.props.approveLoading}
                  onClick={() => this.handleShowApprovalModal()}
                  color="primary"
                  loading={this.props.approveLoading}
                  label={<IntlMessages id="user.accept-button" />}
                />
              </div>
            </Row>
            {/* approval modal */}
            <ModalConfirmation
              showModal={this.state.showApprovalModal}
              handleShowModal={this.handleShowApprovalModal}
              title={<IntlMessages id="agency.approval-agent" />}
              onClick={() => {
                this.handleApproval(this.props.data?.agent?.request[0]?.id);
                this.handleShowApprovalModal(
                  this.props.data?.agent?.request[0]?.id
                ); // close modal after click
              }}
            />
            {/* refuse agent modal */}
            <ModalConfirmation
              showModal={this.state.showRefuseModal}
              handleShowModal={this.handleShowRefuseModal}
              title={<IntlMessages id="agency.refuse-agent" />}
              onClick={() => this.handleRevoke()}
            />
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  data: state.agent.dataId,
  fetchLoading: state.agent.fetchIdLoading,

  approveSuccess: state.agentImob.approveSuccess,
  approveLoading: state.agentImob.approveLoading,
});

const mapActionToProps = {
  fetchAgentId,
  approveAssign,
  approveAssignRefreshSuccess,
};

export default connect(mapStateToProps, mapActionToProps)(AgentForm);
