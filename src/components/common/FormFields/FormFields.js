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
import TextEditor from '../../common/TextEditor';
import Selector from '../../common/Selector';
import AgeRange from '../../common/InputRange';
import { Link } from 'react-router-dom';

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

  const renderDoubleFields = () => {
    const leftFormArray = [];
    const rightFormArray = [];
    const formArray = [];

    for (let elementName in props.data) {
      if (props.data[elementName].position === 'left') {
        leftFormArray.push({
          id: elementName,
          settings: props.data[elementName],
        });
      } else {
        rightFormArray.push({
          id: elementName,
          settings: props.data[elementName],
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
    const { labelSm } = props;
    return show ? (
      <Label for="exampleEmail" sm={labelSm}>
        {label}
      </Label>
    ) : null;
  };

  const changeHandler = (event, id) => {
    props.change(event.target.value, id);
  };

  const optionClicked = (optionsList, id) => {
    let selectedOptions = [];
    let idIndex = id === 'subjects' ? 'subjectId' : 'locationId';

    optionsList.map(item => {
      return selectedOptions.push({ [idIndex]: item.id });
    });
    return props.change(selectedOptions, id);
  };

  const changeFileHandler = event => {
    const file = event.target.files[0];
    props.addFile(file);
  };

  const switchHandler = (event, id) => {
    let newState = props.data;
    if (event.target.checked) {
      newState.deadlineStarts.config.disabled = true;
      newState.deadlineEnds.config.disabled = true;
    } else {
      newState.deadlineStarts.config.disabled = false;
      newState.deadlineEnds.config.disabled = false;
    }
    props.changeState(newState);
    props.change(event.target.checked, id);
  };

  const ageSwitchHandler = (event, id) => {
    let newState = props.data;
    event.target.checked
      ? (newState[id].config.disabled = true)
      : (newState[id].config.disabled = false);
    props.changeState(newState);
    props.change(event.target.checked, id);
  };

  const rangeHandler = value => {
    props.change(value.min, 'requiredAgeFrom');
    props.change(value.max, 'requiredAgeTo');
  };

  const changeTextFieldHandler = (value, id) => {
    props.change(value, id);
  };

  const renderTemplates = data => {
    let formTemplate = '';
    let values = data.settings;
    const { inputSm } = props;

    switch (values.element) {
      case 'input':
        formTemplate = (
          <FormGroup row className="py-0 my-0">
            {showLabel(values.label, values.labelText)}
            <Col sm={inputSm}>
              <Input
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
            <Col sm={inputSm}>
              <TextEditor
                values={values}
                withEditor={true}
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
            <Col sm={inputSm}>
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
            <Col sm={inputSm}>
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
        const { options } = props.data[data.id].config;
        formTemplate = (
          <FormGroup row className="py-0 my-0">
            {showLabel(values.label, values.labelText)}
            <Col sm={inputSm}>
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
            <Col sm={inputSm}>
              <Input
                {...values.config}
                value={values.value}
                onChange={event => {
                  changeFileHandler(event);
                  changeHandler(event, data.id);
                }}
              />
              <FormText color="muted">{values.text}</FormText>
            </Col>
          </FormGroup>
        );
        break;
      case 'multipleFile':
        formTemplate = (
          <FormGroup row className="py-0 my-0">
            {showLabel(values.label, values.labelText)}
            <Col sm={9}>
              <CustomInput
                type="file"
                id="exampleCustomFileBrowser"
                name="customFile"
                label={values.value[0]}
                {...values.config}
                // value=""
                // onChange={event => changeFileHandler(event, data.id)}
              />
            </Col>
          </FormGroup>
        );
        break;
      case 'switch':
        formTemplate = (
          <FormGroup row className="py-0 my-0">
            {showLabel(values.label, values.labelText)}
            <Col sm={inputSm} style={{ paddingTop: 7 }}>
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
      case 'inputrange':
        formTemplate = (
          <FormGroup row className="py-0 my-0">
            {showLabel(values.label, values.labelText)}
            <Col sm={3} style={{ paddingTop: 7 }}>
              <FormGroup check inline>
                <CustomInput
                  type="switch"
                  id={`${values.config.name}-${props.elementId}`}
                  checked={values.value.unlimited}
                  label="Без ограничений"
                  onChange={event => ageSwitchHandler(event, data.id)}
                />
              </FormGroup>
            </Col>
            <Col sm={6} style={{ paddingTop: 13 }}>
              <AgeRange
                disabled={values.config.disabled}
                value={{
                  min: props.data.requiredAgeFrom.value,
                  max: props.data.requiredAgeTo.value,
                }}
                minOption={values.config.minOption}
                maxOption={values.config.maxOption}
                changedValue={value => rangeHandler(value, data.id)}
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

  return (
    <div>{props.columns === 1 ? renderFields() : renderDoubleFields()}</div>
  );
};

FormFields.defaultProps = {
  type: 'text',
  labelSm: 5,
  inputSm: 7,
};

export default FormFields;
