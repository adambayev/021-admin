import React from 'react';
import GrantFields from '../Widget/GrantFields';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Row,
} from 'reactstrap';

const DeleteGrant = props => {
  return (
    <Row>
      <Col xl={12} lg={12} md={12}>
        <Card>
          <CardHeader>Грант № {props.params.id}</CardHeader>
          <CardBody>
            <Form onSubmit={props.submitForm}>
              <GrantFields
                data={props.data}
                change={newState => props.updateForm(newState)}
                updateGrants={newState => props.updateGrants(newState)}
              />
              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button type="submit">Delete</Button>
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default DeleteGrant;
