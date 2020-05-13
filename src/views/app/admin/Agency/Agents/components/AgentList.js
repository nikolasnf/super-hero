import React, { PureComponent } from 'react';
import { Table, Button } from 'reactstrap';
import classNames from 'classnames';
import './styles.css';
import IntlMessages from '../../../../../../helpers/IntlMessages';

const ListItem = ({
  agent,
  agencyId,
  assignedAgent,
  assignAgent,
  unassignAgent,
}) => {
  const renderButton = request => {
    if (request?.length) {
      if (request[0]?.status === 'assigned') {
        return (
          <Button
            className="assign-button "
            color="secondary"
            onClick={() => unassignAgent(agencyId, agent.id)}
          >
            <IntlMessages id="agents.deassign" />
          </Button>
        );
      }

      if (request[0]?.status === 'pending') {
        return (
          <Button
            className="assign-button"
            color="secondary"
            onClick={() => {}}
          >
            <IntlMessages id="agents.pending" />
          </Button>
        );
      }
    }

    return (
      <Button
        className="assign-button inactive"
        color="secondary"
        onClick={() => assignAgent(agencyId, agent.id)}
      >
        <IntlMessages id="agents.assign" />
      </Button>
    );
  };

  return (
    <tr className={agent?.profile?.status !== 'active' && 'inactive'}>
      <td>{agent?.profile?.name}</td>
      <td>{agent?.profile?.user?.email}</td>
      <td>{agent?.creci}</td>
      <td>{agent?.profile?.address?.city}</td>
      <td>{agent?.profile?.address?.state}</td>
      <td>
        {agent?.profile?.status === 'active' ? (
          <IntlMessages id="agency.active" />
        ) : (
          <IntlMessages id="agency.inactive" />
        )}
      </td>
      <td>{renderButton(agent?.request)}</td>
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
              <IntlMessages id="agency.status" />
            </th>
            <th>
              <IntlMessages id="agency.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props?.agents?.map(item => (
            <ListItem
              agent={item}
              assignAgent={this.props.assignAgent}
              unassignAgent={this.props.unassignAgent}
              agencyId={this.props.agencyId}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default AgencyList;
