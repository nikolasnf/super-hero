import React, { PureComponent } from 'react';
import {
  Card,
  CardBody,
  Container,
  Col,
  Row,
  Input,
  Collapse,
  Button,
} from 'reactstrap';
import * as yup from 'yup';
import { Formik, Field } from 'formik';
import axios from 'axios';
import { connect } from 'react-redux';
import valid from 'card-validator';
import IntlMessages from '../../../../helpers/IntlMessages';
import FormTitle from '../../../../components/forms/FormTitle';
import FormInfo from '../../../../components/forms/FormInfo';
import Thumb from '../../../../components/thumbImage';
import validateCnpj from './components/validateCnpj';
import FormikInput from '../../../../components/forms/FormikInput';

import LoadingButton from '../../../../components/LoadingButton';
import CustomSpinner from '../../../../components/customSpinner';
import { getMyProfile, editMyProfile } from '../../../../redux/agency/actions';

const validationSchema = yup.object().shape({
  socialName: yup.string().required('Campo Obrigatório'),
  cnpj: yup
    .string()
    .required('Campo Obrigatório')
    .min(18, 'CNPJ Incompleto'),
  // .test(
  //   'valida-cnpj',
  //   'CNPJ Inválido',
  //   cnpj => cnpj && cnpj.length === 18 && validateCnpj(cnpj)
  // ),
  creci: yup.string().required('Campo Obrigatório'),
  street: yup.string().required('Campo Obrigatório'),
  zip_code: yup
    .string()
    .required('Campo Obrigatório')
    .min(9, 'CEP Incompleto'),
  number: yup.string().required('Campo Obrigatório'),
  complement: yup.string(),
  city: yup.string().required('Campo Obrigatório'),
  district: yup.string().required('Campo Obrigatório'),
  state: yup.string().required('Campo Obrigatório'),
  phone: yup
    .string()
    .required('Campo Obrigatório')
    .min(14, 'Telefone Incompleto'),
  /* newcard_number: yup
    .string()
    .test(
      'test-number', // this is used internally by yup
      'Cartão invalido!', // validation message
      value => valid.number(value).isValid
    ) // return true false based on validation
    .required(),
  newexpiration_date: yup
    .string()
    .test(
      'test-number',
      'Data inválida',
      value => valid.expirationDate(value).isValid
    )
    .required(),
  newcvv: yup
    .string()
    .test('test-number', 'CVV inválido', value => valid.cvv(value).isValid)
    .required(),
  newname: yup.string().required('Campo Obrigatório'),
  newcnpj: yup
    .string()
    .required('Campo Obrigatório')
    .min(18, 'CNPJ Incompleto')
    .test(
      'valida-cnpj',
      'CNPJ Inválido',
      cnpj => cnpj && cnpj.length === 18 && validateCnpj(cnpj)
    ), */
});

const getCEP = async (cep, setFieldValue) => {
  const response = await axios.request({
    method: 'get',
    url: `https://viacep.com.br/ws/${cep}/json/`,
  });
  if (response.status === 200 && !response.data.erro) {
    setFieldValue('city', response.data.localidade);
    setFieldValue('state', response.data.uf);
    setFieldValue('street', response.data.logradouro);
    setFieldValue('district', response.data.bairro);
    setFieldValue('complement', response.data.complemento);
  }
  return null;
};

