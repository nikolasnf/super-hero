import React, { PureComponent } from 'react';
import { CardBody, Card, Container, Row, Col, Button, Input } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import { connect } from 'react-redux';
import FormTitle from '../../../../../components/forms/FormTitle';
import Foto from './balloon.jpg';
import './styles.css';
import IntlMessages from '../../../../../helpers/IntlMessages';
import { fetchAgencyRatingId } from '../../../../../redux/rating/actions';

import BackButtonText from '../../../../../components/BackButtonText';

const image = Foto;

class ViewPropertie extends PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAgencyRatingId(id);
  }

  render() {
    const { data } = this.props;
    console.log(data);
    const fullAdress = `${data?.ad?.address.street}, ${data?.ad?.address.number}, ${data?.ad?.address.district}, ${data?.ad?.address.city}, ${data?.ad?.address.state}`;
    return (
      <Card>
        <CardBody>
          <Container fluid>
            <BackButtonText props={this.props} />
            <FormTitle
              title={<IntlMessages id="rating.agency-rating" />}
              className="mb-5"
            />
            <Row>
              <Col sm="12" md="6" lg="5">
                <label>
                  <IntlMessages id="agency.address" />
                </label>
                <Input
                  type="text"
                  name="adress"
                  id="adress"
                  value={fullAdress}
                  disabled="true"
                />
              </Col>
              <Col sm="12" md="6" lg="3">
                <label>
                  <IntlMessages id="rating.property-id" />
                </label>
                <Input
                  type="text"
                  name="id"
                  id="id"
                  value={data?.ad?.id}
                  disabled="true"
                />
              </Col>
              <Col sm="12" md="6" lg="3">
                <img src={image} className="w-75 my-3 my-md-0 ml-md-5" />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm="12" md="12" lg="12">
                <label>
                  <IntlMessages id="rating.coment" />
                </label>
                <Input
                  type="text"
                  name="comment"
                  id="comment"
                  value={data?.comment}
                  disabled="true"
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm="12" md="6" lg="5">
                <label>
                  <IntlMessages id="rating.evaluate" />
                </label>
                <br />
                <label>
                  <IntlMessages id="rating.rate" />
                  {data?.rating}
                </label>
                <br />
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="6" lg="12">
                <hr />
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="6" lg="3">
                <h4>
                  <IntlMessages id="rating.whos-evaluate" />
                </h4>
                {data?.profile?.name} <br />
                <br />
                {data?.profile?.user.email}
              </Col>
            </Row>
            <Row className="mt-5 justify-content-end" />
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  page: state.rating.page,
  pages: state.rating.pages,
  data: state.rating.dataId,
  loading: state.rating.fetchIdLoading,
  error: state.rating.fetchIdError,
});

const mapActionsToProps = {
  fetchAgencyRatingId,
};

export default connect(mapStateToProps, mapActionsToProps)(ViewPropertie);
