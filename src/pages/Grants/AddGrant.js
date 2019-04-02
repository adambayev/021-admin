import React, { Component } from 'react';
import Page from 'components/Page';
import AddGrant from '../../containers/Grants/Add';

class AddGrantPage extends Component {
  render() {
    return (
      <Page>
        <AddGrant />
      </Page>
    );
  }
}

export default AddGrantPage;
