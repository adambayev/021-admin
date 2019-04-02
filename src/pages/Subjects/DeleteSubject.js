import React, { Component } from 'react';
import Page from 'components/Page';
import DeleteSubject from '../../containers/Subjects/Delete';

class DeleteSubjectPage extends Component {
  render() {
    return (
      <Page
        title="Forms"
        breadcrumbs={[{ name: 'Subjects / Delete', active: true }]}
      >
        <DeleteSubject params={this.props.match.params} />
      </Page>
    );
  }
}

export default DeleteSubjectPage;
