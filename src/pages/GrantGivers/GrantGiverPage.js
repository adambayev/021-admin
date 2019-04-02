import React, { Component } from 'react';

import Page from 'components/Page';
import GrantGiversList from '../../containers/GrantGivers/List';

class GrantGiverPage extends Component {
  render() {
    return (
      <Page title="Forms" breadcrumbs={[{ name: 'GrantGivers', active: true }]}>
        <GrantGiversList />
      </Page>
    );
  }
}

export default GrantGiverPage;
