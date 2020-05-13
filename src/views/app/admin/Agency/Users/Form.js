import React, { PureComponent, useState } from 'react';
import {
  CardBody,
  Card,
  Container,
  Row,
  Col,
  Input,
  Button,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CustomInput,
} from 'reactstrap';

import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import * as yup from 'yup';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor';
import FormikInput from '../../../../../components/forms/FormikInput';
import {
  saveAgency,
  fetchAgencyId,
  approvalAgency,
} from '../../../../../redux/agency/actions';

import { NotificationManager } from '../../../../../components/common/react-notifications';
import IntlMessages from '../../../../../helpers/IntlMessages';
import validateCnpj from './components/validateCnpj';
import FormTitle from '../../../../../components/forms/FormTitle';
import selectState from '../../../../../components/selectState';

import LoadingButton from '../../../../../components/LoadingButton';
import BackButtonText from '../../../../../components/BackButtonText';
import ModalExample from '../../../../../components/Modal';

import Thumb from '../../../../../components/thumbImage';
import './styles.scss';

const initialValues = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  cnpj: '',
  creci: '',
  fantasy_name: '',
  street: '',
  zip_code: '',
  number: '',
  complement: '',
  city: '',
  district: '',
  state: '',

  phone: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Campo Obrigatório'),
  fantasy_name: yup.string().required('Campo Obrigatório'),
  email: yup
    .string()
    .required('Campo Obrigatório')
    .email('Email inválido'),
  password: yup
    .string()
    .required('Campo Obrigatório')
    .min(8, 'Senha deve conter ao menos 8 caracteres'),
  password_confirmation: yup
    .string()
    .required('Campo Obrigatório')
    .oneOf([yup.ref('password'), null], 'Senhas não conferem'),
  cnpj: yup
    .string()
    .required('Campo Obrigatório')
    .min(18, 'CNPJ Incompleto')
    .test(
      'valida-cnpj',
      'CNPJ Inválido',
      cnpj => cnpj && cnpj.length === 18 && validateCnpj(cnpj)
    ),
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

class AgencyForm extends React.Component {
  state = {
    evaluated: false,
    file: null,
    showModal: false,
    zoom: 0,
    rotate: 0,
    editor: null,
  };

  componentDidMount() {
    if (this.props.readOnly) {
      const { id } = this.props.match.params;
      this.props.fetchAgencyId(id);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.error && nextProps.error) {
      NotificationManager.error(nextProps.error, 'Erro', 3000, null, null, '');
      return false;
    }

    if (this.props.match.params !== nextProps.match.params) {
      this.props.fetchAgencyId(nextProps.match.params.id);
      return false;
    }
    return true;
  }

  handleSignup = (values, fileConverted) => {
    const { history } = this.props;
    const {
      street,
      zip_code,
      number,
      complement,
      city,
      district,
      state,
      name,
    } = values;
    this.props.saveAgency(
      {
        ...values,
        address: {
          street,
          zip_code,
          number,
          complement,
          city,
          district,
          state,
          // status: true
        },
        // status: true,
        type: 'Agency',
        history,
      },
      fileConverted
    );
  };

  goBack = () => this.props.history.goBack();

  handleApproval = (id, approved) => {
    this.props.approvalAgency({
      id,
      approved,
    });
    this.setState({ evaluated: true });
  };

  zoomChange = e => {
    this.setState({ zoom: e });
  };

  rotateChange = () => {
    const { rotate } = this.state;
    this.setState({ rotate: rotate + 90 });
  };

  setEditorRef = editor => this.setState({ editor });

  onCrop = values => {
    console.log('oncrop: ', values);
    const { editor } = this.state;
    if (editor !== null) {
      const url = editor.getImageScaledToCanvas().toDataURL();
      fetch(url)
        .then(res => res.blob())
        .then(blob => {
          const fd = new FormData();
          fd.append('image', blob, 'filename');
          const file = new File([blob], 'profilePitcture', { type: blob.type });
          this.handleSignup(values, file);
        });
    }
  };

