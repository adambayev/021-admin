import React, { Component } from 'react';

import Page from 'components/Page';
import FormFields from '../components/Widget/FormFields';

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

class ProgramPage extends Component {
  state = {
    formData: {
      name: {
        element: 'input',
        value: '',
        label: true,
        labelText: 'Name',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name',
        },
      },
      lastname: {
        element: 'input',
        value: '',
        label: true,
        labelText: 'Lastname',
        config: {
          name: 'lastname_input',
          type: 'text',
          placeholder: 'Enter your Lastname',
        },
      },
      message: {
        element: 'textarea',
        value: '',
        label: true,
        labelText: 'Message',
        config: {
          name: 'message_input',
          rows: 4,
          cols: 36,
        },
      },
      age: {
        element: 'select',
        value: '',
        label: true,
        labelText: 'Age',
        config: {
          name: 'age_input',
          options: [
            { val: '1', text: '10-20' },
            { val: '2', text: '20-30' },
            { val: '3', text: '+30' },
          ],
        },
      },
    },
  };

  updateForm = newState => {
    this.setState({
      formData: newState,
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = {};

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
    }

    console.log(dataToSubmit);
  };

  render() {
    return (
      <Page title="Forms" breadcrumbs={[{ name: 'Programs', active: true }]}>
        <Row>
          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Form Grid</CardHeader>
              <CardBody>
                <Form onSubmit={this.submitForm}>
                  <FormFields
                    formData={this.state.formData}
                    change={newState => this.updateForm(newState)}
                  />

                  <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                      <Button type="submit">Submit</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default ProgramPage;
