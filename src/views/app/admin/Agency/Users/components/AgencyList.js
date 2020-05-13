import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import classNames from 'classnames';
import './styles.css';
import IntlMessages from '../../../../../../helpers/IntlMessages';
import ModalExample from '../../../../../../components/Modal';

const ListItem = ({
  agency,
  history,
  handleApproval,
  disableUsers,
  enableUsers,
}) => (
  <tr className={agency.status !== 'active' && 'inactive'}>
    <td>{agency.name}</td>
    <td>{agency.email}</td>
    <td>{agency.creci}</td>
    <td>{agency.city}</td>
    <td>{agency.state}</td>
    <td>
      {agency.status ? (
        <IntlMessages id="agency.active" />
      ) : (
        <IntlMessages id="agency.inactive" />
      )}
    </td>
    <td>
      <i
        className={classNames('simple-icon-magnifier', 'list-icon-button')}
        onClick={() => history.push(`/app/admin/agency/info/${agency.id}`)}
      />
      {agency.status === 'active' ? (
        <i
          className={classNames('simple-icon-ban', 'list-icon-button')}
          onClick={() => disableUsers(agency.id)}
        />
      ) : (
        <i
          className={classNames('simple-icon-check', 'list-icon-button')}
          onClick={() => enableUsers(agency.id)}
        />
      )}
    </td>
  </tr>
);

const RequestItem = ({
  agency,
  history,
  handleApproval,
  handleShowModal,
  handleApprovalMessage,
  showModal,
}) => (
  <tr>
    <td>{agency.name}</td>
    <td>{agency.email}</td>
    <td>{agency.creci}</td>
    <td>{agency.city}</td>
    <td>{agency.state}</td>
    <td>
      {agency.status ? (
        <IntlMessages id="agency.active" />
      ) : (
        <IntlMessages id="agency.inactive" />
      )}
    </td>
    <td>
      <i
        className={classNames('simple-icon-magnifier', 'list-icon-button')}
        onClick={() => history.push(`/app/admin/agency/request/${agency.id}`)}
      />
      <i
        className={classNames('simple-icon-check', 'list-icon-button')}
        onClick={() => handleApproval(agency.id, true)}
      />
      <i
        className={classNames('simple-icon-ban', 'list-icon-button')}
        onClick={() => handleShowModal()}
      />
    </td>
    <ModalExample
      toggle={handleShowModal}
      modal={showModal}
      approval={handleApprovalMessage}
      id={agency.id}
      approved={false}
    />
  </tr>
);

class AgencyList extends PureComponent {
  render() {
    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>
              <IntlMessages id="agency.agency" />
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
              <IntlMessages id="agency.status" />
            </th>
            <th>
              <IntlMessages id="agency.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.agencies.map(item =>
            this.props.tab === 0 ? (
              <ListItem
                agency={item}
                history={this.props.history}
                handleApproval={this.props.handleApproval}
                disableUsers={this.props.disableUsers}
                enableUsers={this.props.enableUsers}
              />
            ) : (
              <RequestItem
                agency={item}
                history={this.props.history}
                handleApproval={this.props.handleApproval}
                handleShowModal={this.props.handleShowModal}
                handleApprovalMessage={this.props.handleApprovalMessage}
                showModal={this.props.showModal}
              />
            )
          )}
        </tbody>
      </Table>
    );
  }
}

export default AgencyList;
