import React, { Component } from 'react';
import axios from 'axios';
import ProgramCategoriesList from '../../components/ProgramCategories/List';

class ProgramCategoriesListContainer extends Component {
  constructor() {
    super();
    this.state = {
      programCategories: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_URL}/ProgramCategories`)
      .then(response => {
        let newState = Object.assign({}, this.state);
        newState.programCategories = response.data;
        this.setState(newState);
        console.log(this.state);
      });
  }

  render() {
    return (
      <ProgramCategoriesList
        programCategoriesList={this.state.programCategories}
      />
    );
  }
}

export default ProgramCategoriesListContainer;
