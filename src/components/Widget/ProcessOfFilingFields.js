import React from 'react';

import { Col, FormGroup, Input, Label, FormText, Row } from 'reactstrap';
import MultiSelect from './MultiSelect';
import * as _ from 'lodash';
import AgeRange from '../InputRange';
import { TextField } from 'components';

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

  const changeFileHandler = (event, id) => {
    let newState = props.data;
    console.log(newState);
    //newState.processFile = event.target.files[0];
    newState[id].value = event.target.value;
    props.change(newState);
  };

  const renderTemplates = data => {
    let formTemplate = '';
    let values = data.settings;

    switch (values.element) {
      case 'file':
        formTemplate = (
          <FormGroup row className="py-0 my-0">
            {showLabel(values.label, values.labelText)}
            <Col sm={7}>
              <Input
                {...values.config}
                value={values.value}
                onChange={event => changeFileHandler(event, data.id)}
              />
              <FormText color="muted">{values.text}</FormText>
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
