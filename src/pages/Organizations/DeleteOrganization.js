import React, { Component } from 'react';
import Page from 'components/Page';
import DeleteOrganization from '../../containers/Organizations/Delete';

class DeleteOrganizationPage extends Component {
  render() {
    return (
      <Page
        title="Forms"
        breadcrumbs={[{ name: 'Organizations / Delete', active: true }]}
      >
        <DeleteOrganization params={this.props.match.params} />
      </Page>
    );
  }
}

export default DeleteOrganizationPage;
