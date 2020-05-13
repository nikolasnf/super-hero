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
  CustomInput,
} from 'reactstrap';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor';
import FormikInput from '../../../../../components/forms/FormikInput';
import { NotificationManager } from '../../../../../components/common/react-notifications';
import FormTitle from '../../../../../components/forms/FormTitle';
import {
  saveAgent,
  fetchAgentId,
  approvalAgent,
} from '../../../../../redux/agent/actions';
import IntlMessages from '../../../../../helpers/IntlMessages';
import selectState from '../../../../../components/selectState';
import LoadingButton from '../../../../../components/LoadingButton';
import BackButtonText from '../../../../../components/BackButtonText';
import Thumb from '../../../../../components/thumbImage';
import ModalExample from '../../../../../components/Modal';

const initialValues = {
  email: '',
  password: '',
  password_confirmation: '',

  name: '',
  creci: '',
  city: '',
  state: '',
  phone: '',
};

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

  creci: yup.string().required('Campo Obrigatório'),
  city: yup.string().required('Campo Obrigatório'),
  state: yup.string().required('Campo Obrigatório'),
  phone: yup
    .string()
    .required('Campo Obrigatório')
    .min(14, 'Telefone Incompleto'),
});

class AgentForm extends PureComponent {
  state = {
    evaluated: false,
    stateSelected: '',
    profileFile: null,
    creciFile: null,
    showModal: false,
    zoomProfile: 0,
    rotateProfile: 0,
    profileEditor: null,
    zoomCreci: 0,
    rotateCreci: 0,
    creciEditor: null,
  };

  componentDidMount() {
    if (this.props.readOnly) {
      const { id } = this.props.match.params;
      this.props.fetchAgentId(id);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.error && nextProps.error) {
      console.log(nextProps.error);
      NotificationManager.error(nextProps.error, 'Erro', 3000, null, null, '');
      return false;
    }

    if (this.props.match.params !== nextProps.match.params) {
      this.props.fetchAgentId(nextProps.match.params.id);
      return false;
    }
    return true;
  }

  handleSignup = (values, profileFile, creciFile) => {
    const { city, state } = values;
    const { history } = this.props;

    this.props.saveAgent(
      {
        ...values,
        address: {
          city,
          state,
          // status: true
        },
        // status: true,
        type: 'Agent',
        history,
      },
      profileFile,
      creciFile
    );
  };

  onProfileChange = event => {
    this.setState({ profileFile: event.target.files[0] });
  };

  onCreciChange = event => {
    this.setState({ creciFile: event.target.files[0] });
  };

  handleState(option) {
    this.setState({ stateSelected: option.value });
  }

  goBack = () => this.props.history.goBack();

  handleApproval = (id, approved) => {
    this.props.approvalAgent({
      id,
      approved,
    });
    this.setState({ evaluated: true });
  };

  zoomProfileChange = e => {
    this.setState({ zoomProfile: e });
  };

  rotateProfileChange = () => {
    const { rotateProfile } = this.state;
    this.setState({ rotateProfile: rotateProfile + 90 });
  };

  setEditorProfileRef = profileEditor => this.setState({ profileEditor });

  zoomCreciChange = e => {
    this.setState({ zoomCreci: e });
  };

  rotateCreciChange = () => {
    const { rotateCreci } = this.state;
    this.setState({ rotateCreci: rotateCreci + 90 });
  };

  setEditorCreciRef = creciEditor => this.setState({ creciEditor });

  onCrop = values => {
    const { profileEditor, creciEditor } = this.state;

    if (profileEditor !== null) {
      const url = profileEditor.getImageScaledToCanvas().toDataURL();
      fetch(url)
        .then(res => res.blob())
        .then(blob => {
          const fd = new FormData();
          fd.append('image', blob, 'filename');
          const profileFile = new File([blob], 'profilePitcture', {
            type: blob.type,
          });
          if (creciEditor !== null) {
            const urlCreci = creciEditor.getImageScaledToCanvas().toDataURL();
            fetch(urlCreci)
              .then(resCreci => resCreci.blob())
              .then(blobCreci => {
                const fdCreci = new FormData();
                fdCreci.append('image', blobCreci, 'filename');
                const creciFile = new File([blobCreci], 'creciPitcture', {
                  type: blobCreci.type,
                });
                this.handleSignup(values, profileFile, creciFile);
              });
          }
        });
    }
  };

  handleApprovalMessage = (id, approved, reproved_message, allow_resend) => {
    this.props.approvalAgent({
      id,
      approved,
      reproved_message,
      allow_resend,
    });
    this.setState({ evaluated: true });
  };

  handleShowModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  render() {
    const { readOnly, stateSelected } = this.props;

    if (this.props.approvalSuccess && this.state.evaluated) {
      return <Redirect to="/app/admin/agent/list" />;
    }

    if (this.props.loading || this.props.fetchLoading) {
      return <div className="loading" />;
    }
    const { zoomProfile, rotateProfile, zoomCreci, rotateCreci } = this.state;
    return (
      <Card>
        <CardBody>
          <Container>
            <Formik
              initialValues={readOnly ? this.props.data : initialValues}
              enableReinitialize
              onSubmit={this.onCrop}
              validationSchema={validationSchema}
              render={({ handleSubmit, handleChange }) => (
                <>
                  <BackButtonText props={this.props} />
                  <FormTitle
                    title={<IntlMessages id="agents.registry-agent" />}
                    className="mb-2"
                  />
                  <Row className="align-items-center">
                    <Col sm="3" md="4" lg="4">
                      <Field
                        disabled={readOnly}
                        component={FormikInput}
                        type="select"
                        label={<IntlMessages id="agency.status" />}
                      >
                        <option>Ativo</option>
                        <option>Inativo</option>
                      </Field>
                    </Col>
                  </Row>

                  {!readOnly && (
                    <>
                      <FormTitle
                        title={<IntlMessages id="agency.credentials" />}
                        className="mb-2"
                      />
                      <Row>
                        <Col sm="12" md="4" lg="4">
                          <Field
                            disabled={readOnly}
                            component={FormikInput}
                            name="email"
                            label={<IntlMessages id="agency.email" />}
                          />
                        </Col>
                        <Col sm="6" md="4" lg="4">
                          <Field
                            disabled={readOnly}
                            component={FormikInput}
                            name="password"
                            label={<IntlMessages id="agency.password" />}
                            type="password"
                          />
                        </Col>
                        <Col sm="6" md="4" lg="4">
                          <Field
                            disabled={readOnly}
                            component={FormikInput}
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
                    className="mb-2"
                  />
                  <Row>
                    <Col sm="12" md="6" lg="5">
                      <Field
                        disabled={readOnly}
                        component={FormikInput}
                        name="name"
                        label={<IntlMessages id="agency.name" />}
                      />
                    </Col>
                    <Col sm="6" md="3" lg="4">
                      <Field
                        disabled={readOnly}
                        component={FormikInput}
                        name="creci"
                        label={<IntlMessages id="agency.creci" />}
                        mask="999999"
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="12" md="4" lg="4">
                      <Field
                        disabled={readOnly}
                        component={FormikInput}
                        name="city"
                        label={<IntlMessages id="agency.city" />}
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
                    </Col>

                    <Col sm="6" md="3" lg="3">
                      <Field
                        disabled={readOnly}
                        component={FormikInput}
                        name="phone"
                        mask="(99) 99999-9999"
                        label={<IntlMessages id="agency.cellPhone" />}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col className="d-flex flex-row">
                      <div className=" d-flex flex-column mr-3">
                        {readOnly ? (
                          <img
                            src={this.props.data?.profile?.agent?.photo_creci}
                            width={300}
                            height={300}
                          />
                        ) : (
                          <div>
                            <form className="dropzone">
                              <div className="fallback">
                                <Input
                                  disabled={readOnly}
                                  type="file"
                                  onChange={e => {
                                    this.onCreciChange(e);
                                  }}
                                  className="mb-1 form-control"
                                />
                              </div>
                            </form>
                          </div>
                        )}
                        <IntlMessages id="agents.photo-creci" />
                      </div>

                      <div className=" d-flex flex-column">
                        {readOnly ? (
                          <img
                            src={this.props.data?.profile?.photo}
                            width={300}
                            height={300}
                          />
                        ) : (
                          <div>
                            <form className="dropzone">
                              <div className="fallback">
                                <Input
                                  disabled={readOnly}
                                  type="file"
                                  onChange={e => {
                                    this.onProfileChange(e);
                                  }}
                                  className="mb-1 form-control"
                                />
                              </div>
                            </form>
                          </div>
                        )}
                        <IntlMessages id="agents.photo-agent" />
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    {this.state?.creciFile && (
                      <Col sm="12" md="6" lg="4">
                        <Row>
                          <Col className="d-flex justify-content-center  mb-3">
                            <AvatarEditor
                              ref={this.setEditorCreciRef}
                              image={this?.state?.creciFile}
                              width={200}
                              height={150}
                              border={10}
                              color={[0, 0, 0, 0.6]} // RGBA
                              scale={zoomCreci / 100 + 1}
                              rotate={rotateCreci}
                            />
                          </Col>
                        </Row>
                        <Row className="d-flex justify-content-center mb-3">
                          <Col className="d-flex justify-content-center mb-3">
                            <CustomInput
                              className="mr-5"
                              type="range"
                              id="exampleCustomRange"
                              name="customRange"
                              onChange={e =>
                                this.zoomCreciChange(e.target.value)
                              }
                            />
                            <Button onClick={this.rotateCreciChange}>
                              <IntlMessages id="user.rotate" />
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    )}

                    {this.state?.profileFile && (
                      <Col sm="12" md="6" lg="4">
                        <Row>
                          <Col className="d-flex justify-content-center mb-3">
                            <AvatarEditor
                              ref={this.setEditorProfileRef}
                              image={this?.state?.profileFile}
                              width={200}
                              height={150}
                              border={10}
                              color={[0, 0, 0, 0.6]} // RGBA
                              scale={zoomProfile / 100 + 1}
                              rotate={rotateProfile}
                            />
                          </Col>
                        </Row>
                        <Row className="d-flex justify-content-center mb-3 flex-wrap">
                          <Col className="d-flex justify-content-center mb-3">
                            <CustomInput
                              className="mr-5"
                              type="range"
                              id="exampleCustomRange"
                              name="customRange"
                              onChange={e =>
                                this.zoomProfileChange(e.target.value)
                              }
                            />
                            <Button onClick={this.rotateProfileChange}>
                              <IntlMessages id="user.rotate" />
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    )}
                  </Row>
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
                              this.props.data && this.props?.data?.id,
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
  data: state.agent.dataId,
  fetchLoading: state.agent.fetchIdLoading,
  success: state.agent.saveSuccess,
  error: state.agent.saveError,
  loading: state.agent.saveLoading,
  approvalSuccess: state.agent.approvalSuccess,
  approvalLoading: state.agent.approvalLoading,
});

const mapActionToProps = {
  saveAgent,
  fetchAgentId,
  approvalAgent,
};

export default connect(mapStateToProps, mapActionToProps)(AgentForm);
