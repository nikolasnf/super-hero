import React, { PureComponent } from 'react';
import { CardBody, Card, Container, Row, Col, Button, Input } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import { connect } from 'react-redux';
import FormTitle from '../../../../../components/forms/FormTitle';
import './styles.css';
import IntlMessages from '../../../../../helpers/IntlMessages';
import { fetchUserRatingId } from '../../../../../redux/rating/actions';
import BackButtonText from '../../../../../components/BackButtonText';

class ViewUser extends PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchUserRatingId(id);
  }

  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <Card>
        <CardBody>
          <Container fluid>
            <BackButtonText props={this.props} />
            <FormTitle
              title={<IntlMessages id="rating.user-rating" />}
              className="mb-5"
            />
            <Row>
              <Col sm="12" md="6" lg="5">
                <label>
                  <IntlMessages id="rating.user" />
                </label>
                <Input
                  type="text"
                  name="user"
                  id="user"
                  value={data?.advertiser?.profile?.name}
                  disabled="true"
                />
              </Col>
              <Col sm="12" md="6" lg="3">
                <label>
                  <IntlMessages id="agency.email" />
                </label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  value={data?.advertiser?.profile?.user?.email}
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
                {data?.profile?.user?.email}
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
});

const mapActionsToProps = {
  fetchUserRatingId,
};

export default connect(mapStateToProps, mapActionsToProps)(ViewUser);
