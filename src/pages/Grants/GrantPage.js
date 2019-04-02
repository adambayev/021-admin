import React, { Component } from 'react';

import Page from 'components/Page';
import GrantsList from '../../containers/Grants/List';

class GrantPage extends Component {
  render() {
    return (
      <Page title="Forms" breadcrumbs={[{ name: 'Grants', active: true }]}>
        <GrantsList />
      </Page>
    );
  }
}

export default GrantPage;
