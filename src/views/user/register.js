import React, { Component } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Form,
  Label,
  Input,
  Button,
  Col,
  CustomInput,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import AvatarEditor from 'react-avatar-editor';
import { saveAgency, closeModal } from '../../redux/agency/actions';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';
import FormikInput from '../../components/forms/FormikInput';
import validateCnpj from '../app/admin/Agency/Users/components/validateCnpj';
import selectState from '../../components/selectState';
import Thumb from '../../components/thumbImage';
import LoadingButton from '../../components/LoadingButton';

const validationSchema = yup.object().shape({
  name: yup.string().required('Campo Obrigatório'),
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
    .min(18, 'CNPJ Incompleto'),
  /* .test(
      'valida-cnpj',
      'CNPJ Inválido',
      cnpj =>
        cnpj && console.log(cnpj) && cnpj.length === 18 && validateCnpj(cnpj)
    ) */
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

const initialValues = {
  name: '',
  fantasy_name: '',
  email: '',
  password: '',
  password_confirmation: '',
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

const getCEP = async (cep, setFieldValue) => {
  const response = await Axios.request({
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

const ModalExample = props => {
  const { show, close, history } = props;

  return (
    <div>
      <Modal isOpen={show}>
        <ModalHeader />
        <ModalBody>
          <p>Cadastro realizado com sucesso. Em breve entraremos em contato!</p>
        </ModalBody>
        <ModalFooter>
          <LoadingButton
            label="OK"
            color="primary"
            onClick={() => (close(), history.goBack())}
          />
        </ModalFooter>
      </Modal>
    </div>
  );
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateSelected: '',
      zoom: 0,
      rotate: 0,
      editor: null,
      showModal: false,
    };
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
      fileConverted,
      true
    );
  };

  onFileChange = event => {
    this.setState({ file: event.target.files[0] });
  };

  goBack = () => {
    this.props.history.goBack();
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

  renderForm = () => {
    const { zoom, rotate } = this.state;
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.onCrop}
        ref={ref => {
          this.formik = ref;
        }}
        render={({
          errors,
          setFieldValue,
          values,
          handleChange,
          handleSubmit,
        }) => (
          <div>
            {console.log(errors)}
            <Row>
              <Col>
                <Field
                  component={FormikInput}
                  name="name"
                  className="form-control"
                  label={<IntlMessages id="user.name" />}
                />
              </Col>
              <Col>
                <Field
                  component={FormikInput}
                  name="fantasy_name"
                  className="form-control"
                  label={<IntlMessages id="user.fantasy_name" />}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Field
                  component={FormikInput}
                  name="cnpj"
                  label={<IntlMessages id="user.cnpj" />}
                  mask="99.999.999/9999-99"
                />
              </Col>
              <Col>
                <Field
                  component={FormikInput}
                  name="creci"
                  label={<IntlMessages id="user.creci" />}
                  mask="999999"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Field
                  component={FormikInput}
                  name="email"
                  label={<IntlMessages id="user.email" />}
                />
              </Col>
              <Col>
                <Field
                  component={FormikInput}
                  label={<IntlMessages id="agency.zipcode" />}
                  onChange={e => {
                    if (e.target.value?.length === 9)
                      getCEP(e.target?.value, setFieldValue);
                    setFieldValue('zip_code', e.target?.value);
                  }}
                  name="zip_code"
                  mask="99999-999"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Field
                  component={FormikInput}
                  name="street"
                  label={<IntlMessages id="user.street" />}
                />
              </Col>
              <Col>
                <Field
                  component={FormikInput}
                  name="number"
                  label={<IntlMessages id="user.number" />}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Field
                  component={FormikInput}
                  name="complement"
                  label={<IntlMessages id="user.complement" />}
                />
              </Col>
              <Col>
                <Field
                  component={FormikInput}
                  name="district"
                  label={<IntlMessages id="user.district" />}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Field
                  component={FormikInput}
                  name="city"
                  label={<IntlMessages id="user.city" />}
                />
              </Col>
              <Col>
                <Field
                  component={selectState}
                  value={this.props.stateSelected}
                  onChange={selectedOption =>
                    handleChange('state')(selectedOption)
                  }
                  label={<IntlMessages id="user.state" />}
                  name="state"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Field
                  component={FormikInput}
                  label={<IntlMessages id="user.phone" />}
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
                <Field
                  component={FormikInput}
                  name="password"
                  type="password"
                  label={<IntlMessages id="user.password" />}
                />
              </Col>
              <Col>
                <Field
                  component={FormikInput}
                  name="password_confirmation"
                  type="password"
                  label={<IntlMessages id="user.confirm_password" />}
                />
              </Col>
            </Row>

            <Row>
              <Col>
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
                    <div className="text-reset mt-2">
                      <IntlMessages id="user.dropzone" />
                    </div>
                  </form>
                  {/* <Thumb file={this?.state?.file} /> */}
                </div>
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
                <Row>
                  <Col className="d-flex justify-content-center mb-3">
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
            <Row>
              <Col className="d-flex justify-content-end mt-3 mb-3">
                <div className="mr-3 ">
                  <LoadingButton
                    outline
                    color="secondary"
                    onClick={this.goBack}
                    loading={!this.props.error && this.props.loading}
                    disabled={!this.props.error && this.props.loading}
                    label={<IntlMessages id="user.back-button" />}
                  />
                </div>

                <LoadingButton
                  color="primary"
                  onClick={handleSubmit}
                  loading={!this.props.error && this.props.loading}
                  disabled={!this.props.error && this.props.loading}
                  label={<IntlMessages id="user.register-button" />}
                />
              </Col>
            </Row>
          </div>
        )}
      />
    );
  };

  render() {
    console.log(this.props.showModal);
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
              <p className="white mb-0">
                Please use this form to register. <br />
                If you are a member, please{' '}
                <NavLink to="/user/login" className="white">
                  login
                </NavLink>
                .
              </p>
            </div>
            <div className="form-side max-vh-85">
              <NavLink to="/" className="white">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">
                <IntlMessages id="user.register" />
              </CardTitle>
              {this.renderForm()}
              <ModalExample
                show={this.props.showModal}
                close={this.props.closeModal}
                history={this.props.history}
              />
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
const mapStateToProps = ({ authUser, agency }) => {
  const { user, loading } = authUser;
  const { saveLoading, showModal } = agency;
  return { user, loading: saveLoading, showModal };
};

export default connect(mapStateToProps, {
  saveAgency,
  closeModal,
})(Register);
