import React, { Component } from 'react';

import axios from 'axios';

import SubjectsList from '../../components/Subjects/List';

class SubjectsListContainer extends Component {
  constructor() {
    super();
    this.state = {
      subjects: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_URL}/Content/subjects`)
      .then(response => {
        let newState = Object.assign({}, this.state);
        newState.subjects = response.data;
        this.setState(newState);
        console.log(this.state);
      });
  }

  render() {
    return <SubjectsList subjectsList={this.state.subjects} />;
  }
}

export default SubjectsListContainer;
