import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createOrganization } from '../../../../actions/grantActions';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

class CreateOrganization extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      success: false,
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.grant.success) {
      this.setState({ success: true });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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

    this.props.createOrganization(data);
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

CreateOrganization.propTypes = {
  errors: PropTypes.object.isRequired,
};

const mapDispatchToProps = state => ({
  errors: state.errors,
});

export default connect(
  mapDispatchToProps,
  { createOrganization },
)(CreateOrganization);
