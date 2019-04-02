import React, { Component } from 'react';
import Page from 'components/Page';
import AddGrantGiver from '../../containers/GrantGivers/Add';

class AddGrantGiverPage extends Component {
  render() {
    return (
      <Page
        title="Forms"
        breadcrumbs={[{ name: 'GrantGivers / Add', active: true }]}
      >
        <AddGrantGiver />
      </Page>
    );
  }
}

export default AddGrantGiverPage;
