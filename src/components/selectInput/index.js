import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import './styles.css';

const selectInput = props => {
  const { field, form, label, disabled, options } = props;
  const { name } = field;
  const { errors, touched } = form;

  return (
    <FormGroup className="has-float-label">
      <Label>{label}</Label>
      <Input
        {...field}
        type="select"
        className="selectInput"
        invalid={Boolean(errors[name] && touched[name])}
        disabled={disabled}
      >
        <option value="">Selecione</option>
        {options.map(value => (
          <option value={value.value} key={value.value}>
            {value.label}
          </option>
        ))}
      </Input>
      <FormFeedback className="mt-1">{errors[name]}</FormFeedback>
    </FormGroup>
  );
};

export default selectInput;
