import React, { Component } from 'react';
import Page from 'components/Page';
import EditGrantGiver from '../../containers/GrantGivers/Edit';

class EditGrantGiverPage extends Component {
  render() {
    return (
      <Page
        title="Forms"
        breadcrumbs={[{ name: 'GrantGivers / Edit', active: true }]}
      >
        <EditGrantGiver params={this.props.match.params} />
      </Page>
    );
  }
}

export default EditGrantGiverPage;
