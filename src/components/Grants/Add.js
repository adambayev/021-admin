import React from 'react';

import GrantFields from '../../components/Widget/GrantFields';
import RequirementsFields from '../../components/Widget/RequirementsFields';
import DescriptionFields from '../../components/Widget/DescriptionFields';
import ProcessOfFilingFields from '../../components/Widget/ProcessOfFilingFields';
import * as _ from 'lodash';
import Tabs from '../../components/Tabs/Tabs';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Row,
  Label,
  Input,
  Collapse,
  Alert,
} from 'reactstrap';

import { MdKeyboardArrowDown } from 'react-icons/md';

const AddGrant = props => {
  const handleHeaderClick = name => {
    props.handleClick(name);
  };

  const checkboxHandler = (event, dataId) => {
    let newState = props.data;
    newState.grantDetails.options.map((item, i) => {
      return item.id === dataId
        ? (newState.grantDetails.options[i].checked = event.target.checked)
        : null;
    });

    props.data.grantDetails.options.map(item => {
      const newItem = props.data.grantFormData[0];
      newItem.programCategoryId.value = dataId;
      if (item.checked && item.id === dataId) {
        return newState.grantDetails.value.push(_.cloneDeep(newItem));
      }
      return null;
    });

    props.updateDetails(newState);
    console.log(newState.grantDetails.value);
  };

  const onDublicate = dataId => {
    console.log(dataId);

    let newState = props.data;

    props.data.grantDetails.value
      .filter(data => data.programCategoryId.value === dataId)
      .map((item, i) => {
        if (i === 0) {
          const newItem = _.cloneDeep(item);
          return newState.grantDetails.value.push(_.cloneDeep(newItem));
        }
        return null;
      });

    props.updateDetails(newState);
  };

  const headerStyle = {
    padding: 0,
    transform: props.data.isOpenMain ? 'rotate(0deg)' : 'rotate(-90deg)',
    transitionDuration: '0.3s',
    transitionProperty: 'transform',
  };

  return (
    <Row>
      <Col xl={12} lg={12} md={12}>
        <Card>
          <CardHeader onClick={event => handleHeaderClick('Main')}>
            Общая информация
            <MdKeyboardArrowDown style={headerStyle} />
          </CardHeader>
          <Collapse isOpen={props.data.isOpenMain}>
            <CardBody>
              <Form onSubmit={props.submitForm}>
                <GrantFields
                  data={props.data}
                  change={newState => props.updateForm(newState)}
                  updateGrants={newState => props.updateGrants(newState)}
                />
              </Form>
            </CardBody>
          </Collapse>
        </Card>
      </Col>

      <Col xl={12} lg={12} md={12}>
        <Card>
          <CardHeader onClick={event => handleHeaderClick('Descriptions')}>
            Описание
            <MdKeyboardArrowDown style={headerStyle} />
          </CardHeader>
          <Collapse isOpen={props.data.isOpenDescriptions}>
            <CardBody>
              <Form onSubmit={props.submitForm}>
                <DescriptionFields
                  data={props.data.descriptionData}
                  change={newState => props.updateDescription(newState)}
                />
              </Form>
            </CardBody>
          </Collapse>
        </Card>
      </Col>

      <Col xl={12} lg={12} md={12}>
        <Card>
          <CardHeader onClick={event => handleHeaderClick('Requirements')}>
            Требования
            <MdKeyboardArrowDown style={headerStyle} />
          </CardHeader>
          <Collapse isOpen={props.data.isOpenRequirements}>
            <CardBody>
              <Form onSubmit={props.submitForm}>
                <RequirementsFields
                  data={props.data.requirementsData}
                  change={newState => props.updateRequirements(newState)}
                />
              </Form>
            </CardBody>
          </Collapse>
        </Card>
      </Col>

      <Col xl={12} lg={12} md={12}>
        <Card>
          <CardHeader onClick={event => handleHeaderClick('ProcessOfFiling')}>
            Процесс подачи стипендии
            <MdKeyboardArrowDown style={headerStyle} />
          </CardHeader>
          <Collapse isOpen={props.data.isOpenProcessOfFiling}>
            <CardBody>
              <Form onSubmit={props.submitForm}>
                <ProcessOfFilingFields
                  data={props.data.processData}
                  change={newState => props.updateProcess(newState)}
                />
              </Form>
            </CardBody>
          </Collapse>
        </Card>
      </Col>

      <Col xl={12} lg={12} md={12}>
        <Card>
          <CardHeader onClick={event => handleHeaderClick('Details')}>
            Вид программы и стоимость гранта
            <MdKeyboardArrowDown style={headerStyle} />
          </CardHeader>
          <Collapse isOpen={props.data.isOpenDetails}>
            <CardBody>
              <Form>
                {props.data.grantDetails.options.map(item => (
                  <FormGroup check inline key={item.id}>
                    <Label check>
                      <Input
                        id={item.id}
                        type="checkbox"
                        onChange={event => checkboxHandler(event, item.id)}
                      />{' '}
                      {item.name}
                    </Label>
                  </FormGroup>
                ))}
              </Form>
            </CardBody>
            <Col xl={12} lg={12} md={12}>
              {props.data.grantDetails.options.map((item, i) => {
                if (item.checked) {
                  return (
                    <Row key={item.id}>
                      <Col xl={12} lg={12} md={12}>
                        <Card>
                          <Tabs
                            item={item}
                            formData={props.data.grantDetails}
                            itemId={i}
                            dataId={item.id}
                            change={(newState, dataId) =>
                              props.updateGrantsForm(newState, dataId)
                            }
                            onDublicate={dataId => onDublicate(dataId)}
                          />
                        </Card>
                      </Col>
                    </Row>
                  );
                }
                return null;
              })}
            </Col>
          </Collapse>
        </Card>
      </Col>

      <Col xl={12} lg={12} md={12}>
        <Card>
          <CardBody>
            <Button color="secondary" onClick={props.submitForm}>
              Submit
            </Button>
          </CardBody>
          {props.error && (
            <CardBody>
              <Alert color="secondary">{props.error}</Alert>
            </CardBody>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default AddGrant;
