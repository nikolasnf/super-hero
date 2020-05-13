import React from 'react';
import {
  FormGroup,
  Label,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import InputMask from 'react-input-mask';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const FormikInput = ({
  field,
  form,
  label,
  mask,
  type,
  disabled,
  prependAddon,
  appendAddon,
  value,
  children,
  onChange,
  currency,
}) => {
  const { name } = field;
  const { errors, touched } = form;

  const renderInput = () => {
    if (currency) {
      const currencyMask = createNumberMask({
        prefix: '',
        suffix: '',
        thousandsSeparatorSymbol: '.',
        decimalSymbol: ',',
        allowDecimal: true,
        requireDecimal: false,
      });

      return (
        <MaskedInput
          {...field}
          mask={currencyMask}
          className="flex-fill"
          maskchar=""
          onChange={onChange || form.handleChange(name)}
          type={type}
          tag={MaskedInput}
          value={value || field.value}
          invalid={Boolean(errors[name] && touched[name])}
          disabled={disabled}
        >
          {children}
        </MaskedInput>
      );
    }
    if (mask) {
      return (
        <Input
          {...field}
          mask={mask}
          maskchar=""
          onChange={onChange || form.handleChange(name)}
          type={type}
          className="flex-fill"
          tag={InputMask}
          value={value || field.value}
          invalid={Boolean(errors[name] && touched[name])}
          disabled={disabled}
        >
          {children}
        </Input>
      );
    }
    return (
      <Input
        {...field}
        type={type}
        className="flex-fill"
        value={value || field.value}
        onChange={onChange || form.handleChange(name)}
        invalid={Boolean(errors[name] && touched[name])}
        disabled={disabled}
      >
        {children}
      </Input>
    );
  };

  return (
    <FormGroup className="has-float-label form-group">
      <div className="d-flex flex-column">
        <div>
          {prependAddon && (
            <InputGroupAddon addonType="prepend">
              <InputGroupText>{prependAddon}</InputGroupText>
            </InputGroupAddon>
          )}
          <Label>{label}</Label>
          {renderInput()}
          <FormFeedback className="mt-2">{errors[name]}</FormFeedback>
          {appendAddon && (
            <InputGroupAddon addonType="prepend">
              <InputGroupText>{appendAddon}</InputGroupText>
            </InputGroupAddon>
          )}
        </div>
      </div>
    </FormGroup>
  );
};

export default FormikInput;
