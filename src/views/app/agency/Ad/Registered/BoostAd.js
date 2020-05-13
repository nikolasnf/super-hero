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
import { connect } from 'react-redux';
import IntlMessages from '../../../../../helpers/IntlMessages';
import Plans from '../../../../../components/plans';
import { fetchPlans } from '../../../../../redux/plans/actions';

function renderPlans(items, handleSelect) {
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
    return (
      <Col sm={6} md={4} lg={3}>
        <Plans
          title={item.name}
          description={item.description}
          price={item.price}
          assign
          onClick={() =>
            handleSelect.push(`/app/agency/subscriptions/payment/${item.id}`)
          }
        />
      </Col>
    );
  });
}

class BoostAd extends PureComponent {
  state = {};

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.props.fetchPlans();
  }

  render() {
    return (
      <Card>
        <CardBody>
          <Container>
            <p style={{ fontWeight: 800, fontSize: 16, marginBottom: 30 }}>
              <IntlMessages id="ad.plans" />
            </p>
            {console.log(this.props.data)}
            <div className="d-flex flex-wrap justify-content-between">
              {renderPlans(this.props.data, this.props.history)}
            </div>
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  data: state.plans.data,
  loading: state.plans.fetchLoading,
  error: state.plans.fetchError,
});

const mapActionToProps = {
  fetchPlans,
};

export default connect(mapStateToProps, mapActionToProps)(BoostAd);
