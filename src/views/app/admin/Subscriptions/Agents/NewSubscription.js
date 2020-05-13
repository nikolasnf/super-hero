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
import * as yup from 'yup';
import FormTitle from '../../../../../components/forms/FormTitle';
import FormikInput from '../../../../../components/forms/FormikInput';
import IntlMessages from '../../../../../helpers/IntlMessages';
import { saveAgentSubscription } from '../../../../../redux/subscription/actions';
import SelectInput from '../../../../../components/selectInput';
import LoadingButton from '../../../../../components/LoadingButton';
import BackButtonText from '../../../../../components/BackButtonText';

const initialValues = {
  name: '',
  type: '',
  description: '',
  value: '',
  ads_per_month: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  type: yup.string().required('Campo obrigatório'),
  description: yup.string().required('Campo obrigatório'),
  value: yup.string().required('Campo obrigatório'),
  ads_per_month: yup.string().required('Campo obrigatório'),
});

const options = [
  { value: 'monthly', label: 'Mensal' },
  { value: 'annually', label: 'Anual' },
];

class NewAgent extends PureComponent {
  handleSignup = values => {
    const {
      name,
      description,
      type,
      value,
      ads_per_month /* type2, value2 */,
    } = values;
    const price = value;
    // const price2 = value2;
    this.props.saveAgentSubscription(
      {
        name,
        type,
        description,
        price,
        ads_per_month,
        // price2,
        // type2,
      },
      this.props.history
    );
  };

  goBack = () => this.props.history.goBack();

  render() {
    return (
      <Card>
        <CardBody>
          <Container>
            <Formik
              initialValues={initialValues}
              onSubmit={this.handleSignup}
              validationSchema={validationSchema}
              render={({ handleSubmit, handleChange }) => (
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
                        component={SelectInput}
                        name="type"
                        onChange={selectedOption =>
                          handleChange('type')(selectedOption)
                        }
                        label={<IntlMessages id="subs.type" />}
                        options={options}
                      />
                    </Col>

                    <Col sm="12" md="6" lg="5">
                      <Field
                        component={FormikInput}
                        name="value"
                        prependAddon="R$"
                        label={<IntlMessages id="subs.value" />}
                      />
                    </Col>
                  </Row>

                  {/* NEED AJUSTMENT IN "type2" AFTER API UPDATE */}
                  <Row>
                    <Col sm="12" md="6" lg="5">
                      <Field
                        component={SelectInput}
                        name="type2"
                        onChange={selectedOption =>
                          handleChange('type2')(selectedOption)
                        }
                        label={<IntlMessages id="subs.type" />}
                        options={options}
                      />
                    </Col>

                    <Col sm="12" md="6" lg="5">
                      <Field
                        component={FormikInput}
                        name="value2"
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
  success: state.subscription.saveSuccess,
  error: state.subscription.saveError,
  loading: state.subscription.saveLoading,
});

const mapActionToProps = {
  saveAgentSubscription,
};

export default connect(mapStateToProps, mapActionToProps)(NewAgent);
