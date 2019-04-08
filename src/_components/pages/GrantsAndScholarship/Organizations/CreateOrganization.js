import React, { Component } from 'react';

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

class CreateOrganization extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const data = {
      name: this.state.name,
    };

    console.log('Вот так вот');

    // this.props.loginUser(userData);
  };

  render() {
    return (
      <Col xl={12} lg={12} md={12}>
        <Card>
          <CardHeader>Добавить организацию</CardHeader>
          <CardBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label for="name" sm={3}>
                  Название организации
                </Label>
                <Col sm={9}>
                  <Input
                    name="name"
                    type="text"
                    value={this.state.value}
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
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
    );
  }
}

export default CreateOrganization;
