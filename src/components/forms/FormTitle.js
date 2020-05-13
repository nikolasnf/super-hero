import React from 'react';
import classNames from 'classnames';

const FormTitle = ({ title, className }) => (
  <div className={classNames('font-weight-bold', className)}>{title}</div>
);

export default FormTitle;
