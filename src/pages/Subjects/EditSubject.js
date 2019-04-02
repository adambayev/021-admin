import React, { Component } from 'react';
import Page from 'components/Page';
import EditSubject from '../../containers/Subjects/Edit';

class EditSubjectPage extends Component {
  render() {
    return (
      <Page
        title="Forms"
        breadcrumbs={[{ name: 'Subjects / Edit', active: true }]}
      >
        <EditSubject params={this.props.match.params} />
      </Page>
    );
  }
}

export default EditSubjectPage;
