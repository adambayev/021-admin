import React from 'react';

import { Col, FormGroup, Input, Label, FormText } from 'reactstrap';
import { TextField } from 'components';
import MultiSelect from './MultiSelect';
import * as _ from 'lodash';

const FormFields = props => {
  const renderFields = () => {
    const formArray = [];

    for (let elementName in props.data.formData) {
      formArray.push({
        id: elementName,
        settings: props.data.formData[elementName],
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
      <Label for="exampleEmail" sm={5}>
        {label}
      </Label>
    ) : null;
  };

  const changeHandler = (event, id) => {
    let newState = props.data;
    newState.formData[id].value = event.target.value;
    props.change(newState);
  };

  const changeTextFieldHandler = (value, id) => {
    let newState = props.data;
    newState.formData[id].value = value;
    props.change(newState);
  };

  const checkboxHandler = (event, id, item) => {
    const newState = props.data;

    event.target.checked ? (item.value = true) : (item.value = false);

    newState.formData[id].value.map((el, i) => {
      return (
        el.id === item.id ? (newState.formData[id].value[i] = item) : null,
        item.value
          ? (newState.grantFormData[item.id].show = true)
          : (newState.grantFormData[item.id].show = false)
      );
    });

    props.change(newState);
  };

  const optionClicked = (optionsList, id) => {
    let newState = props.data;
    let options = _.cloneDeep(optionsList);
    newState.formData[id].value = _.cloneDeep(options);
    props.change(newState);
  };
  const selectedBadgeClicked = (optionsList, id) => {
    let newState = props.data;
    let options = _.cloneDeep(optionsList);
    newState.formData[id].value = _.cloneDeep(options);
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
            <Col sm={7}>
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
            <Col sm={7}>
              <TextField
                values={values}
                onChange={value => changeTextFieldHandler(value, data.id)}
              />
            </Col>
          </FormGroup>
        );
        break;
      case 'select':
        formTemplate = (
          <FormGroup row className="py-0 my-0">
            {showLabel(values.label, values.labelText)}
            <Col sm={7}>
              <Input
                type="select"
                value={values.value}
                name={values.config.name}
                onChange={event => changeHandler(event, data.id)}
              >
                <option value="">Please select</option>
                {values.config.options.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Input>
            </Col>
          </FormGroup>
        );
        break;
      case 'multipleselect':
        formTemplate = (
          <FormGroup row className="py-0 my-0">
            {showLabel(values.label, values.labelText)}
            <Col sm={7}>
              <MultiSelect
                options={values.value}
                optionClicked={optionsList =>
                  optionClicked(optionsList, data.id)
                }
                selectedBadgeClicked={optionsList =>
                  selectedBadgeClicked(optionsList, data.id)
                }
              />

              {/* <FormText>{values.value}</FormText> */}
            </Col>
          </FormGroup>
        );
        break;
      case 'file':
        formTemplate = (
          <FormGroup row className="py-0 my-0">
            {showLabel(values.label, values.labelText)}
            <Col sm={7}>
              <Input
                {...values.config}
                value={values.value}
                onChange={event => changeHandler(event, data.id)}
              />
              <FormText color="muted">{values.text}</FormText>
            </Col>
          </FormGroup>
        );
        break;
      case 'checkbox':
        formTemplate = (
          <div>
            {props.data.formData.programCategories.value.map((item, i) => {
              return (
                <FormGroup check inline key={i}>
                  <Label check>
                    <Input
                      id={item.id}
                      type="checkbox"
                      value={item.value}
                      onChange={event => checkboxHandler(event, data.id, item)}
                    />{' '}
                    {item.labelText}
                  </Label>
                </FormGroup>
              );
            })}
          </div>
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
