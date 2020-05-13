import React, { PureComponent } from 'react';
import {
  CardBody,
  Card,
  Container,
  Row,
  Col,
  Button,
  Spinner,
} from 'reactstrap';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as yup from 'yup';
import FormTitle from '../../../../../components/forms/FormTitle';
import FormikInput from '../../../../../components/forms/FormikInput';
import IntlMessages from '../../../../../helpers/IntlMessages';
import {
  fetchAgentSubscriptionId,
  putAgentSubscription,
} from '../../../../../redux/subscription/actions';
import LoadingButton from '../../../../../components/LoadingButton';
import BackButtonText from '../../../../../components/BackButtonText';

const types = {
  monthly: 'Mensal',
  annyaly: 'Anual',
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  type: yup.string().required('Campo obrigatório'),
  description: yup.string().required('Campo obrigatório'),
  price: yup.string().required('Campo obrigatório'),
  ads_per_month: yup.string().required('Campo obrigatório'),
  // type2: yup.string().required("Campo obrigatório"),
  // price2: yup.string().required("Campo obrigatório"),
});

class EditSubscription extends PureComponent {
  handleSignup = values => {
    const { history } = this.props;
    const {
      name,
      description,
      type,
      price,
      ads_per_month /* type2,price2 */,
    } = values;
    const { id } = this.props.match.params;
    this.props.putAgentSubscription(
      { id, name, type, description, price, ads_per_month /* type2,price2 */ },
      history
    );
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAgentSubscriptionId(id);
  }

  goBack = () => this.props.history.goBack();

  render() {
    return (
      <Card>
        <CardBody>
          <Container>
            {this.props.data ? (
              <Formik
                initialValues={this.props.data}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={this.handleSignup}
                render={({ handleSubmit, values }) => (
                  <>
                    <BackButtonText props={this.props} />
                    <FormTitle
                      title={<IntlMessages id="subs.register" />}
                      className="mb-5"
                    />
                    <Row>
                      <Col sm="12" md="6" lg="5">
                        <Field
                          component={FormikInput}
                          name="name"
                          label={<IntlMessages id="subs.name" />}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12" md="12" lg="10">
                        <Field
                          component={FormikInput}
                          name="description"
                          label={<IntlMessages id="plans.description" />}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12" md="6" lg="5">
                        <Field
                          component={FormikInput}
                          name="type"
                          value={types[values.type]}
                          disabled
                          label={<IntlMessages id="subs.type" />}
                        />
                      </Col>

                      <Col sm="12" md="6" lg="5">
                        <Field
                          component={FormikInput}
                          name="price"
                          prependAddon="R$"
                          label={<IntlMessages id="subs.value" />}
                        />
                      </Col>
                    </Row>

                    {/* NEED AJUSTMENT IN "type2, price2" AFTER API UPDATE */}
                    <Row>
                      <Col sm="12" md="6" lg="5">
                        <Field
                          component={FormikInput}
                          name="type2"
                          // value={types[values.type2]}
                          disabled
                          label={<IntlMessages id="subs.type" />}
                        />
                      </Col>

                      <Col sm="12" md="6" lg="5">
                        <Field
                          component={FormikInput}
                          name="price2"
                          prependAddon="R$"
                          label={<IntlMessages id="subs.value" />}
                        />
                      </Col>
                    </Row>
                    {/* end here */}

                    <Row>
                      <Col sm="12" md="6" lg="5">
                        <Field
                          component={FormikInput}
                          disabled
                          name="ads_per_month"
                          label={<IntlMessages id="subs.ads_per_month" />}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-5 justify-content-end">
                      <div>
                        <Button outline color="secondary" onClick={this.goBack}>
                          <IntlMessages id="agency.cancel-button" />
                        </Button>

                        <LoadingButton
                          color="primary"
                          className="ml-2"
                          onClick={handleSubmit}
                          loading={this.props.saveLoading}
                          label={<IntlMessages id="plans.save-button" />}
                        />
                      </div>
                    </Row>
                  </>
                )}
              />
            ) : null}
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  data: state.subscription.dataId,
  success: state.subscription.saveSuccess,
  fetchIdLoading: state.subscription.fetchIdLoading,
  saveLoading: state.subscription.saveLoading,
});

const mapActionsToProps = {
  fetchAgentSubscriptionId,
  putAgentSubscription,
};

export default connect(mapStateToProps, mapActionsToProps)(EditSubscription);
