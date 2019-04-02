import React, { Component } from 'react';

import axios from 'axios';

import * as _ from 'lodash';
import EditGrantGiver from '../../components/GrantGivers/Edit';
import Loader from '../../components/Widget/Loader';

class EditGrantContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      formData: {
        name: {
          element: 'input',
          value: '',
          label: true,
          labelText: 'Грантодатель',
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
    axios.get(`${process.env.REACT_APP_URL}/GrantGivers`).then(response => {
      let newState = Object.assign({}, this.state);

      let res = response.data.filter(a => a.id == this.props.params.id);

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
      .put(
        `${process.env.REACT_APP_URL}/GrantGivers/${this.props.params.id}`,
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
          <EditGrantGiver
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

export default EditGrantContainer;
