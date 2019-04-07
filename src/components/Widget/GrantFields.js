import React from 'react';

import {
  Col,
  FormGroup,
  Input,
  Label,
  FormText,
  Row,
  CustomInput,
} from 'reactstrap';
import { TextField } from 'components';
import Selector from './Selector';
import { Link } from 'react-router-dom';
import * as _ from 'lodash';

const FormFields = props => {
  const renderFields = () => {
    const leftFormArray = [];
    const rightFormArray = [];
    const formArray = [];

    for (let elementName in props.data.formData) {
      if (props.data.formData[elementName].position === 'left') {
        leftFormArray.push({
          id: elementName,
          settings: props.data.formData[elementName],
        });
      } else {
        rightFormArray.push({
          id: elementName,
          settings: props.data.formData[elementName],
        });
      }
    }

    for (let i = 0; i < leftFormArray.length; i++) {
      formArray.push({ left: leftFormArray[i], right: rightFormArray[i] });
    }

    return formArray.map((item, i) => {
      return (
        <div key={i} className="form_element">
          <Row>
            <Col className="py-0 my-0" sm={6}>
              {renderTemplates(item.left)}
            </Col>
            {item.right && (
              <Col className="py-0 my-0" sm={6}>
                {renderTemplates(item.right)}
              </Col>
            )}
          </Row>
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

  const switchHandler = (event, id) => {
    let newState = props.data;
    newState.formData[id].value = event.target.checked;
    if (event.target.checked) {
      newState.formData.deadlineStarts.config.disabled = true;
      newState.formData.deadlineEnds.config.disabled = true;
    } else {
      newState.formData.deadlineStarts.config.disabled = false;
      newState.formData.deadlineEnds.config.disabled = false;
    }
    props.change(newState);
  };

  const changeTextFieldHandler = (value, id) => {
    let newState = props.data;
    newState.formData[id].value = value;
    props.change(newState);
  };

  const changeFileHandler = (event, id) => {
    let newState = props.data;
    newState.file = event.target.files[0];
    newState.formData[id].value = event.target.value;
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
    if (id === 'grantDetails') {
      options.map(item => {
        if (item.value) {
          return (newState.formData[id].value[item.id].data = _.cloneDeep(
            props.data.grantFormData[0],
          ));
        }
        return null;
      });
    }
    return props.change(newState);
  };

  // const selectedBadgeClicked = (optionsList, id) => {
  //   let newState = props.data;
  //   let options = _.cloneDeep(optionsList);
  //   newState.formData[id].value = _.cloneDeep(options);
  //   if (id === 'grantDetails') {
  //     options.map(item => {
  //       if (item.value) {
  //         return newState.grantFormData.push(
  //           _.cloneDeep(props.data.grantFormData[0]),
  //         );
  //       }
  //       return null;
  //     });
  //   }
  //   props.change(newState);
  // };

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
      case 'selectwithlink':
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
              <Link className="float-right" to={`/organizations/add`}>
                <small>Добавить организацию</small>
              </Link>
            </Col>
          </FormGroup>
        );
        break;
      case 'multipleselect': {
        const { options } = props.data.formData[data.id].config;
        formTemplate = (
          <FormGroup row className="py-0 my-0">
            {showLabel(values.label, values.labelText)}
            <Col sm={7}>
              <Selector
                options={options}
                optionClicked={optionsList => {
                  optionClicked(optionsList, data.id);
                }}
              />
            </Col>
          </FormGroup>
        );
        break;
      }
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
      case 'switch':
        formTemplate = (
          <FormGroup row className="py-0 my-0">
            {showLabel(values.label, values.labelText)}
            <Col sm={7} style={{ paddingTop: 7 }}>
              <FormGroup check inline>
                <CustomInput
                  {...values.config}
                  type="switch"
                  id="exampleCustomCheckbox"
                  checked={values.value}
                  onChange={event => switchHandler(event, data.id)}
                />
              </FormGroup>
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
