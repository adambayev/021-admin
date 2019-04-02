import React, { Component } from 'react';

import Page from 'components/Page';
import OrganizationsList from '../../containers/Organizations/List';

class OrganizationPage extends Component {
  render() {
    return (
      <Page
        title="Forms"
        breadcrumbs={[{ name: 'Organizations', active: true }]}
      >
        <OrganizationsList />
      </Page>
    );
  }
}

export default OrganizationPage;
