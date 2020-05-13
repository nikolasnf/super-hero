import React, { PureComponent } from 'react';
import { Table, Input } from 'reactstrap';
import classNames from 'classnames';
import './styles.css';
import { parseISO, format } from 'date-fns';
import IntlMessages from '../../../../../helpers/IntlMessages';

const handleRead = value => {
  switch (value) {
    case 0:
      return 'Não lido';
    case 1:
      return 'Lido';
    default:
      break;
  }
};
const ListItem = ({ issue, profile, history, onMark, selected }) => (
  <tr>
    <td>{profile.name}</td>
    <td>{profile.user.email}</td>
    <td>{profile.type}</td>
    <td>{issue.issue}</td>
    <td>{format(parseISO(issue.updated_at), 'dd/MM/yyyy')}</td>
    <td>{handleRead(issue.read)}</td>
    <td>
      <i
        className={classNames('simple-icon-magnifier', 'list-icon-button')}
        onClick={() => history.push(`/app/admin/issues/view/${issue.id}`)}
      />
      <Input
        checked={selected.indexOf(issue?.id) !== -1}
        addon
        type="checkbox"
        name="selected"
        onChange={() => onMark(issue?.id)}
      />
    </td>
  </tr>
);

class IssueList extends PureComponent {
  render() {
    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>
              <IntlMessages id="issues.report-name" />
            </th>
            <th>
              <IntlMessages id="issues.report-email" />
            </th>
            <th>
              <IntlMessages id="issues.report-type-user" />
            </th>
            <th>
              <IntlMessages id="issues.report-type-issue" />
            </th>
            <th>
              <IntlMessages id="issues.report-date" />
            </th>
            <th>
              <IntlMessages id="issues.report-read" />
            </th>
            <th>
              <IntlMessages id="issues.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.issues &&
            this.props.issues.map(item => (
              <ListItem
                key={item.id}
                issue={item}
                profile={item.profile}
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

export default IssueList;
