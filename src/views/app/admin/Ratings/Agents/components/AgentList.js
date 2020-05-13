import React, { PureComponent } from 'react';
import { Table, Input } from 'reactstrap';
import classNames from 'classnames';

import './styles.css';
import IntlMessages from '../../../../../../helpers/IntlMessages';
import { formatOnlyDate } from '../../../../../../helpers/Utils';

const ListItem = ({ agent, history, onMark, selected }) => {
  return (
    <tr>
      <td>{agent?.profile?.name}</td>
      <td>{agent?.profile?.user.email}</td>
      <td>{agent?.agent?.profile?.name}</td>
      <td>{agent?.agent?.creci}</td>
      <td>{formatOnlyDate(agent?.created_at)}</td>
      <td>{agent?.read !== 0 ? 'Lido' : 'Não lido'}</td>
      <td>
        <i
          className={classNames('simple-icon-magnifier', 'list-icon-button')}
          onClick={() =>
            history.push(`/app/admin/ratings/agent/view/${agent?.id}`)
          }
        />
        <Input
          checked={selected.indexOf(agent?.id) !== -1}
          addon
          type="checkbox"
          name="selected"
          onChange={() => onMark(agent?.id)}
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
              <IntlMessages id="agency.name" />
            </th>
            <th>
              <IntlMessages id="agency.email" />
            </th>
            <th>
              <IntlMessages id="rating.agent" />
            </th>
            <th>
              <IntlMessages id="rating.agent-creci" />
            </th>
            <th>
              <IntlMessages id="rating.date" />
            </th>
            <th>
              <IntlMessages id="rating.single-read" />
            </th>
            <th>
              <IntlMessages id="agency.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.agent.map(item => (
            <ListItem
              key={item.id}
              agent={item}
              history={this.props.history}
              selected={this.props.selected}
              onMark={this.props.onMark}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default AgentList;
