import React, { Component } from 'react';
import Page from 'components/Page';
import DeleteGrantGiver from '../../containers/GrantGivers/Delete';

class DeleteGrantGiverPage extends Component {
  render() {
    return (
      <Page
        title="Forms"
        breadcrumbs={[{ name: 'GrantGivers / Delete', active: true }]}
      >
        <DeleteGrantGiver params={this.props.match.params} />
      </Page>
    );
  }
}

export default DeleteGrantGiverPage;
