import React, { PureComponent, useState } from 'react';
import {
  CardBody,
  Card,
  Container,
  Row,
  Col,
  Input,
  Button,
  UncontrolledCarousel,
} from 'reactstrap';
import ImageGallery from 'react-image-gallery';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import * as yup from 'yup';

import Dropzone from '../../../../../components/dropZone';
import FormTitle from '../../../../../components/forms/FormTitle';
import FormikInput from '../../../../../components/forms/FormikInput';
import {
  fetchConstants,
  saveAd,
  fetchAdId,
  fetchCep,
  disableAd,
  enableAd,
  soldAd,
  editAd,
  fetchAdRequest,
  acceptAdRequest,
  removeAdRequest,
} from '../../../../../redux/ad/actions';
import { NotificationManager } from '../../../../../components/common/react-notifications';
import IntlMessages from '../../../../../helpers/IntlMessages';
import selectState from '../../../../../components/selectState';
import selectInput from '../../../../../components/selectInput';
import ModalConfirmation from '../../../../../components/ModalConfirmation';
import RequestList from './components/RequestList';

import LoadingButton from '../../../../../components/LoadingButton';
import BackButtonText from '../../../../../components/BackButtonText';

import Thumb from '../../../../../components/thumbImage';
import Loading from '../../../../../components/Loading';
import Plans from '../../../../../components/plans';
import './styles.scss';

const validationSchema = yup.object().shape({
  type: yup.string().required('Campo Obrigatório'),
  penthouse: yup.string().required('Campo Obrigatório'),
  entrance: yup.string().required('Campo Obrigatório'),
  address: yup.object().shape({
    zip_code: yup
      .string()
      .required('Campo Obrigatório')
      .min(9, 'CEP Incompleto'),
    street: yup.string().required('Campo Obrigatório'),
    number: yup.string().required('Campo Obrigatório'),
    floor: yup.string().required('Campo Obrigatório'),
    district: yup.string().required('Campo Obrigatório'),
    city: yup.string().required('Campo Obrigatório'),
    complement: yup.string(),
    state: yup.string().required('Campo Obrigatório'),
  }),
  area: yup.string().required('Campo Obrigatório'),
  dorms: yup.string().required('Campo Obrigatório'),
  suites: yup.string().required('Campo Obrigatório'),
  bathrooms: yup.string().required('Campo Obrigatório'),
  parking_spots: yup.string().required('Campo Obrigatório'),
  furnished: yup.string().required('Campo Obrigatório'),
  key_type: yup.string().required('Campo Obrigatório'),
  animals_allowed: yup.string().required('Campo Obrigatório'),
  who_occupied: yup.string().required('Campo Obrigatório'),
  announcer_is: yup.string().required('Campo Obrigatório'),
  price: yup.string().required('Campo Obrigatório'),
  service_fee: yup.string().required('Campo Obrigatório'),
  iptu: yup.string().required('Campo Obrigatório'),
  images: yup
    .array()
    .test(
      'have-photo',
      'Envie pelo menos uma foto',
      v => typeof v === 'object' && v?.length > 0
    ),
});

class AdForm extends React.Component {
  state = {
    editMode: false,
    photos: [],
    showSoldModal: false,
    showNotSoldModal: false,
    showEnableModal: false,
    showDisableModal: false,
    showEditModal: false,
  };

  componentDidUpdate() {
    const { cepLoading, cep } = this.props;
    if (!cepLoading && cep.cep && this.formik) {
      this.formik.setFieldValue('address.zip_code', cep.cep);
      this.formik.setFieldValue('address.city', cep.localidade);
      this.formik.setFieldValue('address.state', cep.uf);
      this.formik.setFieldValue('address.street', cep.logradouro);
      this.formik.setFieldValue('address.district', cep.bairro);
      this.formik.setFieldValue('address.complement', cep.complemento);
    }
  }

