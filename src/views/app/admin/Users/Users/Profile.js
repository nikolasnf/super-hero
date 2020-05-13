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
import './styles.scss';
import { connect } from 'react-redux';
import FormTitle from '../../../../../components/forms/FormTitle';
import FormInfo from '../../../../../components/forms/FormInfo';
import { fetchUserId } from '../../../../../redux/user/actions';
import IntlMessages from '../../../../../helpers/IntlMessages';
import AdList from '../Ads/components/AdList';
import BackButtonText from '../../../../../components/BackButtonText';

class UserProfile extends PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchUserId(id);
  }

  render() {
    if (this.props.loading) {
      return <div className="loading" />;
    }

    const { data } = this.props;

    return (
      <Card>
        <CardBody>
          <Container fluid>
            <BackButtonText props={this.props} />
            <FormTitle
              title={<IntlMessages id="agency.registry-user" />}
              className="mb-5"
            />
            <Row className="align-items-center">
              <Col sm="3" md="4" lg="4">
                <FormInfo
                  label={<IntlMessages id="agency.status" />}
                  value={data?.status ? 'Ativo' : 'Inativo'}
                />
              </Col>
              <Col className="col" />
              <Col sm="1">
                <img
                  src={data?.photo}
                  className="rounded-circle agency-image"
                />
              </Col>
            </Row>

            <FormTitle
              title={<IntlMessages id="agency.datas" />}
              className="mb-2 mt-3"
            />
            <Row>
              <Col sm="12" md="6" lg="4">
                <FormInfo
                  label={<IntlMessages id="agency.name" />}
                  value={data?.name}
                />
              </Col>
              <Col sm="6" md="3" lg="4">
                <FormInfo
                  label={<IntlMessages id="agency.email" />}
                  value={data?.email}
                />
              </Col>
            </Row>

            <Row>
              <Col sm="6" md="3" lg="3">
                <FormInfo
                  label={<IntlMessages id="agency.phone" />}
                  value={data?.phone}
                />
              </Col>
            </Row>

            <Row>
              <Col className="d-flex flex-row">
                <div className="justify-content-center d-flex flex-column mr-3">
                  <img className="agent-image mb-1" />
                  <IntlMessages id="users.photo" />
                </div>
              </Col>
            </Row>

            <FormTitle
              title={<IntlMessages id="users.adverstiments" />}
              className="mb-2 mt-3"
            />
            <AdList
              ads={this.props.data?.profile?.ads || []}
              history={this.props.history}
            />
            <div className="d-flex justify-content-end" />
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  data: state.user.dataId,
  loading: state.user.fetchIdLoading,
  error: state.user.fetchIdError,
});

const mapActionsToProps = {
  fetchUserId,
};

export default connect(mapStateToProps, mapActionsToProps)(UserProfile);
