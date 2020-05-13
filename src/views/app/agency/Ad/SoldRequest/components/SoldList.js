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
  request,
  history,
  handleShowRemoveModal,
  handleShowAcceptModal,
  handleRequestId,
}) => {
  const bedrooms = request?.ad?.dorms + request?.ad?.suites;
  const info = `${
    typeOptions[request?.ad?.type]
      ? typeOptions[request?.ad?.type]
      : request?.ad?.type
  } ${bedrooms} quartos, ${request?.ad?.area}m²`;

  const renderActionBtns = () => {
    return (
      <div className="d-flex">
        <i
          className={classNames('simple-icon-magnifier', 'list-icon-button')}
          onClick={() =>
            history.push(`/app/agency/announcements/soldRequest/${request.id}`)
          }
        />
        <i
          className={classNames('simple-icon-check', 'list-icon-button')}
          onClick={() => {
            handleShowAcceptModal();
            handleRequestId(request.id);
          }}
        />
        <i
          className={classNames('simple-icon-ban', 'list-icon-button')}
          onClick={() => {
            handleShowRemoveModal();
            handleRequestId(request.id);
          }}
        />
      </div>
    );
  };
  return (
    <tr>
      {console.log(request)}
      <td>{request?.ad?.id}</td>
      <td>{info}</td>
      <td>{request?.address?.city}</td>
      <td>{request?.address?.state}</td>
      <td>{request?.agent?.profile?.name}</td>
      <td>{request?.agent?.creci}</td>
      <td>{renderActionBtns()}</td>
    </tr>
  );
};

class SoldList extends PureComponent {
  state = {
    showRemoveModal: false,
    showAcceptModal: false,
    requestId: 0,
  };

  handleShowAcceptModal = () => {
    const enable = this.state.showAcceptModal;
    this.setState({ showAcceptModal: !enable });
  };

  handleShowRemoveModal = () => {
    const disable = this.state.showRemoveModal;
    this.setState({ showRemoveModal: !disable });
  };

  handleRequestId = id => {
    this.setState({ requestId: id });
  };

  render() {
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
              <th>
                <IntlMessages id="agents.agent" />
              </th>
              <th>
                <IntlMessages id="user.creci" />
              </th>
              <th>
                <IntlMessages id="agency.actions" />
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.requests && this.props.requests.length ? (
              this.props.requests.map(
                item =>
                  item.sold === 'pending' && (
                    <ListItem
                      request={item}
                      history={this.props.history}
                      handleShowAcceptModal={this.handleShowAcceptModal}
                      handleShowRemoveModal={this.handleShowRemoveModal}
                      handleRequestId={this.handleRequestId}
                    />
                  )
              )
            ) : (
              <span>Nenhum registro encontrado.</span>
            )}
          </tbody>
        </Table>
        <ModalConfirmation
          showModal={this.state.showAcceptModal}
          handleShowModal={this.handleShowAcceptModal}
          title={<IntlMessages id="ad.accept-sold-message" />}
          onClick={() => {
            this.props.acceptAdSoldRequest(this.state.requestId);
            this.handleShowAcceptModal();
          }}
        />
        <ModalConfirmation
          showModal={this.state.showRemoveModal}
          handleShowModal={this.handleShowRemoveModal}
          title={<IntlMessages id="ad.remove-sold-message" />}
          onClick={() => {
            this.props.removeAdSoldRequest(this.state.requestId);
            this.handleShowRemoveModal();
          }}
        />
      </>
    );
  }
}

export default SoldList;
