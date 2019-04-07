import React, { Component } from 'react';
import AddOrganization from '../../components/Organizations/Add';
import axios from 'axios';

class AddOrganizationContainer extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        name: {
          element: 'input',
          value: '',
          label: true,
          labelText: 'Организация',
          config: {
            name: 'name_input',
            type: 'text',
            placeholder: 'Enter your name',
          },
        },
      },
    };
  }

  componentDidMount() {}

  updateForm = newState => {
    this.setState({
      formData: newState.formData,
      grantFormData: newState.grantFormData,
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = {};

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
    }
    console.log(dataToSubmit);

    axios
      .post(`${process.env.REACT_APP_URL}/organizations`, dataToSubmit)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <AddOrganization
        updateForm={newState => this.updateForm(newState)}
        submitForm={event => this.submitForm(event)}
        data={this.state}
      />
    );
  }
}

export default AddOrganizationContainer;
