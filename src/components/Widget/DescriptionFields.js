import React from 'react';

import { Col, FormGroup, Input, Label, FormText, Row } from 'reactstrap';
import MultiSelect from './MultiSelect';
import { TextField } from 'components';
import * as _ from 'lodash';

const FormFields = props => {
  const renderFields = () => {
    const formArray = [];

    for (let elementName in props.data) {
      formArray.push({
        id: elementName,
        settings: props.data[elementName],
      });
    }

    return formArray.map((item, i) => {
      return (
        <div key={i} className="form_element">
          {renderTemplates(item)}
        </div>
      );
    });
  };

  const showLabel = (show, label) => {
    return show ? (
      <Label for="exampleEmail" sm={3}>
        {label}
      </Label>
    ) : null;
  };

  const changeHandler = (event, id) => {
    let newState = props.data;
    newState[id].value = event.target.value;
    props.change(newState);
  };

  const changeTextFieldHandler = (value, id) => {
    let newState = props.data;
    newState[id].value = value;
    props.change(newState);
  };

  const renderTemplates = data => {
    let formTemplate = '';
    let values = data.settings;

    switch (values.element) {
      case 'input':
        formTemplate = (
          <FormGroup row className="py-0 my-0">
            {showLabel(values.label, values.labelText)}
            <Col sm={9}>
              <Input
                {...values.config}
                value={values.value}
                onChange={event => changeHandler(event, data.id)}
              />
            </Col>
          </FormGroup>
        );
        break;
      case 'textarea':
        formTemplate = (
          <FormGroup row className="py-0 my-0">
            {showLabel(values.label, values.labelText)}
            <Col sm={9}>
              <Input
                type="textarea"
                {...values.config}
                value={values.value}
                onChange={event => changeHandler(event, data.id)}
              />
            </Col>
          </FormGroup>
        );
        break;
      case 'textareaWithEditor':
        formTemplate = (
          <FormGroup row className="py-0 my-0">
            {showLabel(values.label, values.labelText)}
            <Col sm={9}>
              <TextField
                values={values}
                withEditor={true}
                onChange={value => changeTextFieldHandler(value, data.id)}
              />
            </Col>
          </FormGroup>
        );
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  };

  return <div>{renderFields()}</div>;
};

export default FormFields;
