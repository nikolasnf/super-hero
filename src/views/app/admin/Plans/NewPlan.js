import React, { PureComponent } from 'react';
import { CardBody, Card, Container, Row, Col, Input, Button } from 'reactstrap';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import * as yup from 'yup';
import FormTitle from '../../../../components/forms/FormTitle';
import FormikInput from '../../../../components/forms/FormikInput';
import IntlMessages from '../../../../helpers/IntlMessages';
import { savePlan } from '../../../../redux/plans/actions';
import LoadingButton from '../../../../components/LoadingButton';
import BackButtonText from '../../../../components/BackButtonText';

const initialValues = {
  name: '',
  impressions_per_day: '',
  highlights_per_day: '',
  description: '',
  duration: '',
  price: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Campo Obrigatório'),
  impressions_per_day: yup.string().required('Campo Obrigatório'),
  highlights_per_day: yup.string().required('Campo Obrigatório'),
  description: yup.string().required('Campo Obrigatório'),
  duration: yup.string().required('Campo Obrigatório'),
  price: yup.string().required('Campo Obrigatório'),
});

class NewPlan extends PureComponent {
  handleSignup = values => {
    this.props.savePlan(values, this.props.history);
  };

  goBack = () => this.props.history.goBack();

  render() {
    return (
      <Card>
        <CardBody>
          <Container>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={this.handleSignup}
              render={({ handleSubmit }) => (
                <>
                  <BackButtonText props={this.props} />
                  <FormTitle
                    title={<IntlMessages id="plans.register-plan" />}
                    className="mb-5"
                  />
                  <Row>
                    <Col sm="12" md="6" lg="5">
                      <Field
                        component={FormikInput}
                        name="name"
                        label={<IntlMessages id="plans.plan-name" />}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md="6" lg="5">
                      <Field
                        component={FormikInput}
                        name="impressions_per_day"
                        label={
                          <IntlMessages id="plans.number-of-impulses-per-day" />
                        }
                      />
                    </Col>
                    <Col sm="12" md="6" lg="5">
                      <Field
                        component={FormikInput}
                        name="highlights_per_day"
                        label={
                          <IntlMessages id="plans.number-of-features-per-day" />
                        }
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
                        appendAddon={<IntlMessages id="plans.days" />}
                        component={FormikInput}
                        name="duration"
                        label={<IntlMessages id="plans.plan-duration" />}
                      />
                    </Col>
                    <Col sm="12" md="6" lg="5">
                      <Field
                        prependAddon="R$"
                        component={FormikInput}
                        name="price"
                        label={<IntlMessages id="plans.plan-value" />}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-5 justify-content-end">
                    <div>
                      <LoadingButton
                        outline
                        color="secondary"
                        onClick={this.goBack}
                        label={<IntlMessages id="agency.cancel-button" />}
                      />

                      <LoadingButton
                        color="primary"
                        className="ml-2"
                        onClick={handleSubmit}
                        loading={this.props.loading}
                        label={<IntlMessages id="plans.save-button" />}
                      />
                    </div>
                  </Row>
                </>
              )}
            />
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  success: state.plans.saveSuccess,
  error: state.plans.saveError,
  loading: state.plans.saveLoading,
});

const mapActionsToProps = {
  savePlan,
};

export default connect(mapStateToProps, mapActionsToProps)(NewPlan);
