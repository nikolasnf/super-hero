import React from 'react';
import IntlMessages from '../../helpers/IntlMessages';

const BackButtonText = props => (
  <div className="d-flex justify-content-end">
    <a href="#" onClick={() => props?.props.history.goBack()}>
      <IntlMessages id="agency.back" />
    </a>
  </div>
);

export default BackButtonText;
