import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createOrganization } from '../../../../actions/programActions';
import TextFieldGroup from '../../../common/TextFieldGroup';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
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
    if (nextProps.program && nextProps.program.success) {
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

    this.props.createOrganization(data);
  };

  render() {
    return (
      <Col xl={12} lg={12} md={12}>
        <Card>
          <CardHeader>Добавить организацию</CardHeader>
          <CardBody>
            <Form onSubmit={this.handleSubmit}>
              <TextFieldGroup
                label="Название организации"
                name="name"
                value={this.state.value}
                onChange={this.onChange}
                labelSm={5}
                inputSm={7}
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
