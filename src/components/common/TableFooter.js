import React from 'react';
import { Button } from 'reactstrap';
import IntlMessages from '../../helpers/IntlMessages';

export default ({ size = 50, page = 1, setPage = () => {}, lastPage = 1 }) => (
  <div className="d-flex">
    <span>
      <IntlMessages id="app.showing_results" />
      {size * page} - {size + size * page}
    </span>
    <div className="flex-fill" />
    <Button onClick={page > 0 && setPage(page - 1)} color="info">
      <i className="icon-arrow-left" />
    </Button>
    <span>
      {page} / {lastPage}
    </span>
    <Button onClick={lastPage < page && setPage(page + 1)} color="info">
      <i className="icon-arrow-right" />
    </Button>
  </div>
);
