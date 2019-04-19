import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createOrganization } from '../../../../actions/programActions';
import FormFields from '../../../common/FormFields/FormFields';
import {
  addOrganizationValue,
  addLogoFile,
} from '../../../../actions/programActions';

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
      success: false,
      errors: {},
      formData: {
        logo: {
          position: 'right',
          element: 'file',
          value: '',
          label: true,
          labelText: 'Лого',
          text: 'Лого организаций',
          config: {
            name: 'logo_input',
            type: 'file',
          },
        },
        name: {
          label: true,
          labelText: 'Название организаций',
          position: 'left',
          element: 'input',
          value: '',
          config: {
            type: 'text',
          },
        },
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.program && nextProps.program.success) {
      this.setState({ success: true });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const newState = this.state.formData;
    console.log(nextProps.organization);
    if (nextProps.organization) {
      for (let key in nextProps.organization) {
        if (newState[key]) {
          newState[key].value = nextProps.organization[key];
        }
      }
    }

    this.setState({
      formData: newState,
    });
  }

  addLogoFile = value => {
    this.props.addLogoFile(value);
  };

  changeHandler = (value, id) => {
    this.props.addOrganizationValue({ id, value });
  };

  changeState = formData => {
    this.setState({ formData });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { organization, logoFile } = this.props;
    const modelData = {
      name: organization.name,
    };

    this.props.createOrganization(logoFile, modelData);
  };

  render() {
    return (
      <Col xl={12} lg={12} md={12}>
        <Card>
          <CardHeader>Добавить организацию</CardHeader>
          <CardBody>
            <Form onSubmit={this.handleSubmit}>
              <FormFields
                columns={2}
                data={this.state.formData}
                change={(value, id) => this.changeHandler(value, id)}
                addFile={value => this.addLogoFile(value)}
                changeState={newState => this.changeState(newState)}
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

const mapStateToProps = state => ({
  organization: state.program.organization,
  logoFile: state.program.logoFile,
});

export default connect(
  mapStateToProps,
  { createOrganization, addOrganizationValue, addLogoFile },
)(CreateOrganization);