class Me extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      collapseOpen: false,
    };
  }

  toggle = () => {
    const collapse = this.state.collapseOpen;
    this.setState({ collapseOpen: !collapse });
  };

  componentDidMount() {
    this.props.getMyProfile();
  }

  onFileChange = event => {
    this.setState({ file: event.target.files[0] });
  };

  editProfile = values => {
    const data = {
      creci: values.creci,
      phone: values.phone,
      address: {
        street: values.street,
        zip_code: values.zip_code,
        number: values.number,
        complement: values.complement,
        district: values.district,
        city: values.city,
        state: values.state,
      },
    };
    this.props.editMyProfile(data, this.state.file);
  };

  render() {
    const data = this.props.myProfile;
    const loading = this.props.myProfileLoading;
    const { readOnly } = this.props;
    console.log(data);
    return (
      <Card>
        <CardBody>
          <Container fluid>
            {loading ? (
              <CustomSpinner />
            ) : (
              <Formik
                initialValues={{
                  creci: data?.profile?.agency?.creci,
                  street: data?.profile?.address?.street,
                  zip_code: data?.profile?.address?.zip_code,
                  number: data?.profile?.address?.number,
                  complement: data?.profile?.address?.complement,
                  city: data?.profile?.address?.city,
                  district: data?.profile?.address?.district,
                  state: data?.profile?.address?.state,
                  phone: data?.profile?.phone,
                }}
                enableReinitialize
                onSubmit={this.editProfile}
                validationSchema={validationSchema}
                render={({
                  handleSubmit,
                  errors,
                  values,
                  handleChange,
                  setFieldValue,
                }) => (
                  <>
                    {console.log(errors)}
                    <FormTitle title={<IntlMessages id="menu.mydata" />} />
                    <Row className="align-items-center justify-content-center mt-3 mb-3">
                      <img
                        src={data?.profile?.photo}
                        className="rounded-circle agency-image"
                        width={50}
                        height={50}
                      />
                    </Row>
                    <FormTitle
                      title={<IntlMessages id="agency.datas" />}
                      className="mb-2"
                    />
                    <Row>
                      <Col sm="12" md="8" lg="3">
                        <FormInfo
                          value={data?.profile?.name}
                          label={<IntlMessages id="agency.company-name" />}
                        />
                      </Col>
                      <Col sm="12" md="6" lg="3">
                        <FormInfo
                          value={data?.profile?.agency?.fantasy_name}
                          label={<IntlMessages id="user.fantasy_name" />}
                        />
                      </Col>
                      <Col sm="6" md="3" lg="3">
                        <FormInfo
                          value={data?.profile?.agency?.cnpj}
                          label={<IntlMessages id="agency.cnpj" />}
                        />
                      </Col>
                      <Col sm="6" md="3" lg="3">
                        <Field
                          component={FormikInput}
                          label={<IntlMessages id="agency.creci" />}
                          name="creci"
                          mask="999999"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6" md="2" lg="2">
                        <Field
                          component={FormikInput}
                          label={<IntlMessages id="agency.zipcode" />}
                          onChange={e => {
                            if (e.target.value.length === 9)
                              getCEP(e.target.value, setFieldValue);
                            setFieldValue('zip_code', e.target.value);
                          }}
                          name="zip_code"
                          mask="99999-999"
                        />
                      </Col>
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
                      <Col sm="6" md="2" lg="2">
                        <Field
                          component={FormikInput}
                          label={<IntlMessages id="agency.district" />}
                          name="district"
                        />
                      </Col>
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
                          label={<IntlMessages id="agency.state" />}
                          name="state"
                        />
                      </Col>
                      <Col sm="6" md="3" lg="3">
                        <Field
                          component={FormikInput}
                          label={<IntlMessages id="agency.phone" />}
                          name="phone"
                          mask={
                            values.phone?.length && values.phone[5] === '9'
                              ? '(99) 99999-9999'
                              : '(99) 9999-9999'
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>
                        <div>
                          <div className="fallback">
                            <Input
                              name="file"
                              type="file"
                              onChange={e => {
                                this.onFileChange(e);
                              }}
                              className="form-control"
                            />
                          </div>
                          <Thumb file={this?.state?.file} />
                        </div>
                      </Col>
                    </Row>
                    <FormTitle title={<IntlMessages id="agency.my-cards" />} />
                    <div>
                      <Button
                        color="primary"
                        onClick={this.toggle}
                        style={{ marginBottom: 30, marginTop: 20 }}
                      >
                        Adicionar novo cartão
                      </Button>

                      <Collapse isOpen={this.state.collapseOpen}>
                        <Row>
                          <Col sm="12" md="4" lg="4">
                            <Field
                              disabled={readOnly}
                              component={FormikInput}
                              name="newcard_number"
                              label={<IntlMessages id="subs.card_number" />}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="6" md="3" lg="2">
                            <Field
                              disabled={readOnly}
                              component={FormikInput}
                              name="newexpiration_date"
                              label={<IntlMessages id="subs.expiration_date" />}
                              mask="99/99"
                            />
                          </Col>
                          <Col sm="6" md="3" lg="2">
                            <Field
                              disabled={readOnly}
                              component={FormikInput}
                              name="newcvv"
                              label={<IntlMessages id="subs.cvv" />}
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col sm="6" md="4" lg="4">
                            <Field
                              disabled={readOnly}
                              component={FormikInput}
                              name="newname"
                              label={<IntlMessages id="subs.cardholder_name" />}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="6" md="4" lg="4">
                            <Field
                              disabled={readOnly}
                              component={FormikInput}
                              name="newcnpj"
                              label={<IntlMessages id="subs.cnpj" />}
                              mask="99.999.999/9999-99"
                            />
                          </Col>
                        </Row>
                      </Collapse>
                    </div>
                    <Row className="mt-5 justify-content-end">
                      <LoadingButton
                        outline
                        color="secondary"
                        onClick={() => this.props.history.goBack()}
                        loading={
                          !this.props.editError && this.props.editLoading
                        }
                        disabled={
                          !this.props.editError && this.props.editLoading
                        }
                        label={<IntlMessages id="agency.cancel-button" />}
                      />
                      <LoadingButton
                        color="primary"
                        className="ml-2"
                        disabled={
                          !this.props.editError && this.props.editLoading
                        }
                        onClick={handleSubmit}
                        loading={
                          !this.props.editError && this.props.editLoading
                        }
                        label={<IntlMessages id="plans.save-button" />}
                      />
                    </Row>
                  </>
                )}
              />
            )}
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  myProfile: state.agency.myProfile,
  myProfileLoading: state.agency.myProfileLoading,
  editLoading: state.agency.editLoading,
  editSuccess: state.agency.editSuccess,
  editError: state.agency.editError,
});

const mapActionsToProps = {
  getMyProfile,
  editMyProfile,
};

export default connect(mapStateToProps, mapActionsToProps)(Me);
