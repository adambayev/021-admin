import React from 'react';
import { Col, FormGroup, Label, CustomInput } from 'reactstrap';
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

  const changeFileHandler = (event, id) => {
    let newState = props.data;
    //newState.processFile = event.target.files[0];
    newState[id].value.push(event.target.value);
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
      case 'file':
        formTemplate = props.data.file.value.map((item, i) => {
          return (
            <FormGroup key={i} row className="py-0 my-0">
              {showLabel(values.label, values.labelText)}
              <Col sm={9}>
                <CustomInput
                  type="file"
                  id="exampleCustomFileBrowser"
                  name="customFile"
                  label={values.value[0]}
                  {...values.config}
                  value=""
                  onChange={event => changeFileHandler(event, data.id)}
                />
              </Col>
            </FormGroup>
          );
        });
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
