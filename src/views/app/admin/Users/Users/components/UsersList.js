import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import classNames from 'classnames';
import './styles.css';
import { connect } from 'react-redux';
import IntlMessages from '../../../../../../helpers/IntlMessages';

const ListItem = ({ user, history, disableUsers, enableUsers, page }) => (
  <tr className={user.status !== 'active' && 'inactive'}>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>{user.phone}</td>
    <td>{user.ads.length}</td>
    <td>
      {user.status === 'active' ? (
        <IntlMessages id="agency.active" />
      ) : (
        <IntlMessages id="agency.inactive" />
      )}
    </td>
    <td>
      <i
        className={classNames('simple-icon-magnifier', 'list-icon-button')}
        onClick={() => history.push(`/app/admin/users/info/${user.id}`)}
      />

      {user.status === 'active' ? (
        <i
          className={classNames('simple-icon-ban', 'list-icon-button')}
          onClick={() => disableUsers(user.id, page)}
        />
      ) : (
        <i
          className={classNames('simple-icon-check', 'list-icon-button')}
          onClick={() => enableUsers(user.id, page)}
        />
      )}
    </td>
  </tr>
);

class UsersList extends PureComponent {
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
              <IntlMessages id="agency.phone" />
            </th>
            <th>
              <IntlMessages id="users.number-of-ads" />
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
          {this.props.users.map(item => (
            <ListItem
              user={item}
              history={this.props.history}
              disableUsers={this.props.disableUsers}
              enableUsers={this.props.enableUsers}
              page={this.props.page}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default UsersList;
