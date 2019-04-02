import React from 'react';

import { Col, FormGroup, Input, Label, Row } from 'reactstrap';

const AdditionalForm = props => {
  const renderFields = () => {
    const leftFormArray = [];
    const rightFormArray = [];
    const formArray = [];

    for (let elementName in props.formData) {
      if (props.formData[elementName].position == 'left') {
        leftFormArray.push({
          id: elementName,
          settings: props.formData[elementName],
        });
      } else {
        rightFormArray.push({
          id: elementName,
          settings: props.formData[elementName],
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
        <small>{label}</small>
      </Label>
    ) : null;
  };

  const changeHandler = (event, id) => {
    let newState = props.formData;
    newState[id].value = event.target.value;
    props.change(newState, props.dataId);
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
                onChange={event => changeHandler(event, data.id, data.grantId)}
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
      default:
        formTemplate = null;
    }
    return formTemplate;
  };

  return <div>{renderFields()}</div>;
};

export default AdditionalForm;
