import React, { PureComponent } from 'react';
import { CardBody, Card, Container, Row, Col, Input, Button } from 'reactstrap';
import { Formik, Field } from 'formik';
import FormTitle from '../../../../../components/forms/FormTitle';
import FormikInput from '../../../../../components/forms/FormikInput';
import IntlMessages from '../../../../../helpers/IntlMessages';

const initialValues = {
  name: '',
  cnpj: '',
  creci: '',

  street: '',
  zip_code: '',
  number: '',
  complement: '',
  city: '',
  district: '',
  state: '',
  phone: '',
};

class AgencyForm extends PureComponent {
  handleSignup = values => {
    console.log(values);
  };

  goBack = () => this.props.history.goBack();

  render() {
    const { readOnly } = this.props;
    return (
      <Card>
        <CardBody>
          <Container>
            <Formik
              initialValues={readOnly ? initialValues : initialValues}
              onSubmit={this.handleSignup}
              render={({ handleSubmit }) => (
                <>
                  <div className="d-flex flex-column">
                    <FormTitle
                      title={
                        readOnly ? (
                          <IntlMessages id="agency.request-register-agency" />
                        ) : (
                          <IntlMessages id="agency.register-agency" />
                        )
                      }
                      className="mb-5"
                    />

                    <FormTitle
                      title={<IntlMessages id="agency.datas" />}
                      className="mt-4 mb-4"
                    />
                  </div>
                  <Row>
                    <Col sm="12" md="6" lg="4">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.company-name" />}
                        name="name"
                      />
                    </Col>
                    <Col sm="6" md="3" lg="4">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.cnpj" />}
                        name="cnpj"
                      />
                    </Col>
                    <Col sm="6" md="3" lg="4">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.creci" />}
                        name="creci"
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="12" md="5" lg="5">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.street" />}
                        name="street"
                      />
                    </Col>
                    <Col sm="6" md="2" lg="2">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.zipcode" />}
                        name="zip_code"
                      />
                    </Col>
                    <Col sm="6" md="2" lg="2">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.number" />}
                        name="number"
                      />
                    </Col>
                    <Col sm="6" md="3" lg="3">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.complement" />}
                        name="complement"
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="12" md="5" lg="5">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.city" />}
                        name="city"
                      />
                    </Col>
                    <Col sm="6" md="2" lg="2">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.district" />}
                        name="district"
                      />
                    </Col>
                    <Col sm="6" md="2" lg="2">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.state" />}
                        name="state"
                      />
                    </Col>
                    <Col sm="6" md="3" lg="3">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.phone" />}
                        name="phone"
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Input type="file" />
                    </Col>
                  </Row>

                  <Row className="mt-5 justify-content-end">
                    <div>
                      <Button outline color="secondary" onClick={this.goBack}>
                        <IntlMessages id="agency.cancel-button" />
                      </Button>

                      <Button
                        color="primary"
                        className="ml-2"
                        onClick={handleSubmit}
                      >
                        <IntlMessages id="user.register-button" />
                      </Button>
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

export default AgencyForm;
