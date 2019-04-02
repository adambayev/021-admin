import React, { Component } from 'react';
import Page from 'components/Page';
import AddOrganization from '../../containers/Organizations/Add';

class AddOrganizationPage extends Component {
  render() {
    return (
      <Page
        title="Forms"
        breadcrumbs={[{ name: 'Organizations / Add', active: true }]}
      >
        <AddOrganization />
      </Page>
    );
  }
}

export default AddOrganizationPage;
