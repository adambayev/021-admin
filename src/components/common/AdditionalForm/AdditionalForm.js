import React from 'react';
import * as _ from 'lodash';
import {
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Form,
  CustomInput,
} from 'reactstrap';
import InputWithDropdown from '../../common/InputWithDropdown';

const AdditionalForm = props => {
  const renderFields = () => {
    const leftFormArray = [];
    const rightFormArray = [];
    const formArray = [];

    for (let elementName in props.formData) {
      if (props.formData[elementName].position === 'left') {
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

    calculateGrantSum();
    calculateTotalFund();
    updateCurrency();
    updateGrantPercent();
  };

  const calculateGrantSum = () => {
    let newState = props.formData;

    let duration = _.cloneDeep(newState['duration'].value);

    if (duration.currency === 'месяцы') {
      duration.amount = duration.amount / 12;
    }

    if (
      newState['duration'].value.amount !== 0 &&
      newState['amount'].value !== 0 &&
      newState['totalCost'].value.amount !== 0 &&
      newState['grantPercent'].value.amount !== 0 &&
      newState['scholarship'].value.amount !== 0
    ) {
      const calculatedScholarship = +newState['scholarship'].value.amount * 12;
      const percentGrant =
        (+newState['grantPercent'].value.amount / 100) *
        +newState['totalCost'].value.amount;

      if (newState['grantPercent'].value.isPercentage) {
        newState['grantSum'].value =
          +duration.amount * (percentGrant + calculatedScholarship);
      } else {
        newState['grantSum'].value =
          +duration.amount *
          (calculatedScholarship + +newState['grantPercent'].value.amount);
      }
    } else {
      newState['grantSum'].value = '';
    }

    props.change(newState, props.dataId);
  };

  const calculateTotalFund = () => {
    let newState = props.formData;

    if (
      newState['duration'].value.amount !== 0 &&
      newState['amount'].value !== 0 &&
      newState['totalCost'].value.amount !== 0 &&
      newState['grantPercent'].value.amount !== 0 &&
      newState['scholarship'].value.amount !== 0 &&
      newState['amount'].value !== 0 &&
      newState['grantSum'].value !== 0
    ) {
      newState['totalFund'].value =
        +newState['grantSum'].value * +newState['amount'].value;
    } else {
      newState['totalFund'].value = '';
    }
    props.change(newState, props.dataId);
  };

  const updateCurrency = () => {
    let newState = props.formData;
    const totalCostCurrency = newState['totalCost'].value.currency;
    newState['scholarship'].value.currency = totalCostCurrency;
    if (!newState['grantPercent'].value.isPercentage) {
      newState['grantPercent'].value.currency = totalCostCurrency;
    }
    props.change(newState, props.dataId);
  };

  const updateGrantPercent = () => {
    let newState = props.formData;
    if (+newState['grantType'].value === 0) {
      newState['grantPercent'].config.disabled = true;
      if (newState['grantPercent'].value.isPercentage) {
        newState['grantPercent'].value.amount = 100;
      } else {
        newState['grantPercent'].value.amount =
          newState['totalCost'].value.amount;
      }
    } else {
      newState['grantPercent'].config.disabled = false;
    }
  };

  const dropdownHandler = (value, id) => {
    let newState = props.formData;
    newState[id].value.currency = value;
    props.change(newState, props.dataId);
    calculateGrantSum();
    calculateTotalFund();
    updateCurrency();
    updateGrantPercent();
  };

  const dropdownInput = (event, id) => {
    let newState = props.formData;
    newState[id].value.amount = event.target.value;
    props.change(newState, props.dataId);
    calculateGrantSum();
    calculateTotalFund();
    updateCurrency();
    updateGrantPercent();
  };

  const inputRadioHandler = (event, id) => {
    let newState = props.formData;
    newState[id].value.amount = event.target.value;
    props.change(newState, props.dataId);
    calculateGrantSum();
    calculateTotalFund();
    updateCurrency();
    updateGrantPercent();
  };

  const switchHandler = (event, id) => {
    let newState = props.formData;
    newState[id].value = event.target.checked;
    if (id === 'isDeadline') {
      if (event.target.checked) {
        newState.deadlineStarts.config.disabled = true;
        newState.deadlineEnds.config.disabled = true;
      } else {
        newState.deadlineStarts.config.disabled = false;
        newState.deadlineEnds.config.disabled = false;
      }
    }
    props.change(newState, props.dataId);
  };

  const radioChangeHandler = (event, id, choice) => {
    let newState = props.formData;
    newState[id].value.isPercentage = choice;
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
      case 'dropdowninput':
        formTemplate = (
          <FormGroup row className="py-0 my-0">
            {showLabel(values.label, values.labelText)}
            <Col sm={7}>
              <InputWithDropdown
                value={values.value}
                optionHeader={values.config.header}
                options={values.config.options}
                clickedItem={value => dropdownHandler(value, data.id)}
                changedValue={value => dropdownInput(value, data.id)}
                dropdownDisabled={values.config.dropdownDisabled}
              />
            </Col>
          </FormGroup>
        );
        break;
      case 'inputwithradio':
        formTemplate = (
          <FormGroup row className="py-0 my-0">
            {showLabel(values.label, values.labelText)}
            <Col sm={7}>
              <Form>
                <FormGroup check inline>
                  <CustomInput
                    type="radio"
                    id={`percentRadio-${props.elementId}`}
                    name="customRadio"
                    label="Процент"
                    checked={values.value.isPercentage}
                    onChange={event => {
                      radioChangeHandler(event, data.id, true);
                      dropdownHandler('%', data.id);
                    }}
                  />
                </FormGroup>
                <FormGroup check inline>
                  <CustomInput
                    type="radio"
                    id={`sumRadio-${props.elementId}`}
                    name="customRadio"
                    label="Сумма"
                    checked={!values.value.isPercentage}
                    onChange={event => {
                      radioChangeHandler(event, data.id, false);
                      dropdownHandler('KZT', data.id);
                    }}
                  />
                </FormGroup>
              </Form>
              <InputWithDropdown
                value={values.value}
                optionHeader={values.value.isPercentage ? ['%'] : ['KZT']}
                options={values.value.isPercentage ? ['%'] : ['KZT']}
                changedValue={value => inputRadioHandler(value, data.id)}
                clickedItem={value => dropdownHandler(value, data.id)}
                dropdownDisabled={values.config.dropdownDisabled}
                disabled={values.config.disabled}
              />
            </Col>
          </FormGroup>
        );
        break;
      case 'switch':
        formTemplate = (
          <FormGroup row className="py-0 my-0">
            {showLabel(values.label, values.labelText)}
            <Col sm={7} style={{ paddingTop: 7 }}>
              <FormGroup check inline>
                <CustomInput
                  type="switch"
                  id={`${values.config.name}-${props.elementId}`}
                  checked={values.value}
                  label={values.config.switchLabel}
                  onChange={event =>
                    switchHandler(event, data.id, data.grantId)
                  }
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

export default AdditionalForm;
