import React from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, Input, Label } from 'reactstrap';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  labelSm,
  inputSm,
}) => {
  return (
    <div>
      <FormGroup row className="py-0 my-0">
        <Label for={name} sm={labelSm}>
          {label}
        </Label>
        <Col sm={inputSm}>
          <Input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
          {info && <small className="form-text text-muted">{info}</small>}
          {error && <div className="invalid-feedback">{error}</div>}
        </Col>
      </FormGroup>
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
};

TextFieldGroup.defaultProps = {
  type: 'text',
  labelSm: 4,
  inputSm: 8,
};

export default TextFieldGroup;
