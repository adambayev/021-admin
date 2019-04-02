import React, { Component } from 'react';
import Page from 'components/Page';
import DeleteGrant from '../../containers/Grants/Delete';

class DeleteGrantPage extends Component {
  render() {
    return (
      <Page
        title="Forms"
        breadcrumbs={[{ name: 'Grants / Delete', active: true }]}
      >
        <DeleteGrant params={this.props.match.params} />
      </Page>
    );
  }
}

export default DeleteGrantPage;
