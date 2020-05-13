import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import classNames from 'classnames';
import './styles.css';
import IntlMessages from '../../../../../helpers/IntlMessages';
import ModalConfirmation from '../../../../../components/ModalConfirmation';

const ListItem = ({
  agent,
  history,
  handleShowUnassignModal,
  handleAgentId,
}) => {
  return (
    <tr className={agent.status !== 'active' && 'inactive'}>
      <td>{agent.name}</td>
      <td>{agent.profile.user.email}</td>
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
          onClick={() => history.push(`/app/agency/agent/info/${agent.id}`)}
        />
        <i
          className={classNames('simple-icon-ban', 'list-icon-button')}
          onClick={() => {
            handleShowUnassignModal();
            handleAgentId(agent.request[0].agent_id);
          }}
        />
      </td>
    </tr>
  );
};

const RequestItem = ({
  agent,
  history,
  handleShowApprovalModal,
  handleShowRefuseModal,
  handleAgentId,
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
        onClick={() =>
          history.push(
            `/app/agency/agent/request/${agent.id}/${agent.request[0].id}`
          )
        }
      />
      <i
        className={classNames('simple-icon-check', 'list-icon-button')}
        onClick={() => {
          handleShowApprovalModal();
          handleAgentId(agent.request[0].id);
        }}
      />
      <i
        className={classNames('simple-icon-ban', 'list-icon-button')}
        onClick={() => {
          handleShowRefuseModal();
          handleAgentId(agent.request[0].agent_id);
        }} // recusar vinculo
      />
    </td>
  </tr>
);

class AgencyList extends PureComponent {
  state = {
    showApprovalModal: false,
    showUnassignModal: false,
    showRefuseModal: false,
    agentId: undefined,
  };

  handleShowUnassignModal = () => {
    const unassign = this.state.showUnassignModal;
    this.setState({ showUnassignModal: !unassign });
  };

  handleShowApprovalModal = () => {
    const approval = this.state.showApprovalModal;
    this.setState({ showApprovalModal: !approval });
  };

  handleShowRefuseModal = () => {
    const refuse = this.state.showRefuseModal;
    this.setState({ showRefuseModal: !refuse });
  };

  handleAgentId = id => {
    this.setState({ agentId: id });
  };

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
                key={item?.id}
                hadleUnassign={this.props.hadleUnassign}
                handleAgentId={this.handleAgentId}
                handleShowUnassignModal={this.handleShowUnassignModal}
              />
            ) : (
              <RequestItem
                agent={item}
                history={this.props.history}
                handleApproval={this.props.handleApproval}
                hadleUnassign={this.props.hadleUnassign}
                handleAgentId={this.handleAgentId}
                handleShowApprovalModal={this.handleShowApprovalModal}
                handleShowRefuseModal={this.handleShowRefuseModal}
                key={item?.id}
              />
            )
          )}
        </tbody>
        <ModalConfirmation
          showModal={this.state.showUnassignModal}
          handleShowModal={this.handleShowUnassignModal}
          title={<IntlMessages id="agency.unassign-agent" />}
          onClick={() => {
            this.props.handleUnassign(this.state.agentId);
            this.handleShowUnassignModal(); // close modal after click
          }}
        />
        <ModalConfirmation
          showModal={this.state.showApprovalModal}
          handleShowModal={this.handleShowApprovalModal}
          title={<IntlMessages id="agency.approval-agent" />}
          onClick={() => {
            this.props.handleApproval(this.state.agentId);
            this.handleShowApprovalModal(); // close modal after click
            this.props.history.push(`/app/agency/agent/list`);
          }}
        />
        <ModalConfirmation
          showModal={this.state.showRefuseModal}
          handleShowModal={this.handleShowRefuseModal}
          title={<IntlMessages id="agency.refuse-agent" />}
          onClick={() => {
            this.props.handleUnassign(this.state.agentId);
            this.handleShowRefuseModal();
          }}
        />
      </Table>
    );
  }
}

export default AgencyList;
