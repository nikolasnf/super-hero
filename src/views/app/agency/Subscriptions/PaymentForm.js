import React, { PureComponent } from 'react';
import {
  CardBody,
  Card,
  Container,
  Row,
  Col,
  Input,
  Button,
  Spinner,
} from 'reactstrap';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import valid from 'card-validator';
import { assignAgencySubscription } from '../../../../redux/subscription/actions';
import FormikInput from '../../../../components/forms/FormikInput';
import { NotificationManager } from '../../../../components/common/react-notifications';
import FormTitle from '../../../../components/forms/FormTitle';
import IntlMessages from '../../../../helpers/IntlMessages';
import LoadingButton from '../../../../components/LoadingButton';
import BackButtonText from '../../../../components/BackButtonText';
import validateCnpj from './components/validateCnpj';

const initialValues = {
  card_number: '',
  expiration_date: '',
  name: '',
  cnpj: '',
  cvv: '',
};

const validationSchema = yup.object().shape({
  card_number: yup
    .string()
    .test(
      'test-number', // this is used internally by yup
      'Cartão invalido!', // validation message
      value => valid.number(value).isValid
    ) // return true false based on validation
    .required(),
  expiration_date: yup
    .string()
    .test(
      'test-number',
      'Credit Card number is invalid',
      value => valid.expirationDate(value).isValid
    )
    .required(),
  cvv: yup
    .string()
    .test(
      'test-number',
      'Credit Card number is invalid',
      value => valid.cvv(value).isValid
    )
    .required(),
  name: yup.string().required('Campo Obrigatório'),
  cnpj: yup
    .string()
    .required('Campo Obrigatório')
    .min(18, 'CNPJ Incompleto')
    .test(
      'valida-cnpj',
      'CNPJ Inválido',
      cnpj => cnpj && cnpj.length === 18 && validateCnpj(cnpj)
    ),
});

class PaymentForm extends PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
  }

  handleSignup = values => {
    const { id } = this.props.match.params;
    this.props.assignAgencySubscription(id);
  };

  goBack = () => this.props.history.goBack();

  render() {
    const { readOnly } = this.props;

    return (
      <Card>
        <CardBody>
          <Container>
            <Formik
              initialValues={readOnly ? this.props.data : initialValues}
              enableReinitialize
              onSubmit={this.handleSignup}
              validationSchema={validationSchema}
              render={({ handleSubmit, handleChange }) => (
                <>
                  <BackButtonText props={this.props} />
                  <FormTitle
                    title={<IntlMessages id="subs.payment" />}
                    className="mb-2"
                  />
                  <Row>
                    <Col sm="12" md="4" lg="4">
                      <Field
                        disabled={readOnly}
                        component={FormikInput}
                        name="card_number"
                        label={<IntlMessages id="subs.card_number" />}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6" md="3" lg="2">
                      <Field
                        disabled={readOnly}
                        component={FormikInput}
                        name="expiration_date"
                        label={<IntlMessages id="subs.expiration_date" />}
                        mask="99/99"
                      />
                    </Col>
                    <Col sm="6" md="3" lg="2">
                      <Field
                        disabled={readOnly}
                        component={FormikInput}
                        name="cvv"
                        label={<IntlMessages id="subs.cvv" />}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="6" md="4" lg="4">
                      <Field
                        disabled={readOnly}
                        component={FormikInput}
                        name="name"
                        label={<IntlMessages id="subs.cardholder_name" />}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6" md="4" lg="4">
                      <Field
                        disabled={readOnly}
                        component={FormikInput}
                        name="cnpj"
                        label={<IntlMessages id="subs.cnpj" />}
                        mask="99.999.999/9999-99"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-5 justify-content-end">
                    <div>
                      <LoadingButton
                        outline
                        color="primary"
                        onClick={this.goBack}
                        // loading={!this.props.error && this.props.loading}
                        // disabled={!this.props.error && this.props.loading}
                        label={<IntlMessages id="agency.cancel-button" />}
                      />
                      <LoadingButton
                        color="primary"
                        className="ml-2"
                        // disabled={!this.props.error && this.props.loading}
                        onClick={handleSubmit}
                        // loading={!this.props.error && this.props.loading}
                        label={<IntlMessages id="subs.pay" />}
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
  page: state.subscription.page,
  pages: state.subscription.pages,
  data: state.subscription.data,
  loading: state.subscription.assignLoading,
  error: state.subscription.assignError,
  sucess: state.subscription.assignSuccess,
});

const mapActionToProps = {
  assignAgencySubscription,
};

export default connect(mapStateToProps, mapActionToProps)(PaymentForm);
