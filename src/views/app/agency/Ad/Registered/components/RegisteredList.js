import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import classNames from 'classnames';
import './styles.css';
import IntlMessages from '../../../../../../helpers/IntlMessages';
import ModalConfirmation from '../../../../../../components/ModalConfirmation';

const typeOptions = {
  AD_TYPE_APARTMENT: 'Apartamento',
  AD_TYPE_KITNET_STUDIO: 'Kitnet/Studio',
  AD_TYPE_TOWNHOUSE: 'Casa de condomínio',
  AD_TYPE_HOUSE: 'Casa',
};

const ListItem = ({
  ad,
  history,
  handleShowDisableModal,
  handleShowEnableModal,
  handleAdId,
}) => {
  const renderActionBtns = () => {
    if (ad.status === 'active') {
      return (
        <i
          className={classNames('simple-icon-ban', 'list-icon-button')}
          onClick={() => {
            handleShowDisableModal();
            handleAdId(ad.id);
          }}
        />
      );
    }
    if (ad.status === 'inactive') {
      return (
        <i
          className={classNames('simple-icon-check', 'list-icon-button')}
          onClick={() => {
            handleShowEnableModal();
            handleAdId(ad.id);
          }}
        />
      );
    }
    return (
      <i
        className={classNames(
          'simple-icon-check',
          'list-icon-button',
          'inactive'
        )}
      />
    );
  };

  const bedrooms = ad?.dorms + ad?.suites;

  return (
    <tr className={ad.status === 'blocked' && 'inactive'}>
      <td>{ad.id}</td>
      <td>{`${typeOptions[ad?.type] ? typeOptions[ad?.type] : ad?.type} ${
        ad?.dorms
      } quartos ${ad?.area} m²`}</td>
      <td>{ad?.address?.city}</td>
      <td>{ad?.address?.state}</td>
      <td>{ad.plan}</td>
      <td>
        <i
          className={classNames('simple-icon-magnifier', 'list-icon-button')}
          onClick={() => history.push(`/app/agency/announcements/${ad.id}`)}
        />
        {renderActionBtns()}
      </td>
    </tr>
  );
};

class AdList extends PureComponent {
  state = {
    showDisableModal: false,
    showEnableModal: false,
    adId: 0,
  };

  handleShowEnableModal = () => {
    const enable = this.state.showEnableModal;
    this.setState({ showEnableModal: !enable });
  };

  handleShowDisableModal = () => {
    const disable = this.state.showDisableModal;
    this.setState({ showDisableModal: !disable });
  };

  handleAdId = id => {
    this.setState({ adId: id });
  };

  render() {
    const { type } = this.props;

    return (
      <>
        <Table responsive hover>
          <thead>
            <tr>
              <th>
                <IntlMessages id="ad.id" />
              </th>
              <th>
                <IntlMessages id="ad.propertie" />
              </th>
              <th>
                <IntlMessages id="ad.city" />
              </th>
              <th>
                <IntlMessages id="ad.uf" />
              </th>
              {!type && (
                <th>
                  <IntlMessages id="ad.plan" />
                </th>
              )}
              <th>
                <IntlMessages id="ad.actions" />
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.ads && this.props.ads.length ? (
              this.props.ads.map(item => (
                <ListItem
                  ad={item}
                  history={this.props.history}
                  handleShowEnableModal={this.handleShowEnableModal}
                  handleShowDisableModal={this.handleShowDisableModal}
                  handleAdId={this.handleAdId}
                />
              ))
            ) : (
              <span>Nenhum registro encontrado.</span>
            )}
          </tbody>
        </Table>
        <ModalConfirmation
          showModal={this.state.showEnableModal}
          handleShowModal={this.handleShowEnableModal}
          title={<IntlMessages id="ad.enable-confirmation" />}
          onClick={() => this.props.enableAd({ id: this.state.adId })}
        />
        <ModalConfirmation
          showModal={this.state.showDisableModal}
          handleShowModal={this.handleShowDisableModal}
          title={<IntlMessages id="ad.disable-confirmation" />}
          onClick={() => this.props.disableAd({ id: this.state.adId })}
        />
      </>
    );
  }
}

export default AdList;
