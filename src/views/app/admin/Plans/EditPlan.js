import React, { PureComponent } from 'react';
import { CardBody, Card, Container, Row, Col, Input, Button } from 'reactstrap';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import * as yup from 'yup';
import FormTitle from '../../../../components/forms/FormTitle';
import FormikInput from '../../../../components/forms/FormikInput';
import IntlMessages from '../../../../helpers/IntlMessages';
import { fetchPlanId, editPlans } from '../../../../redux/plans/actions';
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

class EditPlan extends PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPlanId(id);
  }

  handleSignup = values => {
    const { id } = this.props.match.params;
    this.props.editPlans(id, values, this.props.history);
  };

  goBack = () => this.props.history.goBack();

  render() {
    return (
      <Card>
        <CardBody>
          <Container>
            <Formik
              initialValues={this.props.data || initialValues}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={this.handleSignup}
              render={({ handleSubmit, values }) => (
                <>
                  <BackButtonText props={this.props} />
                  <FormTitle
                    title={<IntlMessages id="plans.edit-plan" />}
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
                        disabled
                        name="impressions_per_day"
                        label={
                          <IntlMessages id="plans.number-of-impulses-per-day" />
                        }
                      />
                    </Col>
                    <Col sm="12" md="6" lg="5">
                      <Field
                        component={FormikInput}
                        disabled
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
                        component={FormikInput}
                        disabled
                        name="duration"
                        label={<IntlMessages id="plans.plan-duration" />}
                        appendAddon={<IntlMessages id="plans.days" />}
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
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  data: state.plans.dataId,
  loading: state.plans.fetchIdLoading,
  saveLoading: state.plans.saveLoading,
  error: state.plans.fetchIdError,

  saveSuccess: state.plans.saveSuccess,
});

const mapActionsToProps = {
  fetchPlanId,
  editPlans,
};

export default connect(mapStateToProps, mapActionsToProps)(EditPlan);