  handleApprovalMessage = (id, approved, reproved_message, allow_resend) => {
    this.props.approvalAgency({
      id,
      approved,
      reproved_message,
      allow_resend,
    });
    this.setState({ evaluated: true });
  };

  onFileChange = event => {
    this.setState({ file: event.target.files[0] });
    console.log(event.target.files[0]);
  };

  handleShowModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  render() {
    const { readOnly, stateSelected } = this.props;
    if (this.props.approvalSuccess && this.state.evaluated) {
      return <Redirect to="/app/admin/agency/list" />;
    }

    if (this.props.loading || this.props.fetchLoading) {
      return <div className="loading" />;
    }

    const { zoom, rotate } = this.state;
    return (
      <Card>
        <CardBody>
          <Container>
            <Formik
              initialValues={readOnly ? this.props.data : initialValues}
              enableReinitialize
              onSubmit={this.onCrop}
              validationSchema={validationSchema}
              render={({
                handleSubmit,
                errors,
                values,
                handleChange,
                setFieldValue,
              }) => (
                <>
                  <div className="d-flex flex-column">
                    <BackButtonText props={this.props} />
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

                    {!readOnly && (
                      <>
                        <FormTitle
                          title={<IntlMessages id="agency.credentials" />}
                          className="mb-2"
                        />
                        <Row>
                          <Col sm="12" md="4" lg="4">
                            <Field
                              component={FormikInput}
                              name="email"
                              label={<IntlMessages id="agency.email" />}
                              disabled={readOnly}
                            />
                          </Col>
                          <Col sm="6" md="4" lg="4">
                            <Field
                              component={FormikInput}
                              name="password"
                              label={<IntlMessages id="agency.password" />}
                              type="password"
                              disabled={readOnly}
                            />
                          </Col>
                          <Col sm="6" md="4" lg="4">
                            <Field
                              component={FormikInput}
                              disabled={readOnly}
                              name="password_confirmation"
                              label={
                                <IntlMessages id="agency.confirm-password" />
                              }
                              type="password"
                            />
                          </Col>
                        </Row>
                      </>
                    )}

                    <FormTitle
                      title={<IntlMessages id="agency.datas" />}
                      className="mt-4 mb-2"
                    />
                  </div>
                  <Row>
                    <Col sm="12" md="8" lg="3">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.company-name" />}
                        disabled={readOnly}
                        name="name"
                      />
                    </Col>
                    <Col sm="12" md="6" lg="3">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="user.fantasy_name" />}
                        disabled={readOnly}
                        name="fantasy_name"
                      />
                    </Col>
                    <Col sm="6" md="3" lg="3">
                      <Field
                        component={FormikInput}
                        mask="99.999.999/9999-99"
                        label={<IntlMessages id="agency.cnpj" />}
                        disabled={readOnly}
                        name="cnpj"
                      />
                    </Col>
                    <Col sm="6" md="3" lg="3">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.creci" />}
                        disabled={readOnly}
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
                          if (e.target.value?.length === 9)
                            getCEP(e.target?.value, setFieldValue);
                          setFieldValue('zip_code', e.target?.value);
                        }}
                        disabled={readOnly}
                        name="zip_code"
                        mask="99999-999"
                      />
                    </Col>
                    <Col sm="12" md="5" lg="5">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.street" />}
                        disabled={readOnly}
                        name="street"
                      />
                    </Col>
                    <Col sm="6" md="2" lg="2">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.number" />}
                        disabled={readOnly}
                        name="number"
                      />
                    </Col>
                    <Col sm="6" md="3" lg="3">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.complement" />}
                        disabled={readOnly}
                        name="complement"
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="6" md="3" lg="2">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.district" />}
                        disabled={readOnly}
                        name="district"
                      />
                    </Col>
                    <Col sm="12" md="4" lg="5">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.city" />}
                        disabled={readOnly}
                        name="city"
                      />
                    </Col>

                    <Col sm="6" md="2" lg="2">
                      <Field
                        component={selectState}
                        value={stateSelected}
                        onChange={selectedOption =>
                          handleChange('state')(selectedOption)
                        }
                        label={<IntlMessages id="agency.state" />}
                        disabled={readOnly}
                        name="state"
                      />
                      {/* {errors.state} */}
                    </Col>
                    <Col sm="6" md="3" lg="3">
                      <Field
                        component={FormikInput}
                        label={<IntlMessages id="agency.phone" />}
                        disabled={readOnly}
                        name="phone"
                        mask={
                          values.phone?.length && values.phone[5] === '9'
                            ? '(99) 99999-9999'
                            : '(99) 9999-9999'
                        }
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {readOnly ? (
                        <img
                          src={this.props.data?.profile?.photo}
                          width={300}
                          height={300}
                        />
                      ) : (
                        <div>
                          <form
                            addRemoveLinks
                            style={{ border: '0 !important' }}
                            className="dropzone"
                          >
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
                          </form>
                        </div>
                      )}
                    </Col>
                  </Row>
                  {this.state?.file && (
                    <>
                      <Row>
                        <Col className="d-flex justify-content-center mt-3 mb-3">
                          <AvatarEditor
                            ref={this.setEditorRef}
                            image={this?.state?.file}
                            width={150}
                            height={150}
                            border={10}
                            color={[0, 0, 0, 0.6]} // RGBA
                            scale={zoom / 100 + 1}
                            rotate={rotate}
                          />
                        </Col>
                      </Row>
                      <Row className="d-flex justify-content-center mb-3">
                        <Col
                          sm="12"
                          md="6"
                          lg="4"
                          className="d-flex justify-content-center mb-3"
                        >
                          <CustomInput
                            className="mr-5"
                            type="range"
                            id="exampleCustomRange"
                            name="customRange"
                            onChange={e => this.zoomChange(e.target.value)}
                          />
                          <Button onClick={this.rotateChange}>
                            <IntlMessages id="user.rotate" />
                          </Button>
                        </Col>
                      </Row>
                    </>
                  )}

                  <Row className="mt-5 justify-content-end">
                    {!readOnly ? (
                      <div>
                        <LoadingButton
                          outline
                          color="secondary"
                          onClick={this.goBack}
                          loading={!this.props.error && this.props.loading}
                          disabled={!this.props.error && this.props.loading}
                          label={<IntlMessages id="agency.cancel-button" />}
                        />
                        <LoadingButton
                          color="primary"
                          className="ml-2"
                          disabled={!this.props.error && this.props.loading}
                          onClick={handleSubmit}
                          loading={!this.props.error && this.props.loading}
                          label={<IntlMessages id="user.register-button" />}
                        />
                      </div>
                    ) : (
                      <div>
                        <LoadingButton
                          outline
                          color="secondary"
                          onClick={this.goBack}
                          disabled={!this.props.error && this.props.loading}
                          label={<IntlMessages id="user.back-button" />}
                          loading={!this.props.error && this.props.loading}
                        />

                        <LoadingButton
                          color="secondary"
                          className="ml-2"
                          disabled={!this.props.error && this.props.loading}
                          loading={!this.props.error && this.props.loading}
                          onClick={() => this.handleShowModal()}
                          label={<IntlMessages id="user.refuse-button" />}
                        />
                        <LoadingButton
                          className="ml-2"
                          disabled={this.props.loading}
                          onClick={() =>
                            this.handleApproval(
                              this.props.data && this.props.data.id,
                              true
                            )
                          }
                          color="primary"
                          loading={this.props.loading}
                          label={<IntlMessages id="user.accept-button" />}
                        />
                      </div>
                    )}
                  </Row>
                </>
              )}
            />
            <ModalExample
              toggle={this.handleShowModal}
              modal={this.state.showModal}
              approval={this.handleApprovalMessage}
              id={this.props?.data?.id}
              approved={false}
            />
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  data: state.agency.dataId,
  fetchLoading: state.agency.fetchIdLoading,
  success: state.agency.saveSuccess,
  error: state.agency.saveError,
  loading: state.agency.saveLoading,
  approvalSuccess: state.agency.approvalSuccess,
  approvalLoading: state.agency.approvalLoading,
});

const mapActionToProps = {
  saveAgency,
  fetchAgencyId,
  approvalAgency,
};

export default connect(mapStateToProps, mapActionToProps)(AgencyForm);
