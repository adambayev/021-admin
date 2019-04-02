import React, { Component } from 'react';

import axios from 'axios';

import * as _ from 'lodash';
import DeleteProgramCategory from '../../components/ProgramCategories/Delete';
import Loader from '../../components/Widget/Loader';
import { Router, Redirect } from 'react-router-dom';

class DeleteProgramCategoryContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      itemDeleted: false,
      formData: {
        name: {
          element: 'input',
          value: '',
          label: true,
          labelText: 'Категория программы',
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
    axios
      .get(`${process.env.REACT_APP_URL}/ProgramCategories`)
      .then(response => {
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

    axios
      .delete(
        `${process.env.REACT_APP_URL}/programCategories/${
          this.props.params.id
        }`,
      )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({ itemDeleted: true });
  };

  render() {
    return (
      <div>
        {this.state.itemDeleted ? (
          <Redirect to="/programcategories" />
        ) : (
          <DeleteProgramCategory
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

export default DeleteProgramCategoryContainer;
