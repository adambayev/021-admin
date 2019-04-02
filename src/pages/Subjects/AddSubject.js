import React, { Component } from 'react';
import Page from 'components/Page';
import AddSubject from '../../containers/Subjects/Add';

class AddSubjectPage extends Component {
  render() {
    return (
      <Page
        title="Forms"
        breadcrumbs={[{ name: 'Subjects / Add', active: true }]}
      >
        <AddSubject />
      </Page>
    );
  }
}

export default AddSubjectPage;
