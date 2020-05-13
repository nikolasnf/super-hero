import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import classNames from 'classnames';
import './styles.css';
import Switch from 'react-input-switch';
import IntlMessages from '../../../../../helpers/IntlMessages';

const ListItem = ({ plan, history, enable, disable }) => {
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
    <tr className={plan.status !== 'active' && 'inactive'}>
      <td>{plan.name}</td>
      <td>
        {plan.duration} <IntlMessages id="plans.days" />
      </td>
      <td>R$ {Number(plan.price).toFixed(2)}</td>
      <td>{plan.highlights_per_day}</td>
      <td>{plan.impressions_per_day}</td>
      <td>
        <i
          className={classNames('simple-icon-pencil', 'list-icon-button')}
          onClick={() => history.push(`/app/admin/plans/edit/${plan.id}`)}
        />
        <Switch
          className="ml-3"
          value={switchValue(plan.status)}
          onChange={() =>
            plan.status === 'active' ? disable(plan.id) : enable(plan.id)
          }
        />
      </td>
    </tr>
  );
};

class PlanList extends PureComponent {
  render() {
    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>
              <IntlMessages id="plans.plan-name" />
            </th>
            <th>
              <IntlMessages id="plans.plan-duration" />
            </th>
            <th>
              <IntlMessages id="plans.plan-value" />
            </th>
            <th>
              <IntlMessages id="plans.highlights" />
            </th>
            <th>
              <IntlMessages id="plans.impressions" />
            </th>
            <th>
              <IntlMessages id="agency.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.plans.map(item => (
            <ListItem
              plan={item}
              history={this.props.history}
              disable={this.props.disablePlan}
              enable={this.props.enablePlan}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default PlanList;
