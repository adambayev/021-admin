import React, { Component } from 'react';
import Page from 'components/Page';
import EditOrganization from '../../containers/Organizations/Edit';

class EditOrganizationPage extends Component {
  render() {
    return (
      <Page
        title="Forms"
        breadcrumbs={[{ name: 'Organizations / Edit', active: true }]}
      >
        <EditOrganization params={this.props.match.params} />
      </Page>
    );
  }
}

export default EditOrganizationPage;
