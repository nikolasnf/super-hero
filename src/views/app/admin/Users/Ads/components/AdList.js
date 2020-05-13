import React, { PureComponent } from 'react';
import { Table } from 'reactstrap';
import classNames from 'classnames';
import './styles.css';
import { connect } from 'react-redux';
import IntlMessages from '../../../../../../helpers/IntlMessages';
import {
  disableUserAd,
  enableUserAd,
} from '../../../../../../redux/user/actions';

const ListItem = ({ ad, history, disableUserAd, enableUserAd }) => (
  <tr className={ad.status !== 'active' && 'inactive'}>
    <td>{ad.id}</td>
    <td>{`${ad?.address?.street}, ${ad?.address?.number} - ${ad?.address?.district}`}</td>
    <td>{ad.address.city}</td>
    <td>{ad.address.state}</td>
    <td>
      {ad.status === 'active' ? (
        <IntlMessages id="agency.active" />
      ) : (
        <IntlMessages id="agency.inactive" />
      )}
    </td>
    <td>
      <i
        className={classNames('simple-icon-magnifier', 'list-icon-button')}
        onClick={() => history.push(`/app/admin/users/ad-info/${ad.id}`)}
      />
      {ad.status === 'active' ? (
        <i
          className={classNames('simple-icon-ban', 'list-icon-button')}
          onClick={() => disableUserAd(ad.id)}
        />
      ) : (
        <i
          className={classNames('simple-icon-check', 'list-icon-button')}
          onClick={() => enableUserAd(ad.id)}
        />
      )}
    </td>
  </tr>
);

class AdList extends PureComponent {
  render() {
    console.log(this.props.ads);
    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>
              <IntlMessages id="agency.address" />
            </th>
            <th>
              <IntlMessages id="agency.city" />
            </th>
            <th>
              <IntlMessages id="agency.uf" />
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
          {this.props.ads.map(item => (
            <ListItem
              ad={item}
              history={this.props.history}
              disableUserAd={this.props.disableUserAd}
              enableUserAd={this.props.enableUserAd}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

const mapActionsToProps = {
  disableUserAd,
  enableUserAd,
};

export default connect(null, mapActionsToProps)(AdList);
