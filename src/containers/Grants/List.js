import React, { Component } from 'react';

import axios from 'axios';

import GrantsList from '../../components/Grants/List';
import Loader from '../../components/Widget/Loader';

import { Col, Row } from 'reactstrap';

class GrantsListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      grants: [],
      organizations: [],
      programCategories: [],
    };
  }

  fetchData() {
    const response2 = axios
      .get(`${process.env.REACT_APP_URL}/Organizations`)
      .then(response => {
        let newState = Object.assign({}, this.state);
        newState.organizations = response.data;
        this.setState(newState);
        const response3 = axios
          .get(`${process.env.REACT_APP_URL}/ProgramCategories`)
          .then(response => {
            console.log('response.data');
            console.log(response.data);
            console.log('response.data');
            let newState = Object.assign({}, this.state);
            newState.programCategories = response.data;
            this.setState(newState);
            console.log('programCategories');
            console.log(newState.programCategories);
            console.log('programCategories');
            const response1 = axios
              .get(`${process.env.REACT_APP_URL}/Grants`)
              .then(response => {
                let newState = Object.assign({}, this.state);
                newState.grants = response.data;
                this.setState(newState);
                this.setState({ isLoading: false });
              });
          });
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <GrantsList
            grantList={this.state.grants}
            organizations={this.state.organizations}
            programCategories={this.state.programCategories}
          />
        )}
      </div>
    );
  }
}

export default GrantsListContainer;