  initialValues = {
    ad_type: '',
    type: '',
    penthouse: '',
    entrance: '',
    area: '',
    dorms: '',
    suites: '',
    bathrooms: '',
    parking_spots: '',
    furnished: '',
    key_type: '',
    animals_allowed: '',
    who_occupied: '',
    announcer_is: '',
    price: '',
    service_fee: '',
    iptu: '',
    features: [],
    building_features: [],
    images: this.state.photos,
    address: {
      zip_code: '',
      street: '',
      number: '',
      district: '',
      floor: '',
      city: '',
      complement: '',
    },
  };

  handleSignup = values => {
    values.price = parseFloat(values.price.replace(/[.]/g, ''));
    values.service_fee = parseFloat(values.service_fee.replace(/[.]/g, ''));
    values.iptu = parseFloat(values.iptu.replace(/[.]/g, ''));
    this.props.saveAd(values);
  };

  componentDidMount() {
    const {
      fetchConstants,
      fetchAdId,
      match: { params },
    } = this.props;
    window.addEventListener('resize', this.resizeListener);
    fetchConstants();
    if (params.id) {
      fetchAdId({ id: params.id });
    }
    this.props.fetchAdRequest({ ad_id: params.id });
  }

  renderFeature() {
    const { editMode } = this.state;
    const { features, readOnly, data } = this.props;
    const values = readOnly && !editMode ? data : this.formik?.state?.values;
    return Object.keys(features).map(e => {
      const find = values?.features?.indexOf(e) >= 0;

      if (!find && readOnly && !editMode) {
        return null;
      }

      return (
        <Button
          style={{ width: 220, marginTop: 5 }}
          color={find ? 'primary' : 'secundary'}
          onClick={() => {
            if (readOnly && !editMode) {
              return;
            }
            const selected = values.features;
            if (!find) {
              this.formik.setFieldValue('features', [...selected, e]);
            } else {
              this.formik.setFieldValue('features', [
                ...selected.filter(f => f !== e),
              ]);
            }
          }}
        >
          {features[e]}
        </Button>
      );
    });
  }

  renderBuildingFeature() {
    const { editMode } = this.state;
    const { building_features, readOnly, data } = this.props;
    const values = readOnly && !editMode ? data : this.formik?.state?.values;

    return Object.keys(building_features).map(e => {
      const find = values?.building_features?.indexOf(e) >= 0;

      if (!find && readOnly && !editMode) {
        return null;
      }

      return (
        <Button
          style={{ width: 220, marginTop: 5 }}
          color={find ? 'primary' : 'secundary'}
          onClick={() => {
            if (readOnly && !editMode) {
              return;
            }
            const selected = values.building_features;
            if (!find) {
              this.formik.setFieldValue('building_features', [...selected, e]);
            } else {
              this.formik.setFieldValue('building_features', [
                ...selected.filter(f => f !== e),
              ]);
            }
          }}
        >
          {building_features[e]}
        </Button>
      );
    });
  }

  goBack = () => this.props.history.goBack();

  renderCarousel() {
    const { data } = this.props;

    if (data && data.images) {
      const items = data.images.map(e => ({
        original: e.path,
        thumbnail: e.path,
      }));

      return <ImageGallery items={items} />;
    }
    return null;
  }

