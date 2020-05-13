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
import FormTitle from '../../../../../components/forms/FormTitle';
import FormInfo from '../../../../../components/forms/FormInfo';
import {
  creciById,
  creciReprove,
  creciApprove,
} from '../../../../../redux/creci/actions';
import IntlMessages from '../../../../../helpers/IntlMessages';
import BackButtonText from '../../../../../components/BackButtonText';
import LoadingButton from '../../../../../components/LoadingButton';

const assignStatus = {
  pending: 'Pendente',
  revoked: 'Recusado',
  assigned: 'Vinculado',
};

class CreciProfile extends PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.creciById(id);
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

  renderStatus(status) {
    if (status === 'pending') {
      return 'Pendente';
    }
    if (status === 'accepted') {
      return 'Aceito';
    }
    if (status === 'revoked') {
      return 'Recusado';
    }
    return '';
  }

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
              title={<IntlMessages id="creci.info" />}
              className="mb-2"
            />

            <FormTitle
              title={<IntlMessages id="creci.datas" />}
              className="mb-2"
            />
            <Row>
              <Col sm="6">
                <FormInfo
                  label={<IntlMessages id="creci.profile.name" />}
                  value={data?.agent?.profile?.name}
                />
              </Col>
              <Col sm="6">
                <FormInfo
                  label={<IntlMessages id="creci.status" />}
                  value={this.renderStatus(data?.status)}
                />
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <FormInfo
                  label={<IntlMessages id="creci.old-creci" />}
                  value={data?.old_creci}
                />
              </Col>
              <Col sm="6">
                <FormInfo
                  label={<IntlMessages id="creci.new-creci" />}
                  value={data?.creci}
                />
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <FormInfo
                  label={<IntlMessages id="creci.cellPhone" />}
                  value={data?.agent?.profile?.phone}
                />
              </Col>
            </Row>

            <Row>
              <Col className="d-flex flex-row">
                <div className="justify-content-center d-flex flex-column mr-3">
                  <img
                    src={data?.old_photo_creci}
                    className="creci-image mb-1"
                  />
                  <div className="justify-content-center d-flex flex-row">
                    <IntlMessages id="creci.photo-creci-old" />
                  </div>
                </div>
                <div className="justify-content-center d-flex flex-column mr-3">
                  <img src={data?.photo_creci} className="creci-image mb-1" />
                  <div className="justify-content-center d-flex flex-row">
                    <IntlMessages id="creci.photo-creci" />
                  </div>
                </div>
                <div className="justify-content-center d-flex flex-column">
                  <img
                    src={data?.agent?.profile?.photo}
                    className="creci-image mb-1"
                  />
                  <IntlMessages id="creci.photo-agent" />
                </div>
              </Col>
            </Row>
            {data?.status === 'pending' && (
              <Row>
                <div className="mt-5 justify-content-end">
                  <LoadingButton
                    color="primary"
                    loading={!this.props.error && this.props.loading}
                    disabled={!this.props.error && this.props.loading}
                    onClick={() => this.props.creciApprove(id)}
                    label={<IntlMessages id="creci.approve" />}
                  />
                  <LoadingButton
                    color="primary"
                    loading={!this.props.error && this.props.loading}
                    disabled={!this.props.error && this.props.loading}
                    onClick={() => this.props.creciReprove(id)}
                    label={<IntlMessages id="creci.reprove" />}
                  />
                </div>
              </Row>
            )}
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  data: state.creci.data,
  loading: state.creci.loading,
});

const mapActionsToProps = {
  creciById,
  creciReprove,
  creciApprove,
};

export default connect(mapStateToProps, mapActionsToProps)(CreciProfile);
