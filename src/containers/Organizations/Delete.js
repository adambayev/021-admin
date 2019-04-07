import React, { Component } from 'react';
import axios from 'axios';
import DeleteOrganization from '../../components/Organizations/Delete';
import Loader from '../../components/Widget/Loader';

class DeleteOrganizationContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
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

  componentWillMount() {
    axios.get(`${process.env.REACT_APP_URL}/Organizations`).then(response => {
      let newState = Object.assign({}, this.state);

      let res = response.data.filter(a => a.id === this.props.params.id);

      for (let key in this.state.formData) {
        newState.formData[key].value = res[0][key];
      }
      this.setState(newState);
      this.setState({ isLoading: false });
    });
  }

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

    dataToSubmit.id = this.props.params.id;

    console.log(dataToSubmit);

    axios
      .delete(
        `${process.env.REACT_APP_URL}/organizations/${this.props.params.id}`,
        dataToSubmit,
      )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <DeleteOrganization
            updateForm={newState => this.updateForm(newState)}
            submitForm={event => this.submitForm(event)}
            data={this.state}
            params={this.props.params}
          />
        )}
      </div>
    );
  }
}

export default DeleteOrganizationContainer;