  renderDropzone() {
    if (!this.formik || !this.formik.state) {
      return null;
    }

    const { values, errors } = this.formik?.state;
    const { readOnly } = this.props;
    const { editMode } = this.state;

    if (!values || !values.images) {
      return null;
    }
    const { images } = values;

    return (
      <div>
        {readOnly && editMode && (
          <div className="row">
            {images &&
              images.map(
                image =>
                  typeof image === 'object' && (
                    <div
                      className="col-3 mb-2 position-relative"
                      key={image.id}
                    >
                      <img
                        className="img-fluid border-radius"
                        src={image.path}
                        alt="thumbnail"
                      />

                      <Button
                        type="submit"
                        color="primary"
                        onClick={() => {
                          if (images.length > 1) {
                            this.formik.setFieldValue(
                              'images',
                              images.filter(e => e.name !== image.name)
                            );
                          }
                        }}
                        className="position-absolute badge-top-left badge badge-primary badge-pill btn-multiple-state"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>

                        <span className="label">
                          <i
                            className="simple-icon-close"
                            style={{ fontSize: '20px' }}
                          />
                        </span>
                      </Button>
                    </div>
                  )
              )}
          </div>
        )}
        <div className="row d-flex justify-content-center">
          <Dropzone
            handleFiles={photos => {
              this.formik.setFieldValue('images', [
                ...images,
                ...photos.map(e => e.file),
              ]);
            }}
            error={errors.photos}
          />
        </div>
      </div>
    );
  }

  isLoading() {
    const {
      cepLoading,
      saveLoading,
      fetchLoading,
      fetchIdLoading,
    } = this.props;
    return cepLoading || saveLoading || fetchLoading || fetchIdLoading;
  }

  saveEdit() {
    const { editMode } = this.state;
    const {
      match: { params },
      editAd,
      data,
    } = this.props;

    if (editMode) {
      const { profile, images, ...rest } = this.formik.state.values;
      const newObj = {};
      Object.keys(rest).forEach(e => {
        if (rest[e] !== data[e]) {
          newObj[e] = rest[e];
        }
      });
      editAd({
        id: params.id,
        images: images.map(e => {
          if (e.name) {
            return e.name;
          }
          return e;
        }),
        ...newObj,
      });
    }
    this.setState({ editMode: !editMode });
  }

  renderSoldBtn() {
    const { data } = this.props;

    if (data?.sold) {
      return (
        <LoadingButton
          color="primary"
          className="ml-2"
          disabled={!this.props.error && this.isLoading()}
          onClick={() => this.handleShowNotSoldModal()}
          loading={!this.props.error && this.isLoading()}
          label={<IntlMessages id="ad.not-selled" />}
        />
      );
    }
    return (
      <LoadingButton
        color="primary"
        className="ml-2"
        disabled={!this.props.error && this.isLoading()}
        onClick={() => this.handleShowSoldModal()}
        loading={!this.props.error && this.isLoading()}
        label={<IntlMessages id="ad.selled" />}
      />
    );
  }

  renderActiveBtn() {
    const { data } = this.props;
    if (data?.sold) {
      return null;
    }
    if (data?.status === 'active') {
      return (
        <LoadingButton
          color="primary"
          className="ml-2"
          disabled={!this.props.error && this.isLoading()}
          onClick={() => {
            this.handleShowDisableModal();
          }}
          loading={!this.props.error && this.isLoading()}
          label={<IntlMessages id="ad.deactivate" />}
        />
      );
    }
    if (data?.status === 'inactive') {
      return (
        <LoadingButton
          color="primary"
          className="ml-2"
          disabled={!this.props.error && this.isLoading()}
          onClick={() => {
            this.handleShowEnableModal();
          }}
          loading={!this.props.error && this.isLoading()}
          label={<IntlMessages id="ad.activate" />}
        />
      );
    }
    return (
      <LoadingButton
        color="primary"
        className="ml-2"
        disabled
        loading={false}
        label={<IntlMessages id="ad.activate" />}
      />
    );
  }

