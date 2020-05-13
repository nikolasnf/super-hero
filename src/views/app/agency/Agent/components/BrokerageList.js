import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import classNames from 'classnames';
import './styles.css';
import IntlMessages from '../../../../../helpers/IntlMessages';
import ModalConfirmation from '../../../../../components/ModalConfirmation';

const ListItem = ({
  request,
  history,
  handleShowRemoveModal,
  handleShowAcceptModal,
  handleRequestId,
}) => {
  const renderActionBtns = () => {
    return (
      <div className="d-flex">
        <i
          className={classNames('simple-icon-magnifier', 'list-icon-button')}
          onClick={() =>
            history.push(`/app/agency/agent/brokerage/${request.id}`)
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
      <td>{request?.agent?.profile?.name}</td>
      <td>{request?.agent?.profile?.name}</td>
      <td>{request?.agent?.creci}</td>
      <td>{request?.address?.city}</td>
      <td>{request?.address?.state}</td>
      <td>{renderActionBtns()}</td>
    </tr>
  );
};

class RequestList extends PureComponent {
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
                <IntlMessages id="agents.agent" />
              </th>
              <th>
                <IntlMessages id="agency.email" />
              </th>
              <th>
                <IntlMessages id="agency.creci" />
              </th>
              <th>
                <IntlMessages id="agency.city" />
              </th>
              <th>
                <IntlMessages id="agency.uf" />
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
                  item.status === 'pending' && (
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
          title={<IntlMessages id="ad.accept-message" />}
          onClick={() => {
            this.props.acceptAdRequest(this.state.requestId);
            this.handleShowAcceptModal();
          }}
        />
        <ModalConfirmation
          showModal={this.state.showRemoveModal}
          handleShowModal={this.handleShowRemoveModal}
          title={<IntlMessages id="ad.remove-message" />}
          onClick={() => {
            this.props.removeAdRequest(this.state.requestId);
            this.handleShowRemoveModal();
          }}
        />
      </>
    );
  }
}

export default RequestList;
