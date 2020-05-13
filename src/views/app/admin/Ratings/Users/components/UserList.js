import React, { PureComponent } from 'react';
import { Table, Input } from 'reactstrap';
import classNames from 'classnames';

import './styles.css';
import IntlMessages from '../../../../../../helpers/IntlMessages';
import { formatOnlyDate } from '../../../../../../helpers/Utils';

const ListItem = ({ user, history, onMark, selected }) => {
  return (
    <tr>
      <td>{user?.profile?.name}</td>
      <td>{user?.profile?.user.email}</td>
      <td>{user?.advertiser?.profile?.name}</td>
      <td>{user?.advertiser?.profile?.user?.email}</td>
      <td>{formatOnlyDate(user?.created_at)}</td>
      <td>{user?.read !== 0 ? 'Lido' : 'Não lido'}</td>
      <td>
        <i
          className={classNames('simple-icon-magnifier', 'list-icon-button')}
          onClick={() =>
            history.push(`/app/admin/ratings/users/view/${user?.id}`)
          }
        />
        <Input
          checked={selected.indexOf(user?.id) !== -1}
          addon
          type="checkbox"
          name="selected"
          onChange={() => onMark(user?.id)}
        />
      </td>
    </tr>
  );
};

class UserList extends PureComponent {
  render() {
    console.log(this.props.user);
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
              <IntlMessages id="rating.user" />
            </th>
            <th>
              <IntlMessages id="rating.user-email" />
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
          {this.props.user.map(item => (
            <ListItem
              key={item.id}
              user={item}
              history={this.props.history}
              onMark={this.props.onMark}
              selected={this.props.selected}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default UserList;
