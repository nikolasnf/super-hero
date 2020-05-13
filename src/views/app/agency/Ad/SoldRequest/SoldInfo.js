import React, { PureComponent } from 'react';
import { Card, CardBody, Container, Input, Col, Row } from 'reactstrap';
import './styles.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FormTitle from '../../../../../components/forms/FormTitle';
import LoadingButton from '../../../../../components/LoadingButton';
import FormInfo from '../../../../../components/forms/FormInfo';
import {
  fetchAdRequestId,
  acceptAdSoldRequest,
  removeAdSoldRequest,
} from '../../../../../redux/ad/actions';
import IntlMessages from '../../../../../helpers/IntlMessages';
import ModalConfirmation from '../../../../../components/ModalConfirmation';
import { formatOnlyDate } from '../../../../../helpers/Utils';

const typeOptions = {
  AD_TYPE_APARTMENT: 'Apartamento',
  AD_TYPE_KITNET_STUDIO: 'Kitnet/Studio',
  AD_TYPE_TOWNHOUSE: 'Casa de condomínio',
  AD_TYPE_HOUSE: 'Casa',
};
class SoldInfo extends PureComponent {
  state = {
    showAcceptModal: false,
    showRemoveModal: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAdRequestId(id);
  }

  handleShowAcceptModal = () => {
    const enable = this.state.showAcceptModal;
    this.setState({ showAcceptModal: !enable });
  };

  handleShowRemoveModal = () => {
    const disable = this.state.showRemoveModal;
    this.setState({ showRemoveModal: !disable });
  };

  render() {
    if (this.props.loading) {
      return <div className="loading" />;
    }

    const { data } = this.props;
    const sold_date = formatOnlyDate(data?.sold_at);
    const bedrooms = data?.ad?.dorms + data?.ad?.suites;
    const info = `${
      typeOptions[data?.ad?.type] ? typeOptions[data?.ad?.type] : data?.ad?.type
    } ${bedrooms} quartos, ${data?.ad?.area}m²`;

    const adAddress = `${data?.ad?.address?.street}, nº ${data?.ad?.address?.number} - 
      ${data?.ad?.address?.district} - ${data?.ad?.address?.city}
       - ${data?.ad?.address?.state}`;
    return (
      <Card>
        <CardBody>
          <Container>
            <FormTitle
              title={<IntlMessages id="ad.info-sold" />}
              className="mb-2"
            />

            <FormTitle
              title={<IntlMessages id="agency.datas" />}
              className="mb-2"
            />
            <Row>
              <Col sm="12" md="6" lg="5">
                <FormInfo
                  label={<IntlMessages id="agency.name" />}
                  value={data?.agent?.profile?.name}
                />
              </Col>
              <Col sm="6" md="3" lg="4">
                <FormInfo
                  label={<IntlMessages id="agency.creci" />}
                  value={data?.agent?.creci}
                />
              </Col>
            </Row>

            <Row>
              <Col sm="12" md="5" lg="5">
                <FormInfo
                  label={<IntlMessages id="agency.city" />}
                  value={data?.agent?.address?.city}
                />
              </Col>
              <Col sm="6" md="2" lg="2">
                <FormInfo
                  label={<IntlMessages id="agency.state" />}
                  value={data?.agent?.address?.state}
                />
              </Col>
              <Col sm="6" md="3" lg="3">
                <FormInfo
                  label={<IntlMessages id="agency.cellPhone" />}
                  value={data?.agent?.profile?.phone}
                />
              </Col>
            </Row>
            <FormTitle
              title={<IntlMessages id="agency.property-information" />}
              className="mb-3"
            />
            <Row>
              <Col sm="4" md="2" lg="2">
                <img
                  style={{ width: 100, height: 120, borderRadius: 12 }}
                  src={data?.ad?.images[0]?.path}
                  alt=""
                />
              </Col>
              <Col sm="8" md="8" lg="8">
                <FormTitle
                  title={<IntlMessages id={info} />}
                  className="mb-2"
                />
                <p className="info-text">{adAddress}</p>
                <p className="info-text">R$ {data?.ad?.price}</p>
                <p className="info-text">ID: {data?.ad?.id}</p>
              </Col>
            </Row>

            <Row className="mt-5 ml-1 justify-content-between align-items-center">
              <div className="d-flex">
                <FormTitle title={<IntlMessages id="ad.sell-info" />} />
                <p className="ml-1"> {sold_date}</p>
              </div>
              <div>
                <LoadingButton
                  color="primary"
                  className="ml-2"
                  // disabled={!this.props.error && this.isLoading()}
                  onClick={() => this.props.history.goBack()}
                  // loading={!this.props.error && this.isLoading()}
                  label={<IntlMessages id="user.back-button" />}
                />
                <LoadingButton
                  color="primary"
                  className="ml-2"
                  // loading={!this.props.error && this.isLoading()}
                  // disabled={!this.props.error && this.isLoading()}
                  onClick={() => {
                    this.handleShowRemoveModal();
                  }}
                  label={<IntlMessages id="user.refuse-button" />}
                />
                <LoadingButton
                  color="primary"
                  className="ml-2"
                  // disabled={!this.props.error && this.isLoading()}
                  onClick={() => this.handleShowAcceptModal()}
                  // loading={!this.props.error && this.isLoading()}
                  label={<IntlMessages id="user.accept-button" />}
                />
              </div>
            </Row>
            <ModalConfirmation
              showModal={this.state.showAcceptModal}
              handleShowModal={this.handleShowAcceptModal}
              title={<IntlMessages id="ad.accept-sold-message" />}
              onClick={() => {
                this.props.acceptAdSoldRequest(data?.id);
                this.props.history.push(
                  `/app/agency/announcements/soldRequest`
                );
                this.handleShowAcceptModal();
              }}
            />
            <ModalConfirmation
              showModal={this.state.showRemoveModal}
              handleShowModal={this.handleShowRemoveModal}
              title={<IntlMessages id="ad.remove-sold-message" />}
              onClick={() => {
                this.props.removeAdSoldRequest(data?.id);
                this.handleShowRemoveModal();
                this.props.history.push(
                  `/app/agency/announcements/soldRequest`
                );
              }}
            />
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  error: state.ad.adRequestIdError,
  success: state.ad.adRequestIdSuccess,
  loading: state.ad.adRequestIdLoading,
  data: state.ad.adRequestIdData,
});

const mapActionsToProps = {
  fetchAdRequestId,
  acceptAdSoldRequest,
  removeAdSoldRequest,
};

export default connect(mapStateToProps, mapActionsToProps)(SoldInfo);
