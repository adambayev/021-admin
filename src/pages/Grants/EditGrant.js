import React, { Component } from 'react';
import Page from 'components/Page';
import EditGrant from '../../containers/Grants/Edit';

class EditGrantPage extends Component {
  render() {
    return (
      <Page
        title="Forms"
        breadcrumbs={[{ name: 'Grants / Edit', active: true }]}
      >
        <EditGrant params={this.props.match.params} />
      </Page>
    );
  }
}

export default EditGrantPage;
