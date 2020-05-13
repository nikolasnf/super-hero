import React, { PureComponent } from 'react';
import { CardBody, Card, Container, Row, Col, Button, Input } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import { connect } from 'react-redux';
import FormTitle from '../../../../../components/forms/FormTitle';
import Foto from './balloon.jpg';
import './styles.css';
import IntlMessages from '../../../../../helpers/IntlMessages';
import { fetchAgentRatingId } from '../../../../../redux/rating/actions';

import BackButtonText from '../../../../../components/BackButtonText';

const image = Foto;

class ViewAgent extends PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAgentRatingId(id);
  }

  handleOptionChange(changeEvent) {
    this.props.cordiality = changeEvent.target.value;
  }

  render() {
    const { data, cordiality, punctuality, knowledge } = this.props;

    return (
      <Card>
        <CardBody>
          <Container fluid>
            <BackButtonText props={this.props} />
            <FormTitle
              title={<IntlMessages id="rating.agent-rating" />}
              className="mb-5"
            />
            <Row>
              <Col sm="12" md="6" lg="5">
                <label>
                  <IntlMessages id="rating.agent" />
                </label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={data?.agent?.profile?.name}
                  disabled="true"
                />
              </Col>
              <Col sm="12" md="6" lg="3">
                ''
                <label>
                  <IntlMessages id="agency.creci" />
                </label>
                <Input
                  type="text"
                  name="creci"
                  id="creci"
                  value={data?.agent?.creci}
                  disabled="true"
                />
              </Col>
              <Col sm="12" md="6" lg="4">
                <label>
                  <IntlMessages id="agency.email" />
                </label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  value={data?.agent?.profile?.user?.email}
                  disabled="true"
                />
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
                <StarRatings
                  rating={data?.rating}
                  starRatedColor="yellow"
                  numberOfStars={5}
                  starDimension="30px"
                  starSpacing="2px"
                  name="rating"
                />
              </Col>
            </Row>

            <Row>
              <Col sm="12" md="12" lg="4">
                <label>
                  <IntlMessages id="rating.cordiality" />
                </label>

                <div className="radio">
                  <label className="d-flex align-items-center">
                    <input
                      type="radio"
                      name="wasCordial"
                      id="wasCordial"
                      value="Corretor cordial"
                      checked={cordiality === 'Corretor cordial'}
                    />
                    <span className="ml-2">
                      <IntlMessages id="rating.wasCordial" />
                    </span>
                  </label>
                </div>

                <div className="radio">
                  <label className="d-flex align-items-center">
                    <input
                      type="radio"
                      name="notCordial"
                      id="notCordial"
                      value="Não foi cordial"
                      checked={cordiality === 'Não foi cordial'}
                    />
                    <span className="ml-2">
                      <IntlMessages id="rating.notCordial" />
                    </span>
                  </label>
                </div>
              </Col>

              <Col sm="12" md="12" lg="4">
                <label>
                  <IntlMessages id="rating.punctuality" />
                </label>

                <div className="radio">
                  <label className="d-flex align-items-center">
                    <input
                      type="radio"
                      name="wasPunctuality"
                      id="wasPunctuality"
                      value="Corretor pontual"
                      checked={punctuality === 'Corretor pontual'}
                    />
                    <span className="ml-2">
                      <IntlMessages id="rating.wasPunctual" />
                    </span>
                  </label>
                </div>

                <div className="radio">
                  <label className="d-flex align-items-center">
                    <input
                      type="radio"
                      name="notPunctuality"
                      id="notPunctuality"
                      value="Não foi pontual"
                      checked={punctuality === 'Não foi pontual'}
                    />
                    <span className="ml-2">
                      <IntlMessages id="rating.notPunctual" />
                    </span>
                  </label>
                </div>
              </Col>

              <Col sm="12" md="12" lg="4">
                <label>
                  <IntlMessages id="rating.knowledge" />
                </label>

                <div className="radio">
                  <label className="d-flex align-items-center">
                    <input
                      type="radio"
                      name="knowledgeful"
                      id="knowledgeful"
                      value="Conhece bem"
                      checked={knowledge === 'Conhece bem'}
                    />
                    <span className="ml-2">
                      <IntlMessages id="rating.Knowledgeful" />
                    </span>
                  </label>
                </div>

                <div className="radio">
                  <label className="d-flex align-items-center">
                    <input
                      type="radio"
                      name="knowledgeless"
                      id="knowledgeful"
                      value="Não conhece bem"
                      checked={knowledge === 'Não conhece bem'}
                    />
                    <span className="ml-2">
                      <IntlMessages id="rating.knowledgeless" />
                    </span>
                  </label>
                </div>
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
                <label>{data?.profile?.name}</label> <br />
                <br />
                <label>{data?.profile?.user.email}</label>
              </Col>
              <Col sm="12" md="6" lg="3">
                <img src={image} className="w-75 my-3 my-md-0" />
              </Col>
              <Col sm="12" md="6" lg="3">
                <h4>
                  <IntlMessages id="rating.visiting-this-property" />
                </h4>
                Cód: 1234 <br />
                logradouro, nº123, Bairro, Cidade/UF <br />
                Data da visita: 00/00/0000
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
  data: state.rating.dataId,
  loading: state.rating.fetchIdLoading,
  error: state.rating.fetchIdError,
  cordiality: state.rating.cordiality,
  punctuality: state.rating.punctuality,
  knowledge: state.rating.knowledge,
});

const mapActionsToProps = {
  fetchAgentRatingId,
};

export default connect(mapStateToProps, mapActionsToProps)(ViewAgent);
