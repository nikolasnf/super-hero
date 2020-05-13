import React, { PureComponent } from 'react';
import { Table, CustomInput } from 'reactstrap';
import classNames from 'classnames';
import './styles.css';
import Switch from 'react-input-switch';
import IntlMessages from '../../../../../../helpers/IntlMessages';

const ListItem = ({ agency, history, disableAgency, enableAgency, page }) => {
  function subscriptionType(subType) {
    switch (subType) {
      case 'daily':
        return 'Diaria';

      case 'monthly':
        return 'Mensal';

      case 'annually':
        return 'Anual';
    }
  }

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
    <tr className={agency.status !== 'active' && 'inactive'}>
      <td>{agency.name}</td>
      <td>{subscriptionType(agency.type)}</td>
      <td>{agency.agents_linked}</td>
      <td>R$ {Number(agency.price).toFixed(2)}</td>
      <td>
        <i
          className={classNames('simple-icon-pencil', 'list-icon-button')}
          onClick={() =>
            history.push(`/app/admin/subscriptions/agency/edit/${agency.id}`)
          }
        />
        <Switch
          className="ml-3"
          value={switchValue(agency.status)}
          onChange={() =>
            agency.status === 'active'
              ? disableAgency(agency.id, page)
              : enableAgency(agency.id, page)
          }
        />
      </td>
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
              <IntlMessages id="subs.name" />
            </th>
            <th>
              <IntlMessages id="subs.type" />
            </th>
            <th>
              <IntlMessages id="subs.agents_linked" />
            </th>
            <th>
              <IntlMessages id="subs.price" />
            </th>
            <th>
              <IntlMessages id="agency.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.agencies.map(item => (
            <ListItem
              agency={item}
              history={this.props.history}
              disableAgency={this.props.disableAgency}
              enableAgency={this.props.enableAgency}
              page={this.props.page}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default AgencyList;
