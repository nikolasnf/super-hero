import React from 'react';

// import { Container } from './styles';

const customSpinner = () => (
  <div className="contaier-spinner">
    <div className="lds-ellipsis">
      <div /> {/* first dot */}
      <div /> {/* second dot */}
      <div /> {/* third dot */}
      <div /> {/* fourth dot */}
    </div>
  </div>
);

export default customSpinner;
