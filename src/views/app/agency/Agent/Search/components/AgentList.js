import React, { PureComponent } from 'react';
import { Table, Button } from 'reactstrap';
import classNames from 'classnames';
import './styles.css';
import IntlMessages from '../../../../../../helpers/IntlMessages';

const ListItem = ({
  agent,
  history,
  handleUnassign,
  handleApproval,
  requestAgent,
  approveAssign,
}) => {
  const renderBtn = () => {
    if (agent?.request?.length) {
      const { status, id } = agent.request[0];
      if (status === 'assigned') {
        return (
          <Button
            className="assign-button "
            color="secondary"
            onClick={() => {
              handleUnassign(agent.id, true);
            }}
          >
            <IntlMessages id="agents.deassign" />
          </Button>
        );
      }
      if (status === 'pending') {
        return (
          <Button
            className="assign-button inactive"
            color="secondary"
            onClick={() =>
              approveAssign({
                request_id: id,
                status: 'revoked',
              })
            }
          >
            <IntlMessages id="agents.cancel-assign" />
          </Button>
        );
      }
    }
    return (
      <Button
        className="assign-button inactive"
        color="secondary"
        onClick={() => {
          requestAgent(agent.id);
        }}
      >
        <IntlMessages id="agents.assign" />
      </Button>
    );
  };

  return (
    <tr>
      <td>{agent?.profile?.name}</td>
      <td>{agent?.profile?.user?.email}</td>
      <td>{agent?.creci}</td>
      <td>{agent?.city}</td>
      <td>{agent?.state}</td>
      <td>{renderBtn()}</td>
    </tr>
  );
};

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
              <IntlMessages id="agency.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {console.log('ag', this.props.agents)}
          {this.props.agents.map(item => (
            <ListItem
              agent={item}
              history={this.props.history}
              key={item?.id}
              handleApproval={this.props.handleApproval}
              handleUnassign={this.props.handleUnassign}
              requestAgent={this.props.requestAgent}
              approveAssign={this.props.approveAssign}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default AgencyList;
