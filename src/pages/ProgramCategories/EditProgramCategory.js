import React, { Component } from 'react';
import Page from 'components/Page';
import EditProgramCategory from '../../containers/ProgramCategories/Edit';

class EditProgramCategoryPage extends Component {
  render() {
    return (
      <Page
        title="Forms"
        breadcrumbs={[{ name: 'ProgramCategories / Edit', active: true }]}
      >
        <EditProgramCategory params={this.props.match.params} />
      </Page>
    );
  }
}

export default EditProgramCategoryPage;
