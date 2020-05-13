import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import classNames from 'classnames';
import './styles.css';
import Switch from 'react-input-switch';
import IntlMessages from '../../../../../../helpers/IntlMessages';

const handleDelete = agent => {
  console.log(agent);
};

const types = {
  monthly: 'Mensal',
};

const ListItem = ({
  agent,
  history,
  disableSubscriptionAgent,
  enableSubscriptionAgent,
}) => {
  function switchValue(value) {
    console.log(value);
    switch (value) {
      case 'active':
        return 1;
      case 'inactive':
        return 0;
    }
  }

  return (
    <tr className={agent.status !== 'active' && 'inactive'}>
      <td>{agent.name}</td>
      <td>{types[agent.type]}</td>
      <td>R$ {Number(agent.price).toFixed(2)}</td>
      <td>{agent.ads_per_month}</td>
      <td>
        <i
          className={classNames('simple-icon-pencil', 'list-icon-button')}
          onClick={() =>
            history.push(`/app/admin/subscriptions/agent/edit/${agent.id}`)
          }
        />
        <Switch
          className="ml-3"
          value={switchValue(agent.status)}
          onChange={() =>
            agent.status === 'active'
              ? disableSubscriptionAgent(agent.id)
              : enableSubscriptionAgent(agent.id)
          }
        />
      </td>
    </tr>
  );
};

class AgentList extends PureComponent {
  render() {
    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>
              <IntlMessages id="subs.name" />
            </th>
            <th>
              <IntlMessages id="subs.type" />
            </th>
            <th>
              <IntlMessages id="subs.value" />
            </th>
            <th>
              <IntlMessages id="subs.ads_per_month" />
            </th>
            <th>
              <IntlMessages id="agency.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.agents.map(item => (
            <ListItem
              agent={item}
              history={this.props.history}
              enableSubscriptionAgent={this.props.enableSubscriptionAgent}
              disableSubscriptionAgent={this.props.disableSubscriptionAgent}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default AgentList;
