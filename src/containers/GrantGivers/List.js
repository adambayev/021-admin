import React, { Component } from 'react';
import axios from 'axios';
import GrantGiversList from '../../components/GrantGivers/List';

class GrantGiversListContainer extends Component {
  constructor() {
    super();
    this.state = {
      grantGivers: [],
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_URL}/GrantGivers`).then(response => {
      let newState = Object.assign({}, this.state);
      newState.grantGivers = response.data;
      this.setState(newState);
      console.log(this.state);
    });
  }

  render() {
    return <GrantGiversList grantGiversList={this.state.grantGivers} />;
  }
}

export default GrantGiversListContainer;
