import React, { Component } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import {
  resetPassword,
  checkToken,
  checkTokenSuccess,
} from '../../redux/actions';
import { NotificationManager } from '../../components/common/react-notifications';
import LoadingButton from '../../components/LoadingButton';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      newPasswordAgain: '',
      resetPasswordCode: '',
    };
  }

  componentWillUnmount() {
    this.props.checkTokenSuccess(false);
  }

  onResetPassword = values => {
    if (!this.props.loading) {
      const params = new URLSearchParams(this.props.location.search);
      const oobCode = params.get('oobCode');
      if (oobCode) {
        if (values.newPassword !== '') {
          this.props.resetPassword({
            newPassword: values.newPassword,
            resetPasswordCode: oobCode,
            history: this.props.history,
          });
        }
      } else {
        NotificationManager.warning(
          'Please check your email url.',
          'Reset Password Error',
          3000,
          null,
          null,
          ''
        );
      }
    }
  };

  validateNewPassword = values => {
    const { newPassword, newPasswordAgain } = values;
    const errors = {};
    if (newPasswordAgain && newPassword !== newPasswordAgain) {
      errors.newPasswordAgain = 'Please check your new password';
    }
    return errors;
  };

  componentDidUpdate() {
    if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        'Forgot Password Error',
        3000,
        null,
        null,
        ''
      );
    } else if (!this.props.loading && this.props.newPassword === 'success') {
      NotificationManager.success(
        'Please login with your new password.',
        'Reset Password Success',
        3000,
        null,
        null,
        ''
      );
    }
  }

  handleToken(value) {
    if (value.length === 6) {
      this.props.checkToken({
        resetPasswordCode: value,
        forgotUserMail: this.props.forgotUserMail,
        history: this.props.history,
      });
    }
  }

  goBack() {
    this.props.history.push('/');
  }

  render() {
    const {
      newPassword,
      newPasswordAgain,
      resetPasswordCode,
      successToken,
    } = this.state;
    const initialValues = { newPassword, newPasswordAgain, resetPasswordCode };

    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
              <p className="white mb-0">
                Please use your e-mail to reset your password. <br />
                If you are not a member, please{' '}
                <NavLink to="/register" className="white">
                  register
                </NavLink>
                .
              </p>
            </div>
            <div className="form-side">
              <NavLink to="/" className="white">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">
                <IntlMessages id="user.reset-password" />
              </CardTitle>

              <Formik
                validate={this.validateNewPassword}
                initialValues={initialValues}
                onSubmit={this.onResetPassword}
              >
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.new-password-token" />
                      </Label>
                      <Field
                        className="form-control"
                        name="resetPasswordCode"
                        type="password"
                        onBlur={e =>
                          e.target.value
                            ? this.handleToken(e.target.value)
                            : null
                        }
                      />
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.new-password" />
                      </Label>
                      <Field
                        className="form-control"
                        name="newPassword"
                        type="password"
                        disabled={!this.props.inputResetPassword}
                      />
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.new-password-again" />
                      </Label>
                      <Field
                        className="form-control"
                        name="newPasswordAgain"
                        type="password"
                        disabled={!this.props.inputResetPassword}
                      />
                      {errors.newPasswordAgain && touched.newPasswordAgain && (
                        <div className="invalid-feedback d-block">
                          {errors.newPasswordAgain}
                        </div>
                      )}
                    </FormGroup>

                    <div className="d-flex justify-content-between align-items-center">
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${
                          this.props.loading ? 'show-spinner' : ''
                        }`}
                        size="lg"
                        onClick={() => this.goBack()}
                      >
                        <IntlMessages id="user.login-button" />
                      </Button>
                      <LoadingButton
                        color="primary"
                        loading={this.props.loading}
                        size="lg"
                        label={<IntlMessages id="user.reset-password-button" />}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const {
    newPassword,
    resetPasswordCode,
    loading,
    error,
    forgotUserMail,
    inputResetPassword,
  } = authUser;
  return {
    newPassword,
    resetPasswordCode,
    loading,
    error,
    forgotUserMail,
    inputResetPassword,
  };
};

export default connect(mapStateToProps, {
  resetPassword,
  checkToken,
  checkTokenSuccess,
})(ResetPassword);
