import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import './styles.css';

const selectState = props => {
  const { field, form, label, disabled } = props;
  const { name } = field;
  const { errors, touched } = form;

  const options = [
    { value: 'AC', label: 'AC' },
    { value: 'AL', label: 'AL' },
    { value: 'AP', label: 'AP' },
    { value: 'AM', label: 'AM' },
    { value: 'BA', label: 'BA' },
    { value: 'CE', label: 'CE' },
    { value: 'DF', label: 'DF' },
    { value: 'ES', label: 'ES' },
    { value: 'GO', label: 'GO' },
    { value: 'MA', label: 'MA' },
    { value: 'MT', label: 'MT' },
    { value: 'MS', label: 'MS' },
    { value: 'MG', label: 'MG' },
    { value: 'PA', label: 'PA' },
    { value: 'PB', label: 'PB' },
    { value: 'PR', label: 'PR' },
    { value: 'PE', label: 'PE' },
    { value: 'PI', label: 'PI' },
    { value: 'RJ', label: 'RJ' },
    { value: 'RN', label: 'RN' },
    { value: 'RS', label: 'RS' },
    { value: 'RO', label: 'RO' },
    { value: 'RR', label: 'RR' },
    { value: 'SC', label: 'SC' },
    { value: 'SP', label: 'SP' },
    { value: 'SE', label: 'SE' },
    { value: 'TO', label: 'TO' },
  ];

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

export default selectState;
