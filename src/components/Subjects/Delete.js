import React from 'react';

import FormFields from '../../components/Widget/FormFields';
import AdditionalForm from '../../components/Widget/AdditionalForm';

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
} from 'reactstrap';

const DeleteSubject = props => {
  return (
    <Row>
      <Col xl={12} lg={12} md={12}>
        <Card>
          <CardHeader>Сфера/дисциплина № {props.params.id}</CardHeader>
          <CardBody>
            <Form onSubmit={props.submitForm}>
              <FormFields
                data={props.data}
                change={newState => props.updateForm(newState)}
                updateGrants={newState => props.updateGrants(newState)}
              />
              <FormGroup check row>
                <Col>
                  <Button className="float-right" type="submit">
                    Submit
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default DeleteSubject;
