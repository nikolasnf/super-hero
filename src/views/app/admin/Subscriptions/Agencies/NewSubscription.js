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
import { saveAgencySubscription } from '../../../../../redux/subscription/actions';
import selectInput from '../../../../../components/selectInput';
import LoadingButton from '../../../../../components/LoadingButton';
import BackButtonText from '../../../../../components/BackButtonText';

const initialValues = {
  name: '',
  type: '',
  description: '',
  price: '',
  // price2: "",
  agents_linked: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  type: yup.string().required('Campo obrigatório'),
  description: yup.string().required('Campo obrigatório'),
  price: yup.string().required('Campo obrigatório'),
  // price2: yup.string().required("Campo obrigatório"),
  agents_linked: yup.string().required('Campo obrigatório'),
});

const options = [
  { value: 'monthly', label: 'Mensal' },
  { value: 'annually', label: 'Anual' },
];

class NewSubscription extends PureComponent {
  handleSignup = values => {
    this.props.saveAgencySubscription(values, this.props.history);
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
                        component={selectInput}
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
                        prependAddon="R$"
                        component={FormikInput}
                        name="price"
                        label={<IntlMessages id="subs.price" />}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="12" md="6" lg="5">
                      <Field
                        component={selectInput}
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
                        prependAddon="R$"
                        component={FormikInput}
                        name="price2"
                        label={<IntlMessages id="subs.price" />}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="12" md="6" lg="5">
                      <Field
                        component={FormikInput}
                        name="agents_linked"
                        label={<IntlMessages id="subs.agents_linked" />}
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
  loading: state.subscription.saveLoading,
  error: state.subscription.saveError,
  success: state.subscription.saveSuccess,
});

const mapActionToProps = {
  saveAgencySubscription,
};

export default connect(mapStateToProps, mapActionToProps)(NewSubscription);
