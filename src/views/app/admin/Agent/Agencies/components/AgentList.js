import React, { PureComponent } from 'react';
import { Table, Button } from 'reactstrap';
import classNames from 'classnames';
import './styles.css';
import IntlMessages from '../../../../../../helpers/IntlMessages';

const ListItem = ({
  agency,
  agentId,
  assignedAgency,
  assignAgency,
  unassignAgency,
  history,
}) => {
  const renderButton = request => {
    if (request?.length) {
      if (request[0]?.status === 'assigned') {
        console.log(request);
        return (
          <Button
            className="assign-button "
            color="secondary"
            onClick={() => unassignAgency(agentId, agency.id, history)}
          >
            <IntlMessages id="agents.deassign" />
          </Button>
        );
      }

      if (request[0]?.status === 'pending') {
        return (
          <Button
            className="assign-button inactive"
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
        color="primary"
        onClick={() => assignAgency(agentId, agency.id)}
      >
        <IntlMessages id="agents.assign" />
      </Button>
    );
  };

  return (
    <tr className={agency?.profile?.status !== 'active' && 'inactive'}>
      <td>{agency?.profile?.name}</td>
      <td>{agency?.profile?.user?.email}</td>
      <td>{agency.creci}</td>
      <td>{agency?.profile?.address?.city}</td>
      <td>{agency?.profile?.address?.state}</td>
      <td>
        {agency?.profile?.status === 'active' ? (
          <IntlMessages id="agency.active" />
        ) : (
          <IntlMessages id="agency.inactive" />
        )}
      </td>
      <td>{renderButton(agency?.request)}</td>
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
              <IntlMessages id="agents.agency" />
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
          {this.props?.agencies?.map(item => (
            <ListItem
              agency={item}
              assignedAgency={this.props.assignedAgency}
              assignAgency={this.props.assignAgency}
              unassignAgency={this.props.unassignAgency}
              agentId={this.props.agentId}
              history={this.props.history}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default AgencyList;
