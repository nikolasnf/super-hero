import React, { PureComponent } from 'react';
import { CardBody, Card, Container, Row, Col, Button, Label } from 'reactstrap';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import * as yup from 'yup';
import FormTitle from '../../../../../components/forms/FormTitle';
import FormInfo from '../../../../../components/forms/FormInfo';
import FormikInput from '../../../../../components/forms/FormikInput';
import IntlMessages from '../../../../../helpers/IntlMessages';
import {
  fetchAgencySubscriptionId,
  editAgencySubscription,
} from '../../../../../redux/subscription/actions';
import LoadingButton from '../../../../../components/LoadingButton';
import BackButtonText from '../../../../../components/BackButtonText';

const validationSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  description: yup.string().required('Campo obrigatório'),
  price: yup.string().required('Campo obrigatório'),
  // price2: yup.string().required("Campo obrigatório"),
});

class EditSubscription extends PureComponent {
  handleSignup = values => {
    console.log('enviou');
    const {
      data: { id },
    } = this.props;

    this.props.editAgencySubscription(
      {
        ...values,
        id,
      },
      this.props.history
    );
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAgencySubscriptionId(id);
  }

  goBack = () => this.props.history.goBack();

  render() {
    const { data } = this.props;

    const initialValues = {
      name: data?.name,
      description: data?.description,
      price: data?.price,
    };

    if (this.props.loading) {
      return <div className="loading" />;
    }

    function subscriptionType(subType) {
      switch (subType) {
        case 'daily':
          return 'Diaria';

        case 'monthly':
          return 'Mensal';

        case 'annually':
          return 'Anual';
      }
    }

    return (
      <Card>
        <CardBody>
          <Container>
            <Formik
              initialValues={initialValues}
              onSubmit={this.handleSignup}
              enableReinitialize
              validationSchema={validationSchema}
              render={({ handleSubmit }) => (
                <>
                  <BackButtonText props={this.props} />
                  <FormTitle
                    title={<IntlMessages id="subs.edit" />}
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
                        component={FormikInput}
                        name="type2"
                        value={subscriptionType(data?.type)}
                        disabled
                        label={<IntlMessages id="subs.type" />}
                      />
                    </Col>

                    <Col sm="12" md="6" lg="5">
                      <Field
                        component={FormikInput}
                        prependAddon="R$"
                        name="price"
                        label={<IntlMessages id="subs.price" />}
                      />
                    </Col>
                  </Row>

                  {/* NEED API AJUST */}
                  <Row>
                    <Col sm="12" md="6" lg="5">
                      <Field
                        component={FormikInput}
                        name="type2"
                        // value={subscriptionType(data?.type2)}
                        disabled
                        label={<IntlMessages id="subs.type" />}
                      />
                    </Col>

                    <Col sm="12" md="6" lg="5">
                      <Field
                        component={FormikInput}
                        prependAddon="R$"
                        name="price2"
                        label={<IntlMessages id="subs.price" />}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="12" md="6" lg="5">
                      <FormInfo
                        label={<IntlMessages id="subs.agents_linked" />}
                        value={data?.agents_linked}
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
                        loading={this.props.saveLoading}
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
  data: state.subscription.dataId,
  saveLoading: state.subscription.saveLoading,
  error: state.subscription.fetchIdError,
});

const mapActionsToProps = {
  fetchAgencySubscriptionId,
  editAgencySubscription,
};

export default connect(mapStateToProps, mapActionsToProps)(EditSubscription);
