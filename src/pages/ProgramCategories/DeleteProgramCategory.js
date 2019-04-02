import React, { Component } from 'react';
import Page from 'components/Page';
import DeleteProgramCategory from '../../containers/ProgramCategories/Delete';

class DeleteProgramCategoryPage extends Component {
  render() {
    return (
      <Page
        title="Forms"
        breadcrumbs={[{ name: 'ProgramCategories / Delete', active: true }]}
      >
        <DeleteProgramCategory params={this.props.match.params} />
      </Page>
    );
  }
}

export default DeleteProgramCategoryPage;
