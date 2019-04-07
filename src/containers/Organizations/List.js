import React, { Component } from 'react';
import axios from 'axios';
import OrganizationsList from '../../components/Organizations/List';

class OrganizationsListContainer extends Component {
  constructor() {
    super();
    this.state = {
      organizations: [],
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_URL}/Organizations`).then(response => {
      let newState = Object.assign({}, this.state);
      newState.organizations = response.data;
      this.setState(newState);
      console.log(this.state);
    });
  }

  render() {
    return <OrganizationsList organizationsList={this.state.organizations} />;
  }
}

export default OrganizationsListContainer;
