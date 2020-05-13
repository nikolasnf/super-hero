import React, { Component, Fragment, Suspense } from 'react';
import {
  Row,
  Container,
  Col,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  Card,
  CardBody,
  Spinner,
} from 'reactstrap';
import { connect } from 'react-redux';
import IntlMessages from '../../../../helpers/IntlMessages';
import {
  fetchAgenciesSubscription,
  fetchActualSubscription,
} from '../../../../redux/subscription/actions';
import SubscriptionCard from '../../../../components/subscriptionCard';
import ModalConfirmation from '../../../../components/ModalConfirmation';

function renderPlans(items, selectedId, handleSelect) {
  items = items.sort((a, b) => {
    const bandA = a.name;
    const bandB = b.name;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  });

  return items.map(item => {
    return item.id === selectedId ? (
      <Col sm={6} md={4} lg={3}>
        <SubscriptionCard
          title={item?.name}
          price={item?.price}
          agents={item?.agents_linked}
          onClick={() => handleSelect(item?.id)}
          style={{ backgroundColor: ' #49D3F5' }}
        />
      </Col>
    ) : (
      <Col sm={6} md={4} lg={3}>
        <SubscriptionCard
          title={item?.name}
          price={item?.price}
          agents={item?.agents_linked}
          onClick={() => handleSelect(item?.id)}
        />
      </Col>
    );
  });
}
class SubscriptionList extends Component {
  state = {
    selectSub: undefined,
    width: window.innerWidth,
    showModal: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.props.fetchAgenciesSubscription();
    this.props.fetchActualSubscription();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  resizeListener = () => {
    const width = window.innerWidth;
    this.setState({ width });
  };

  handleSelect = id => {
    this.setState({ selectSub: id });
  };

  handleShowModal = () => {
    console.log('show');
    const modal = this.state.showModal;
    this.setState({ showModal: !modal });
  };

  render() {
    const subs_data = this.props?.subscriptionData?.subscription
      ?.agency_subscription;
    console.log(this.props.subscriptionData.subscription);
    return (
      <Card>
        <CardBody>
          <Container fluid>
            <p style={{ fontWeight: 800, fontSize: 16, paddingBottom: 50 }}>
              <IntlMessages id="plans.chose-plan" />
            </p>
            <Row>
              {renderPlans(
                this.props.data,
                this.state.selectSub,
                this.handleSelect
              )}
            </Row>

            <p
              style={{
                fontWeight: 800,
                fontSize: 16,
                marginTop: 40,
              }}
            >
              <IntlMessages id="plans.actual-plan" />
            </p>

            {subs_data ? (
              <Col sm={6} md={4} lg={3}>
                <SubscriptionCard
                  className="mt-4"
                  title={subs_data?.name}
                  price={subs_data?.price}
                  agents={subs_data?.agents_linked}
                />
              </Col>
            ) : (
              <IntlMessages id="plans.dont-have" />
            )}
            <Row className="justify-content-end mt-5">
              <Button outline onClick={() => this.handleShowModal()}>
                <IntlMessages id="plans.change" />
              </Button>
              <Button
                className="ml-3"
                onClick={() => {
                  if (this.state.selectSub !== undefined)
                    this.props.history.push(
                      `/app/agency/subscriptions/payment/${this.state.selectSub}`
                    );
                }}
              >
                <IntlMessages id="plans.assign" />
              </Button>
            </Row>
            <ModalConfirmation
              showModal={this.state.showModal}
              handleShowModal={this.handleShowModal}
              title="Deseja trocar de assinatura?"
              onClick={() => {}}
            />
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  data: state.subscription.data,
  loading: state.subscription.fetchLoading,
  error: state.subscription.fetchError,
  agencyData: state.agency.data,
  subscriptionData: state.subscription.subscriptionData,
  subscriptionLoading: state.subscription.fetchSubscriptionLoading,
  subscriptionError: state.subscription.fetchSubscriptionError,
});

const mapActionsToProps = {
  fetchAgenciesSubscription,
  fetchActualSubscription,
};

export default connect(mapStateToProps, mapActionsToProps)(SubscriptionList);
