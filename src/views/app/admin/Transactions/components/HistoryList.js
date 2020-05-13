import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import classNames from 'classnames';
import IntlMessages from '../../../../../helpers/IntlMessages';

const ListItem = ({ item, user }) => (
  <tr>
    <td>{item.name}</td>
    <td>{item.email}</td>
    {!user && <td>{item.creci}</td>}
    <td>{item.subscription}</td>
    <td>{item.type}</td>
    <td>{item.price}</td>
    <td>
      {item.status ? (
        <IntlMessages id="agency.active" />
      ) : (
        <IntlMessages id="agency.inactive" />
      )}
    </td>
  </tr>
);
class HistoryList extends PureComponent {
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
            {!this.props.user && (
              <th>
                <IntlMessages id="agency.creci" />
              </th>
            )}
            <th>
              <IntlMessages id="plans.plan-type" />
            </th>
            <th>
              <IntlMessages id="plans.plan-duration" />
            </th>
            <th>
              <IntlMessages id="plans.value" />
            </th>
            <th>
              <IntlMessages id="agency.status" />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.itens.map(item => (
            <ListItem item={item} user={this.props.user} />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default HistoryList;
