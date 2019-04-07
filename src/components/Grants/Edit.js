import React from 'react';

import GrantFields from '../../components/Widget/GrantFields';
import AdditionalForm from '../../components/Widget/AdditionalForm';
import RequirementsFields from '../../components/Widget/RequirementsFields';
import DescriptionFields from '../../components/Widget/DescriptionFields';
import * as _ from 'lodash';

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
} from 'reactstrap';

import { MdKeyboardArrowDown } from 'react-icons/md';

const EditGrant = props => {
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
      if (item.checked && item.id === dataId) {
        return newState.grantDetails.value.push(
          _.cloneDeep(props.data.grantFormData[0]),
        );
      }
      return null;
    });

    props.updateDetails(newState);
    console.log(newState.grantDetails.value);
  };

  return (
    <Row>
      <Col xl={12} lg={12} md={12}>
        <Card>
          <CardHeader onClick={event => handleHeaderClick('Main')}>
            Общая информация ({props.params.id})
            <MdKeyboardArrowDown
              style={{
                padding: 0,
                transform: props.data.isOpenMain
                  ? 'rotate(0deg)'
                  : 'rotate(-90deg)',
                transitionDuration: '0.3s',
                transitionProperty: 'transform',
              }}
            />
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
            <MdKeyboardArrowDown
              style={{
                padding: 0,
                transform: props.data.isOpenDescriptions
                  ? 'rotate(0deg)'
                  : 'rotate(-90deg)',
                transitionDuration: '0.3s',
                transitionProperty: 'transform',
              }}
            />
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
            <MdKeyboardArrowDown
              style={{
                padding: 0,
                transform: props.data.isOpenRequirements
                  ? 'rotate(0deg)'
                  : 'rotate(-90deg)',
                transitionDuration: '0.3s',
                transitionProperty: 'transform',
              }}
            />
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
          <CardHeader onClick={event => handleHeaderClick('Details')}>
            Вид программы
            <MdKeyboardArrowDown
              style={{
                padding: 0,
                transform: props.data.isOpenDetails
                  ? 'rotate(0deg)'
                  : 'rotate(-90deg)',
                transitionDuration: '0.3s',
                transitionProperty: 'transform',
              }}
            />
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
              <Card>
                {props.data.grantDetails.options.map((item, i) => {
                  if (item.checked) {
                    return (
                      <Row key={item.id}>
                        <Col xl={12} lg={12} md={12}>
                          <Card>
                            <CardHeader>{item.name}</CardHeader>

                            <CardBody>
                              <AdditionalForm
                                formData={props.data.grantDetails.value[i]}
                                dataId={item.id}
                                change={(newState, dataId) =>
                                  props.updateGrantsForm(newState, dataId)
                                }
                              />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    );
                  }
                  return null;
                })}
              </Card>
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
        </Card>
      </Col>
    </Row>
  );
};

export default EditGrant;