  renderModal = () => {
    const {
      match: { params },
      soldAd,
    } = this.props;
    const { editMode } = this.state;
    return (
      <>
        <ModalConfirmation
          showModal={this.state.showEditModal}
          handleShowModal={this.handleEditModal}
          title={
            editMode ? 'Deseja salvar o anúncio?' : 'Deseja editar o anúncio?'
          }
          onClick={() => {
            this.saveEdit();
            this.handleEditModal(); // para fechar o modal apos confirmar
          }}
        />
        <ModalConfirmation
          showModal={this.state.showNotSoldModal}
          handleShowModal={this.handleShowNotSoldModal}
          title="Deseja marcar como não vendido?"
          onClick={() => {
            soldAd({ id: params.id, is_sold: false });
            this.handleShowNotSoldModal(); // para fechar o modal apos confirmar
          }}
        />
        <ModalConfirmation
          showModal={this.state.showSoldModal}
          handleShowModal={this.handleShowSoldModal}
          title="Deseja marcar como vendido?"
          onClick={() => {
            soldAd({ id: params.id, is_sold: true });
            this.handleShowSoldModal(); // para fechar o modal apos confirmar
          }}
        />
        <ModalConfirmation
          showModal={this.state.showDisableModal}
          handleShowModal={this.handleShowDisableModal}
          title="Deseja desativar o anuncio?"
          onClick={() => {
            const {
              disableAd,
              match: { params },
            } = this.props;
            disableAd({
              id: params.id,
              changeStatus: true,
            });
            this.handleShowDisableModal(); // para fechar o modal apos confirmar
          }}
        />
        <ModalConfirmation
          showModal={this.state.showEnableModal}
          handleShowModal={this.handleShowEnableModal}
          title="Deseja reativar o anuncio?"
          onClick={() => {
            const {
              enableAd,
              match: { params },
            } = this.props;
            enableAd({
              id: params.id,
              changeStatus: true,
            });
            this.handleShowEnableModal(); // para fechar o modal apos confirmar
          }}
        />
      </>
    );
  };

  handleShowSoldModal = () => {
    const sold = this.state.showSoldModal;
    this.setState({ showSoldModal: !sold });
  };

  handleShowNotSoldModal = () => {
    const not_sold = this.state.showNotSoldModal;
    this.setState({ showNotSoldModal: !not_sold });
  };

  handleEditModal = () => {
    const { showEditModal } = this.state;
    this.setState({ showEditModal: !showEditModal });
  };

  handleShowDisableModal = () => {
    const disable = this.state.showDisableModal;
    this.setState({ showDisableModal: !disable });
  };

  handleShowEnableModal = () => {
    const enable = this.state.showEnableModal;
    this.setState({ showEnableModal: !enable });
  };

