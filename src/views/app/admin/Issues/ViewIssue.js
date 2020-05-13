import React, { PureComponent } from 'react';
import { CardBody, Card, Container, Row, Col, Input, Button } from 'reactstrap';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import { parseISO, format } from 'date-fns';
import FormTitle from '../../../../components/forms/FormTitle';
import FormikInput from '../../../../components/forms/FormikInput';
import IntlMessages from '../../../../helpers/IntlMessages';
import Foto from './balloon.jpg';
import { fetchIssueId, readIssue } from '../../../../redux/issues/actions';
import BackButtonText from '../../../../components/BackButtonText';

class ViewIssue extends PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchIssueId(id);
    this.props.readIssue([id], true, true);
  }

  handleTruth = value => {
    switch (value) {
      case 0:
        return 'Não';
      case 1:
        return 'Sim';
    }
  };

  goBack = () => this.props.history.goBack();

  render() {
    return (
      <Card>
        <CardBody>
          <Container>
            {this.props.data ? (
              <Formik
                initialValues={this.props.data}
                enableReinitialize
                onSubmit={this.handleSignup}
                render={({ handleSubmit, values }) => (
                  <>
                    {values?.profile?.type === 'Agent' ? (
                      <>
                        <BackButtonText props={this.props} />
                        <FormTitle
                          title={<IntlMessages id="issues.report-problem" />}
                          className="mb-5"
                        />
                        <Row>
                          <Col sm="12" md="4" lg="4">
                            <Field
                              component={FormikInput}
                              name="name"
                              value={values?.profile?.name}
                              disabled
                              label={<IntlMessages id="issues.report-name" />}
                            />
                          </Col>
                          <Col sm="12" md="4" lg="4">
                            <Field
                              component={FormikInput}
                              name="email"
                              value={values?.profile?.user?.email}
                              disabled
                              label={<IntlMessages id="issues.report-email" />}
                            />
                          </Col>
                          <Col sm="12" md="4" lg="4">
                            <Field
                              component={FormikInput}
                              name="creci"
                              value={values?.profile?.agent?.creci}
                              disabled
                              label={<IntlMessages id="issues.creci" />}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12" md="4" lg="4">
                            <Field
                              component={FormikInput}
                              name="was_presentt"
                              value={this.handleTruth(
                                values?.schedule?.was_present
                              )}
                              disabled
                              label={
                                <IntlMessages id="issues.visitor-appear" />
                              }
                            />
                          </Col>
                          <Col sm="12" md="4" lg="4">
                            <Field
                              component={FormikInput}
                              name="has_entered"
                              value={this.handleTruth(
                                values?.schedule?.has_entered
                              )}
                              disabled
                              label={
                                <IntlMessages id="issues.success-log-in" />
                              }
                            />
                          </Col>
                          <Col sm="12" md="4" lg="4">
                            <Field
                              component={FormikInput}
                              name="type"
                              value={values?.issue}
                              disabled
                              label={
                                <IntlMessages id="issues.report-type-issue" />
                              }
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12" md="12" lg="12">
                            <Field
                              component={FormikInput}
                              disabled
                              name="message"
                              value={values?.message}
                              label={<IntlMessages id="issues.message" />}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-4">
                          <Col sm="12" md="6" lg="3">
                            <h4>
                              <IntlMessages id="issues.in-visit" />
                            </h4>
                            <p>
                              <IntlMessages id="issues.code" />:{' '}
                              {values?.schedule?.ad?.id}
                            </p>
                            <p>
                              {values?.schedule?.ad?.address?.street},
                              {` ${values?.schedule?.ad?.address?.number}`},
                              {` ${values?.schedule?.ad?.address?.district}`},
                              {` ${values?.schedule?.ad?.address?.city}`},
                              {` ${values?.schedule?.ad?.address?.state}`}
                            </p>
                          </Col>
                          <Col sm="12" md="6" lg="3">
                            <img src={Foto} className="w-75 my-3 my-md-0" />
                          </Col>
                          <Col sm="12" md="6" lg="3">
                            <p>
                              <IntlMessages id="issues.report-date" />:{' '}
                              {format(
                                parseISO(values?.visited_in),
                                'dd/MM/yyyy'
                              )}
                            </p>
                            <p>
                              <IntlMessages id="issues.time" />:{' '}
                              {format(parseISO(values?.visited_in), 'HH:mm')}
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12" md="6" lg="3" className="mt-3">
                            <h4>
                              <IntlMessages id="issues.info-advertiser" />
                            </h4>
                            <p>
                              <IntlMessages id="issues.report-name" />:{' '}
                              {values?.schedule?.ad?.profile?.name}
                            </p>
                            <br />
                            <p>
                              <IntlMessages id="issues.report-email" />:{' '}
                              {values?.schedule?.ad?.profile?.user?.email}
                            </p>
                          </Col>
                        </Row>
                        <Row className="mt-5 justify-content-end" />
                      </>
                    ) : (
                      <>
                        <BackButtonText props={this.props} />
                        <FormTitle
                          title={<IntlMessages id="issues.report-problem" />}
                          className="mb-5"
                        />
                        <Row>
                          <Col sm="12" md="4" lg="4">
                            <Field
                              component={FormikInput}
                              name="name"
                              value={values?.profile?.name}
                              disabled
                              label={<IntlMessages id="issues.report-name" />}
                            />
                          </Col>
                          <Col sm="12" md="4" lg="4">
                            <Field
                              component={FormikInput}
                              name="email"
                              value={values?.profile?.user?.email}
                              disabled
                              label={<IntlMessages id="issues.report-email" />}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12" md="4" lg="4">
                            <Field
                              component={FormikInput}
                              name="type"
                              value={values?.issue}
                              disabled
                              label={
                                <IntlMessages id="issues.report-type-issue" />
                              }
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12" md="12" lg="12">
                            <Field
                              component={FormikInput}
                              disabled
                              name="message"
                              value={values?.message}
                              label={<IntlMessages id="issues.message" />}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-4">
                          <Col sm="12" md="6" lg="3">
                            <img src={Foto} className="w-75 my-3 my-md-0" />
                          </Col>
                          <Col sm="12" md="6" lg="3">
                            <h4>
                              <IntlMessages id="issues.in-visit" />
                            </h4>
                            <p>
                              <IntlMessages id="issues.code" />:{' '}
                              {values?.schedule?.ad?.id}
                            </p>
                            <p>
                              {values?.schedule?.ad?.address?.street},
                              {` ${values?.schedule?.ad?.address?.number}`},
                              {` ${values?.schedule?.ad?.address?.district}`},
                              {` ${values?.schedule?.ad?.address?.city}`},
                              {` ${values?.schedule?.ad?.address?.state}`}
                            </p>
                          </Col>
                          <Col sm="12" md="6" lg="3">
                            <p>
                              <IntlMessages id="issues.report-date" />:{' '}
                              {format(
                                parseISO(values?.visited_in),
                                'dd/MM/yyyy'
                              )}
                            </p>
                            <p>
                              <IntlMessages id="issues.time" />:{' '}
                              {format(parseISO(values?.visited_in), 'HH:mm')}
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12" md="6" lg="3" className="mt-3">
                            <h4>
                              <IntlMessages id="issues.info-advertiser" />
                            </h4>
                            <p>
                              <IntlMessages id="issues.report-name" />:{' '}
                              {values?.schedule?.ad?.profile?.name}
                            </p>
                            <br />
                            <p>
                              <IntlMessages id="issues.report-email" />:{' '}
                              {values?.schedule?.ad?.profile?.user?.email}
                            </p>
                          </Col>

                          <Col sm="12" md="6" lg="3" className="mt-3">
                            <h4>
                              <IntlMessages id="issues.info-agent" />
                            </h4>
                            <p>
                              <IntlMessages id="issues.report-name" />:{' '}
                              {values?.schedule?.agent?.profile?.name}
                            </p>
                            <br />
                            <p>
                              <IntlMessages id="issues.report-email" />:{' '}
                              {values?.schedule?.agent?.profile?.user?.email}
                            </p>
                            <br />
                            <p>
                              <IntlMessages id="issues.creci" />:{' '}
                              {values?.schedule?.agent?.creci}
                            </p>
                          </Col>
                        </Row>
                        <Row className="mt-5 justify-content-end" />
                      </>
                    )}
                  </>
                )}
              />
            ) : (
              <BackButtonText props={this.props} />
            )}
          </Container>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  data: state.issues.dataId,
  loading: state.issues.fetchIdLoading,
  error: state.issues.fetchIdError,
});

const mapActionsToProps = {
  fetchIssueId,
  readIssue,
};

export default connect(mapStateToProps, mapActionsToProps)(ViewIssue);
