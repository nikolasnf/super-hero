import React, { PureComponent } from 'react';
import { Table, Input } from 'reactstrap';
import classNames from 'classnames';

import './styles.css';
import IntlMessages from '../../../../../../helpers/IntlMessages';
import { formatOnlyDate } from '../../../../../../helpers/Utils';

const ListItem = ({ propertie, history, onMark, selected }) => {
  return (
    <tr>
      <td>{propertie?.profile?.name}</td>
      <td>{propertie?.profile?.user.email}</td>
      <td>{propertie?.ad?.id}</td>
      <td>{formatOnlyDate(propertie?.created_at)}</td>
      <td>{propertie?.read !== 0 ? 'Lido' : 'Não lido'}</td>
      <td>
        <i
          className={classNames('simple-icon-magnifier', 'list-icon-button')}
          onClick={() =>
            history.push(`/app/admin/ratings/properties/view/${propertie?.id}`)
          }
        />
        <Input
          checked={selected.indexOf(propertie?.id) !== -1}
          addon
          type="checkbox"
          name="selected"
          onChange={() => onMark(propertie?.id)}
        />
      </td>
    </tr>
  );
};

class PropertieList extends PureComponent {
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
              <IntlMessages id="rating.property-id" />
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
          {this.props.propertie.map(item => (
            <ListItem
              key={item.id}
              propertie={item}
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

export default PropertieList;
