import React, { PureComponent } from 'react';
import { Card, CardBody, Container, Col, Row, Button } from 'reactstrap';

import './styles.scss';
import { connect } from 'react-redux';
import FormTitle from '../../../../../components/forms/FormTitle';
import FormInfo from '../../../../../components/forms/FormInfo';

import {
  fetchAgencyId,
  fetchAssignedAgents,
  unassignAgent,
} from '../../../../../redux/agency/actions';

import IntlMessages from '../../../../../helpers/IntlMessages';
import AdList from '../Ads/components/AdList';
import BackButtonText from '../../../../../components/BackButtonText';

const status = {
  pending: 'Pendente',
  revoked: 'Recusado',
  assigned: 'Vinculado',
};

class AgencyProfile extends PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAgency(id);
  }

  getStatus(item) {
    const found = item.find(
      ({ agency_id }) => agency_id === this.props?.data?.agency?.id
    );
    console.log(found);
    return found.status;
  }

  render() {
    if (this.props.loading) {
      return <div className="loading" />;
    }

    const { data, assignedData } = this.props;
    console.log(this.props.data);
    return (
      <Card>
        <CardBody>
          <Container fluid>
            <BackButtonText props={this.props} />
            <FormTitle
              title={<IntlMessages id="agency.registry-agency" />}
              className="mb-5"
            />

            <Row className="align-items-center">
              <Col sm="3" md="4" lg="4">
                <FormInfo
                  label={<IntlMessages id="agency.status" />}
                  value={status[data?.status]}
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
              <Col sm="12" md="8" lg="3">
                <FormInfo
                  label={<IntlMessages id="agency.company-name" />}
                  value={data?.name}
                />
              </Col>
              <Col sm="12" md="6" lg="3">
                <FormInfo
                  label={<IntlMessages id="user.fantasy_name" />}
                  value={data?.fantasy_name}
                />
              </Col>
              <Col sm="6" md="3" lg="3">
                <FormInfo
                  label={<IntlMessages id="agency.cnpj" />}
                  value={data?.cnpj}
                />
              </Col>
              <Col sm="6" md="3" lg="3">
                <FormInfo
                  label={<IntlMessages id="agency.creci" />}
                  value={data?.creci}
                />
              </Col>
            </Row>

            <Row>
              <Col sm="6" md="2" lg="2">
                <FormInfo
                  label={<IntlMessages id="agency.zipcode" />}
                  value={data?.zip_code}
                />
              </Col>
              <Col sm="12" md="5" lg="5">
                <FormInfo
                  label={<IntlMessages id="agency.street" />}
                  value={data?.street}
                />
              </Col>

              <Col sm="6" md="2" lg="2">
                <FormInfo
                  label={<IntlMessages id="agency.number" />}
                  value={data?.number}
                />
              </Col>
              <Col sm="6" md="3" lg="3">
                <FormInfo
                  label={<IntlMessages id="agency.complement" />}
                  value={data?.complement}
                />
              </Col>
            </Row>

            <Row>
              <Col sm="6" md="2" lg="2">
                <FormInfo
                  label={<IntlMessages id="agency.district" />}
                  value={data?.district}
                />
              </Col>
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
                  label={<IntlMessages id="agency.phone" />}
                  value={data?.phone}
                />
              </Col>
            </Row>

            <FormTitle
              title={<IntlMessages id="agency.linked-agents" />}
              className="mb-2 mt-3"
            />

            <div>
              {this.props.data &&
                this.props.data?.agents.map(item => (
                  <Row className="d-flex align-items-center">
                    <Col sm="3" md="3" lg="3">
                      <FormInfo
                        label={<IntlMessages id="agency.name" />}
                        value={item?.profile?.name}
                      />
                    </Col>
                    <Col sm="3" md="2" lg="2">
                      <FormInfo
                        label={<IntlMessages id="agency.creci" />}
                        value={item.creci}
                      />
                    </Col>
                    <Col sm="2" md="2" lg="2">
                      <FormInfo
                        label={<IntlMessages id="agency.phone" />}
                        value={item.profile.phone}
                      />
                    </Col>
                    <Col sm="2" md="2" lg="2">
                      <FormInfo
                        label={<IntlMessages id="agency.status" />}
                        value={status[this.getStatus(item?.request)]}
                      />
                    </Col>

                    <Col sm="3" md="3" lg="3">
                      <Button
                        className="assign-button "
                        color="secondary"
                        onClick={() =>
                          this.props.unassignAgent(
                            this.props.data?.profile?.agency?.id,
                            item?.id
                          )
                        }
                      >
                        <IntlMessages id="agents.deassign" />
                      </Button>
                    </Col>
                  </Row>
                ))}
              <Row className="justify-content-end">
                <Button
                  onClick={() =>
                    this.props.history.push(
                      `/app/admin/agency/agents/${this.props.data?.profile?.agency?.id}`
                    )
                  }
                  color="primary"
                >
                  + <IntlMessages id="agency.link-button" />
                </Button>
              </Row>
            </div>

            <FormTitle
              title={<IntlMessages id="agency.registered-ads" />}
              className="mb-2 mt-3"
            />
            <AdList
              ads={this.props.data?.profile?.ads || []}
              history={this.props.history}
            />
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  data: state.agency.dataId,
  loading: state.agency.fetchIdLoading,
  error: state.agency.fetchIdError,
  assignedData: state.agency.assignedData,
});

const mapActionsToProps = {
  fetchAgency: fetchAgencyId,
  fetchAssignedAgents,
  unassignAgent,
};

export default connect(mapStateToProps, mapActionsToProps)(AgencyProfile);
