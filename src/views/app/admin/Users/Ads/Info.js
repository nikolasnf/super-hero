import React, { Component, Fragment } from 'react';
import {
  Row,
  Container,
  Col,
  InputGroup,
  Input,
  Label,
  Button,
  ButtonToolbar,
  Card,
  CardBody,
  Spinner,
} from 'reactstrap';
import classNames from 'classnames';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import FormTitle from '../../../../../components/forms/FormTitle';
import FormInfo from '../../../../../components/forms/FormInfo';
import FormikInput from '../../../../../components/forms/FormikInput';
import IntlMessages from '../../../../../helpers/IntlMessages';
import './styles.scss';

import { fetchAdUserId } from '../../../../../redux/user/actions';

class Info extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAdUser(id);
  }

  renderFeatures = features => {
    const parseFeatures = JSON.parse(features);
    if (parseFeatures.length > 0) {
      return parseFeatures.map(item => (
        <Label className="fullLabel">- {item}</Label>
      ));
    }
    return <Label className="fullLabel"> </Label>;
  };

  render() {
    const { data } = this.props;

    if (this.props.loading) {
      return <div className="loading" />;
    }

    return (
      <Card>
        <CardBody>
          <Container fluid>
            <Row className="align-items-center justify-content-between">
              <FormTitle
                title={<IntlMessages id="agency.property-information" />}
                className="mb-5"
              />
              <Button
                className="mb-5 back-button btn-empty"
                onClick={() => this.props.history.goBack()}
              >
                <IntlMessages id="agency.back" />
              </Button>
            </Row>
            <Row className="align-items-center">
              <Col sm="6" md="4" lg="3">
                <FormInfo
                  label={<IntlMessages id="agency.status" />}
                  value={data?.status ? 'Ativo' : 'Inativo'}
                />
              </Col>
              <Col sm="6" md="4" lg="3">
                <FormInfo
                  label={<IntlMessages id="agency.sold" />}
                  value={data?.sold ? 'Sim' : 'Não'}
                />
              </Col>
            </Row>
            <Row className="align-items-center mt-4">
              <Col sm="6" md="6" lg="3">
                <Label className="font-weight-bold" mb-5>
                  <IntlMessages id="agency.property-type" />:
                </Label>{' '}
                <Label className="font-weight-bold" mb-5>
                  {data?.type}
                </Label>
              </Col>
              <Col sm="6" md="6" lg="3">
                <Label className="font-weight-bold" mb-5>
                  <IntlMessages id="agency.roof" />:
                </Label>{' '}
                <Label className="font-weight-bold" mb-5>
                  {data?.penthouse === !0 ? 'Sim' : 'Não'}
                </Label>
              </Col>
              <Col sm="6" md="6" lg="3">
                <Label className="font-weight-bold" mb-5>
                  <IntlMessages id="agency.concierge" />:
                </Label>{' '}
                <Label className="font-weight-bold" mb-5>
                  {data?.entrance}
                </Label>
              </Col>
              <Col sm="3" md="2" lg="1">
                <Label className="font-weight-bold" mb-5>
                  <Input
                    type="radio"
                    name="radio1"
                    disabled
                    checked={!data?.is_rent}
                  />{' '}
                  {<IntlMessages id="agency.sale" />}
                </Label>
              </Col>
              <Col sm="3" md="2" lg="1">
                <Label className="font-weight-bold" mb-5>
                  <Input
                    type="radio"
                    name="radio1"
                    disabled
                    checked={data?.is_rent}
                  />{' '}
                  {<IntlMessages id="agency.rent" />}
                </Label>
              </Col>
            </Row>
            <Row className="align-items-center mt-4">
              <Col sm="12" md="5" lg="5">
                <FormInfo
                  label={<IntlMessages id="agency.zipcode" />}
                  value={data?.address.zip_code}
                />
              </Col>
              <Col sm="12" md="5" lg="5">
                <FormInfo
                  label={<IntlMessages id="agency.street" />}
                  value={data?.address.street}
                />
              </Col>
              <Col sm="12" md="2" lg="2">
                <FormInfo
                  label={<IntlMessages id="agency.number" />}
                  value={data?.address.number}
                />
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col sm="12" md="2" lg="2">
                <FormInfo
                  label={<IntlMessages id="agency.floor" />}
                  value={data?.address.floor}
                />
              </Col>
              <Col sm="12" md="4" lg="3">
                <FormInfo
                  label={<IntlMessages id="agency.city" />}
                  value={data?.address.city}
                />
              </Col>
              <Col sm="12" md="4" lg="3">
                <FormInfo
                  label={<IntlMessages id="agency.complement" />}
                  value={data?.address.complement}
                />
              </Col>
              <Col sm="12" md="2" lg="2">
                <FormInfo
                  label={<IntlMessages id="agency.uf" />}
                  value={data?.address.state}
                />
              </Col>
            </Row>
            <Row className="align-items-center mt-5">
              <Col sm="12" md="8" lg="5">
                <FormInfo
                  label={<IntlMessages id="agency.useful-area" />}
                  value={data?.area}
                />
              </Col>
              <Col sm="12" md="2" lg="2">
                <FormInfo
                  label={<IntlMessages id="agency.dorms" />}
                  value={data?.dorms}
                />
              </Col>
              <Col sm="12" md="2" lg="2">
                <FormInfo
                  label={<IntlMessages id="agency.suites" />}
                  value={data?.suites}
                />
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col sm="12" md="4" lg="3">
                <FormInfo
                  label={<IntlMessages id="agency.bathrooms" />}
                  value={data?.bathrooms}
                />
              </Col>
              <Col sm="12" md="4" lg="3">
                <FormInfo
                  label={<IntlMessages id="agency.car-space" />}
                  value={data?.parking_spots}
                />
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col sm="6" md="6" lg="2">
                <Label className="font-weight-bold" mb-5>
                  <IntlMessages id="agency.furnished" />:
                </Label>{' '}
                <Label className="font-weight-bold" mb-5>
                  {data?.furnished === !0 ? 'Sim' : 'Não'}
                </Label>
              </Col>
              <Col sm="6" md="6" lg="3">
                <Label className="font-weight-bold" mb-5>
                  <IntlMessages id="agency.key-type" />:
                </Label>{' '}
                <Label className="font-weight-bold" mb-5>
                  {data?.key_type}
                </Label>
              </Col>
              <Col sm="6" md="6" lg="2">
                <Label className="font-weight-bold" mb-5>
                  <IntlMessages id="agency.accept-animals" />:
                </Label>{' '}
                <Label className="font-weight-bold" mb-5>
                  {data?.animals_allowed === !0 ? 'Sim' : 'Não'}
                </Label>
              </Col>
              <Col sm="6" md="6" lg="3">
                <Label className="font-weight-bold" mb-5>
                  <IntlMessages id="agency.occupant" />:
                </Label>{' '}
                <Label className="font-weight-bold" mb-5>
                  {data?.who_occupied}
                </Label>
              </Col>
              <Col sm="6" md="6" lg="2">
                <Label className="font-weight-bold" mb-5>
                  <IntlMessages id="agency.advertiser" />:
                </Label>{' '}
                <Label className="font-weight-bold" mb-5>
                  {data?.announcer_is}
                </Label>
              </Col>
            </Row>
            <Row className="align-items-center mt-5">
              <FormTitle
                title={<IntlMessages id="agency.property-costs" />}
                className="mb-5"
              />
            </Row>
            <Row className="align-items-center">
              <Col sm="6" md="4" lg="4">
                <FormInfo
                  label={<IntlMessages id="agency.condominium-value" />}
                  value={data?.service_fee}
                />
              </Col>
              <Col sm="6" md="4" lg="4">
                <FormInfo
                  label={<IntlMessages id="agency.property-sale-value" />}
                  value={data?.price}
                />
              </Col>
              <Col sm="6" md="4" lg="4">
                <FormInfo
                  label={<IntlMessages id="agency.property-iptu-value" />}
                  value={data?.iptu}
                />
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="12" lg="4">
                <Label className="font-weight-bold fullLabel" mb-5>
                  <IntlMessages id="agency.home-appliances" />
                </Label>
                <Label className="fullLabel">{data?.appliances}</Label>
              </Col>
              <Col sm="12" md="12" lg="4">
                <Label className="font-weight-bold" mb-5>
                  <IntlMessages id="agency.features-items" />
                </Label>

                {data?.features ? this.renderFeatures(data?.features) : null}
              </Col>
              <Col sm="12" md="12" lg="4">
                <Label className="font-weight-bold" mb-5>
                  <IntlMessages id="agency.condominium-facilities" />
                </Label>
                {data?.building_features
                  ? this.renderFeatures(data?.building_features)
                  : null}
              </Col>
            </Row>
            <Row className="align-items-center mt-5">
              <FormTitle
                title={<IntlMessages id="agency.property-description-photos" />}
                className="mb-2"
              />
            </Row>
            <Row className="align-items-center">
              <Col sm="12" md="12" lg="6">
                <Label>{data?.description}</Label>
              </Col>
              <Col sm="12" md="12" lg="6" />
            </Row>
            <Row className="align-items-center mt-5">
              <FormTitle
                title={<IntlMessages id="agency.property-sale-information" />}
                className="mb-5"
              />
            </Row>
            <Row className="align-items-center">
              <Col sm="12" md="12" lg="12">
                <Label className="font-weight-bold" mb-5>
                  <IntlMessages id="agency.sale-reported-by" />:
                </Label>
              </Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col sm="12" md="12" lg="5">
                <FormInfo label={<IntlMessages id="agency.agent-name" />} />
              </Col>
              <Col sm="6" md="5" lg="3">
                <FormInfo label={<IntlMessages id="agency.creci" />} />
              </Col>
              <Col sm="6" md="5" lg="3">
                <FormInfo label={<IntlMessages id="agency.phone" />} />
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col sm="12" md="12" lg="12">
                <Label mb-5>
                  <IntlMessages id="agency.date" />:
                </Label>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col sm="12" md="12" lg="12">
                <Label mb-5>
                  <IntlMessages id="agency.sale-confirmed-by-the-advertiser-on" />
                  :
                </Label>
              </Col>
            </Row>
            <Row className="mt-5 justify-content-end row">
              <Button color="primary">
                <IntlMessages id="agency.deactivate" />
              </Button>
            </Row>
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  data: state.user.adDataId,
  loading: state.user.adFetchIdLoading,
  error: state.user.adFetchIdError,
});

const mapActionsToProps = {
  fetchAdUser: fetchAdUserId,
};

export default connect(mapStateToProps, mapActionsToProps)(Info);