  render() {
    const {
      readOnly,
      typeSelected,
      cepLoading,
      fetchCep,
      cep,
      data,
    } = this.props;
    const { editMode } = this.state;

    const typeOptions = [
      { value: 'AD_TYPE_APARTMENT', label: 'Apartamento' },
      { value: 'AD_TYPE_KITNET_STUDIO', label: 'Kitnet/Studio' },
      { value: 'AD_TYPE_TOWNHOUSE', label: 'Casa de condomínio' },
      { value: 'AD_TYPE_HOUSE', label: 'Casa' },
    ];
    const penthouse = [
      { value: 1, label: 'Sim' },
      { value: 0, label: 'Não' },
    ];
    const is_new = [
      { value: 1, label: 'Sim' },
      { value: 0, label: 'Não' },
    ];
    const entrance = [
      { value: 'AD_ENTRANCE_24', label: '24 horas' },
      { value: 'AD_ENTRANCE_MORNING', label: 'Diurno' },
      { value: 'AD_ENTRANCE_NIGHT', label: 'Noturno' },
      { value: 'AD_ENTRANCE_NOT', label: 'Não tem' },
    ];
    const ad_type = [
      { value: 'sale', label: 'Venda' },
      { value: 'rent', label: 'Aluguel' },
    ];
    const furnished = [
      { value: 1, label: 'Sim' },
      { value: 0, label: 'Não' },
    ];
    const key_type = [
      { value: 'AD_KEY_BIOMETRIC', label: 'Biometria' },
      { value: 'AD_KEY_DEFAULT', label: 'Chave' },
      { value: 'AD_KEY_PASSWORD', label: 'Senha' },
    ];
    const animals_allowed = [
      { value: 1, label: 'Sim' },
      { value: 0, label: 'Não' },
    ];
    const who_occupied = [
      { value: 'AD_OCCUPIED_OWNER', label: 'Dono' },
      { value: 'AD_OCCUPIED_TENANT', label: 'Inquilino' },
      { value: 'AD_OCCUPIED_EMPTY', label: 'Vazio' },
    ];
    const announcer_is = [
      { value: 'AD_ANNOUNCER_OWNER', label: 'Proprietário' },
      { value: 'AD_ANNOUNCER_ANOTHER', label: 'Terceiro' },
    ];

    const {
      match: { params },
    } = this.props;

    return (
      <Loading loading={this.isLoading()}>
        <Card>
          <CardBody>
            <Container>
              <Formik
                ref={ref => {
                  this.formik = ref;
                }}
                enableReinitialize
                initialValues={readOnly ? this.props.data : this.initialValues}
                onSubmit={this.handleSignup}
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
                        title={<IntlMessages id="ad.informations" />}
                        className="mb-5"
                      />
                      <FormTitle
                        title={<IntlMessages id="agency.datas" />}
                        className="mt-4 mb-2"
                      />
                    </div>
                    <Row>
                      <Col sm="6" md="3" lg="2">
                        <Field
                          component={selectInput}
                          disabled={readOnly || editMode}
                          value={values.type}
                          name="type"
                          onChange={selectedOption =>
                            handleChange('type')(selectedOption)
                          }
                          label={<IntlMessages id="ad.type" />}
                          options={typeOptions}
                        />
                      </Col>
                      <Col sm="6" md="3" lg="2">
                        <Field
                          component={selectInput}
                          disabled={readOnly && !editMode}
                          name="penthouse"
                          value={values.penthouse}
                          onChange={selectedOption =>
                            handleChange('penthouse')(selectedOption)
                          }
                          label={<IntlMessages id="ad.roof" />}
                          options={penthouse}
                        />
                      </Col>
                      <Col sm="6" md="3" lg="2">
                        <Field
                          component={selectInput}
                          disabled={readOnly && !editMode}
                          name="is_new"
                          value={values.is_new}
                          onChange={selectedOption =>
                            handleChange('is_new')(selectedOption)
                          }
                          label={<IntlMessages id="ad.is_new" />}
                          options={is_new}
                        />
                      </Col>
                      <Col sm="6" md="3" lg="2">
                        <Field
                          component={selectInput}
                          disabled={readOnly && !editMode}
                          name="entrance"
                          value={values.entrance}
                          onChange={selectedOption =>
                            handleChange('entrance')(selectedOption)
                          }
                          label={<IntlMessages id="ad.entrance" />}
                          options={entrance}
                        />
                      </Col>
                      <Col sm="6" md="3" lg="2">
                        <Field
                          component={selectInput}
                          disabled={readOnly && !editMode}
                          name="ad_type"
                          value={values.ad_type}
                          onChange={selectedOption =>
                            handleChange('ad_type')(selectedOption)
                          }
                          label={<IntlMessages id="ad.ad_type" />}
                          options={ad_type}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6" md="2" lg="2">
                        <Field
                          component={FormikInput}
                          label={<IntlMessages id="agency.zipcode" />}
                          value={values?.address?.zip_code}
                          onChange={e => {
                            const { value } = e.target;
                            setFieldValue('address.zip_code', value);
                            if (
                              value.replace(/[-_]/g, '').length === 8 &&
                              !cepLoading &&
                              cep.cep !== value
                            ) {
                              fetchCep({ cep: value });
                            }
                          }}
                          disabled={readOnly || editMode}
                          name="address.zip_code"
                          mask="99999-999"
                        />
                      </Col>
                      <Col sm="12" md="5" lg="5">
                        <Field
                          component={FormikInput}
                          label={<IntlMessages id="agency.street" />}
                          disabled={readOnly || editMode}
                          value={values?.address?.street}
                          name="address.street"
                        />
                      </Col>
                      <Col sm="6" md="2" lg="2">
                        <Field
                          component={FormikInput}
                          label={<IntlMessages id="agency.number" />}
                          disabled={readOnly || editMode}
                          value={values?.address?.number}
                          name="address.number"
                        />
                      </Col>
                      <Col sm="6" md="3" lg="3">
                        <Field
                          component={FormikInput}
                          label={<IntlMessages id="ad.floor" />}
                          disabled={readOnly || editMode}
                          value={values?.address?.floor}
                          name="address.floor"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12" md="5" lg="5">
                        <Field
                          component={FormikInput}
                          label={<IntlMessages id="agency.city" />}
                          disabled={readOnly || editMode}
                          value={values?.address?.city}
                          name="address.city"
                        />
                      </Col>
                      <Col sm="6" md="2" lg="2">
                        <Field
                          component={FormikInput}
                          label={<IntlMessages id="agency.district" />}
                          disabled={readOnly || editMode}
                          value={values?.address?.district}
                          name="address.district"
                        />
                      </Col>
                      <Col sm="6" md="3" lg="3">
                        <Field
                          component={FormikInput}
                          label={<IntlMessages id="agency.complement" />}
                          disabled={readOnly || editMode}
                          value={values?.address?.complement}
                          name="address.complement"
                        />
                      </Col>
                      <Col sm="6" md="2" lg="2">
                        <Field
                          component={selectState}
                          value={values?.address?.state}
                          onChange={selectedOption =>
                            handleChange('address.state')(selectedOption)
                          }
                          label={<IntlMessages id="agency.state" />}
                          disabled={readOnly || editMode}
                          name="address.state"
                        />
                        {/* {errors.state} */}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6" md="3" lg="2">
                        <Field
                          appendAddon="m²"
                          component={FormikInput}
                          label={<IntlMessages id="ad.usefullArea" />}
                          disabled={readOnly || editMode}
                          value={values.area}
                          name="area"
                        />
                      </Col>
                      <Col sm="6" md="3" lg="2">
                        <Field
                          component={FormikInput}
                          label={<IntlMessages id="ad.bedrooms" />}
                          disabled={readOnly && !editMode}
                          value={values.dorms}
                          name="dorms"
                        />
                      </Col>
                      <Col sm="6" md="3" lg="2">
                        <Field
                          component={FormikInput}
                          label={<IntlMessages id="ad.suites" />}
                          disabled={readOnly && !editMode}
                          value={values.suites}
                          name="suites"
                        />
                      </Col>
                      <Col sm="6" md="3" lg="2">
                        <Field
                          component={FormikInput}
                          label={<IntlMessages id="ad.bathrooms" />}
                          disabled={readOnly && !editMode}
                          value={values.bathrooms}
                          name="bathrooms"
                        />
                      </Col>
                      <Col sm="6" md="3" lg="4">
                        <Field
                          component={FormikInput}
                          label={<IntlMessages id="ad.garage" />}
                          disabled={readOnly && !editMode}
                          value={values.parking_spots}
                          name="parking_spots"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6" md="2" lg="2">
                        <Field
                          component={selectInput}
                          disabled={readOnly && !editMode}
                          value={readOnly ? values.furnished : typeSelected}
                          name="furnished"
                          onChange={selectedOption =>
                            handleChange('furnished')(selectedOption)
                          }
                          label={<IntlMessages id="ad.furnished" />}
                          options={furnished}
                        />
                      </Col>

                      <Col sm="6" md="2" lg="2">
                        <Field
                          component={selectInput}
                          disabled={readOnly && !editMode}
                          name="key_type"
                          onChange={selectedOption =>
                            handleChange('key_type')(selectedOption)
                          }
                          label={<IntlMessages id="ad.keyType" />}
                          options={key_type}
                          value={values.key_type}
                        />
                      </Col>

                      <Col sm="6" md="2" lg="2">
                        <Field
                          component={selectInput}
                          disabled={readOnly && !editMode}
                          name="animals_allowed"
                          onChange={selectedOption =>
                            handleChange('animals_allowed')(selectedOption)
                          }
                          label={<IntlMessages id="ad.animals" />}
                          options={animals_allowed}
                          value={values.animals_allowed}
                        />
                      </Col>
                      <Col sm="6" md="2" lg="2">
                        <Field
                          component={selectInput}
                          disabled={readOnly && !editMode}
                          name="who_occupied"
                          onChange={selectedOption =>
                            handleChange('who_occupied')(selectedOption)
                          }
                          label={<IntlMessages id="ad.occupied" />}
                          options={who_occupied}
                          value={values.who_occupied}
                        />
                      </Col>
                      <Col sm="6" md="2" lg="2">
                        <Field
                          component={selectInput}
                          disabled={readOnly && !editMode}
                          name="announcer_is"
                          onChange={selectedOption =>
                            handleChange('announcer_is')(selectedOption)
                          }
                          label={<IntlMessages id="ad.advertiser" />}
                          options={announcer_is}
                          value={values.announcer_is}
                        />
                      </Col>
                    </Row>
                    <FormTitle
                      title={<IntlMessages id="ad.cost" />}
                      className="mb-5"
                    />
                    <Row>
                      <Col sm="6" md="3" lg="4">
                        <Field
                          component={FormikInput}
                          currency
                          prependAddon="R$"
                          label={<IntlMessages id="ad.condominium" />}
                          disabled={readOnly && !editMode}
                          value={values.service_fee}
                          name="service_fee"
                        />
                      </Col>
                      <Col sm="6" md="3" lg="4">
                        <Field
                          component={FormikInput}
                          currency
                          prependAddon="R$"
                          label={<IntlMessages id="ad.sellingPrice" />}
                          disabled={readOnly && !editMode}
                          value={values.price}
                          name="price"
                        />
                      </Col>
                      <Col sm="6" md="3" lg="4">
                        <Field
                          component={FormikInput}
                          currency
                          prependAddon="R$"
                          label={<IntlMessages id="ad.iptu" />}
                          disabled={readOnly && !editMode}
                          value={values.iptu}
                          name="iptu"
                        />
                      </Col>
                    </Row>
                    {/* <Row>
                    <Col sm="12" md="6" lg="6">
                    <FormTitle
                        title={<IntlMessages id="ad.home_appliances" />}
                        className="mb-5"
                      />
                      
                      <Field
                        component = {FormikInput}
                        label = {<IntlMessages id = "ad.home_appliances_info"/>}
                        disabled = {readOnly}
                        name = "home_appliances"
                        class = "info"
                        
                      />
                    </Col>
                  </Row> */}
                    <Row>
                      <Col sm="6" md="5" lg="3">
                        <FormTitle
                          title={<IntlMessages id="ad.features" />}
                          className="mb-1"
                        />
                        {this.renderFeature()}
                      </Col>
                      <Col sm="6" md="5" lg="3">
                        <FormTitle
                          title={<IntlMessages id="ad.building_features" />}
                          className="mb-1"
                        />
                        {this.renderBuildingFeature()}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12" md="6" lg="6">
                        <FormTitle
                          title={<IntlMessages id="ad.description_info" />}
                          className="mb-3 mt-5"
                        />
                        <Field
                          component={FormikInput}
                          type="textarea"
                          label={<IntlMessages id="ad.description" />}
                          disabled={readOnly && !editMode}
                          name="description"
                        />
                        <Field
                          component={FormikInput}
                          type="textarea"
                          label={<IntlMessages id="ad.appliances" />}
                          disabled={readOnly && !editMode}
                          name="appliances"
                        />
                      </Col>
                    </Row>
                    {/* FILE */}
                    <Row>
                      <Col>
                        {readOnly && !editMode
                          ? this.renderCarousel()
                          : this.renderDropzone()}
                      </Col>
                    </Row>
                    {/* if(this.props.plans) */}
                    {readOnly && !editMode && (
                      <div style={{ marginTop: 180 }}>
                        <FormTitle
                          title={<IntlMessages id="ad.actual-plan" />}
                          className="mb-3 mt-5"
                        />
                        <Row>
                          <Col sm="12" md="6" lg="6">
                            <Plans
                              title="Plano teste"
                              description="Exibindo enquanto tem pendencia com cliente"
                              price={50}
                              onClick={() => {}}
                            />
                          </Col>
                        </Row>
                      </div>
                    )}

                    {readOnly && !editMode && (
                      <div className="mt-5">
                        <FormTitle
                          className="mb-4"
                          title="Corretores deste imóvel:"
                        />
                        <RequestList
                          requests={this.props.adRequestData}
                          removeAdRequest={this.props.removeAdRequest}
                          acceptAdRequest={this.props.acceptAdRequest}
                        />
                      </div>
                    )}

                    {/* loading */}

                    <Row className="mt-5 justify-content-end">
                      {readOnly ? (
                        <div>
                          {data?.status === 'active' && (
                            <LoadingButton
                              color="primary"
                              loading={!this.props.error && this.isLoading()}
                              disabled={!this.props.error && this.isLoading()}
                              onClick={() => {
                                this.props.history.push(
                                  `/app/agency/announcements/${params.id}/boost`
                                );
                              }}
                              label={<IntlMessages id="ad.impulse" />}
                            />
                          )}
                          {this.renderActiveBtn()}
                          {this.renderSoldBtn()}
                          {!data?.sold && (
                            <LoadingButton
                              color="primary"
                              className="ml-2"
                              disabled={!this.props.error && this.isLoading()}
                              onClick={() => this.handleEditModal()}
                              loading={!this.props.error && this.isLoading()}
                              label={
                                editMode ? (
                                  <IntlMessages id="ad.save" />
                                ) : (
                                  <IntlMessages id="ad.edit" />
                                )
                              }
                            />
                          )}
                          <LoadingButton
                            color="primary"
                            className="ml-2"
                            disabled={!this.props.error && this.isLoading()}
                            onClick={this.goBack}
                            loading={!this.props.error && this.isLoading()}
                            label={<IntlMessages id="ad.back" />}
                          />
                        </div>
                      ) : (
                        <div>
                          <LoadingButton
                            outline
                            color="secondary"
                            onClick={this.goBack}
                            loading={!this.props.error && this.isLoading()}
                            disabled={!this.props.error && this.isLoading()}
                            label={<IntlMessages id="agency.cancel-button" />}
                          />
                          <LoadingButton
                            color="primary"
                            className="ml-2"
                            disabled={!this.props.error && this.isLoading()}
                            onClick={handleSubmit}
                            loading={!this.props.error && this.isLoading()}
                            label={<IntlMessages id="ad.publish" />}
                          />
                        </div>
                      )}
                    </Row>
                  </>
                )}
              />
              {this.renderModal()}
            </Container>
          </CardBody>
        </Card>
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  data: state.ad.data,
  features: state.ad.features,
  building_features: state.ad.building_features,
  constants: state.ad.constants,
  cepLoading: state.ad.cepLoading,
  cep: state.ad.cep,
  fetchLoading: state.ad.fetchLoading,
  fetchIdLoading: state.ad.fetchIdLoading,
  saveLoading: state.ad.saveLoading,
  adRequestData: state.ad.adRequestData,
  adRequestLoading: state.ad.adRequestLoading,
});

const mapActionToProps = {
  fetchConstants,
  saveAd,
  fetchCep,
  fetchAdId,
  disableAd,
  enableAd,
  soldAd,
  editAd,
  fetchAdRequest,
  acceptAdRequest,
  removeAdRequest,
};

export default connect(mapStateToProps, mapActionToProps)(AdForm);
