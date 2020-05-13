import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const FormInfo = ({ label, input, ...props }) => {
  return (
    <FormGroup disabled className="has-float-label">
      <Label>{label}</Label>
      <Input {...props} disabled />
    </FormGroup>
  );
};

export default FormInfo;
