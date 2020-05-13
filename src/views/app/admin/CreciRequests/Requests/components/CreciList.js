import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import classNames from 'classnames';
import './styles.css';
import IntlMessages from '../../../../../../helpers/IntlMessages';
import ModalExample from '../../../../../../components/Modal';

const ListItem = ({ request, history, creciReprove, creciApprove }) => {
  const renderStatus = () => {
    if (request?.status === 'pending') {
      return <IntlMessages id="creci.pending" />;
    }
    if (request?.status === 'accepted') {
      return <IntlMessages id="creci.accepted" />;
    }
    if (request?.status === 'revoked') {
      return <IntlMessages id="creci.revoked" />;
    }
    return '';
  };

  return (
    <tr>
      <td>{request?.id}</td>
      <td>{renderStatus()}</td>
      <td>{request?.creci}</td>
      <td>{request?.agent?.profile?.name}</td>
      <td>
        <div>
          <i
            className={classNames('simple-icon-magnifier', 'list-icon-button')}
            onClick={() =>
              history.push(`/app/admin/creci-requests/info/${request.id}`)
            }
          />
          {request?.status === 'pending' && (
            <>
              <i
                className={classNames('simple-icon-check', 'list-icon-button')}
                onClick={() => creciApprove(request.id)}
              />
              <i
                className={classNames('simple-icon-ban', 'list-icon-button')}
                onClick={() => creciReprove(request.id)}
              />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

class CreciList extends PureComponent {
  render() {
    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>
              <IntlMessages id="creci.id" />
            </th>
            <th>
              <IntlMessages id="creci.status" />
            </th>
            <th>
              <IntlMessages id="creci.creci" />
            </th>
            <th>
              <IntlMessages id="creci.agent-name" />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.requests.length &&
            this.props.requests.map(item => (
              <ListItem
                request={item}
                history={this.props.history}
                creciReprove={this.props.creciReprove}
                creciApprove={this.props.creciApprove}
              />
            ))}
        </tbody>
      </Table>
    );
  }
}

export default CreciList;
