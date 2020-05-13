import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import classNames from 'classnames';
import './styles.css';
import IntlMessages from '../../../../../../helpers/IntlMessages';
import ModalExample from '../../../../../../components/Modal';

const ListItem = ({ agent, history, disableUsers, enableUsers }) => {
  return (
    <tr className={agent.status !== 'active' && 'inactive'}>
      <td>{agent.name}</td>
      <td>{agent.email}</td>
      <td>{agent.creci}</td>
      <td>{agent.city}</td>
      <td>{agent.state}</td>
      <td>
        {agent.status === 'active' ? (
          <IntlMessages id="agency.active" />
        ) : (
          <IntlMessages id="agency.inactive" />
        )}
      </td>
      <td>
        <i
          className={classNames('simple-icon-magnifier', 'list-icon-button')}
          onClick={() => history.push(`/app/admin/agent/info/${agent.id}`)}
        />
        {agent.status === 'active' ? (
          <i
            className={classNames('simple-icon-ban', 'list-icon-button')}
            onClick={() => disableUsers(agent.id)}
          />
        ) : (
          <i
            className={classNames('simple-icon-check', 'list-icon-button')}
            onClick={() => enableUsers(agent.id)}
          />
        )}
      </td>
    </tr>
  );
};

const RequestItem = ({
  agent,
  history,
  handleApproval,
  handleShowModal,
  showModal,
  handleApprovalMessage,
}) => (
  <tr>
    <td>{agent.name}</td>
    <td>{agent.email}</td>
    <td>{agent.creci}</td>
    <td>{agent.city}</td>
    <td>{agent.state}</td>
    <td>
      {agent.status ? (
        <IntlMessages id="agency.active" />
      ) : (
        <IntlMessages id="agency.inactive" />
      )}
    </td>
    <td>
      <i
        className={classNames('simple-icon-magnifier', 'list-icon-button')}
        onClick={() => history.push(`/app/admin/agent/request/${agent.id}`)}
      />
      <i
        className={classNames('simple-icon-check', 'list-icon-button')}
        onClick={() => handleApproval(agent.id, true)}
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
      id={agent.id}
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
              <IntlMessages id="agency.status" />
            </th>
            <th>
              <IntlMessages id="agency.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.agents.map(item =>
            this.props.tab === 0 ? (
              <ListItem
                agent={item}
                history={this.props.history}
                handleApproval={this.props.handleApproval}
                disableUsers={this.props.disableUsers}
                enableUsers={this.props.enableUsers}
              />
            ) : (
              <RequestItem
                agent={item}
                history={this.props.history}
                handleApproval={this.props.handleApproval}
                handleApprovalMessage={this.props.handleApprovalMessage}
                showModal={this.props.showModal}
                handleShowModal={this.props.handleShowModal}
              />
            )
          )}
        </tbody>
      </Table>
    );
  }
}

export default AgencyList;
