import React from 'react';
import { Button } from 'reactstrap';

const LoadingButton = props => (
  <Button
    outline={props.outline}
    onClick={props.onClick}
    disabled={props.disabled}
    color={props.color === 'secondary' && props.loading ? null : props.color}
    size={props.size}
    className={`btn-shadow btn-multiple-state ${props.className} ${
      props.loading ? 'show-spinner' : ''
    }`}
  >
    <span className="spinner d-inline-block">
      <span className="bounce1" />
      <span className="bounce2" />
      <span className="bounce3" />
    </span>
    <span className="label">{props.label}</span>
  </Button>
);

export default LoadingButton;
