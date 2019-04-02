import React, { Component } from 'react';
import Page from 'components/Page';
import AddProgramCategory from '../../containers/ProgramCategories/Add';

class AddProgramCategoryPage extends Component {
  render() {
    return (
      <Page
        title="Forms"
        breadcrumbs={[{ name: 'ProgramCategories / Add', active: true }]}
      >
        <AddProgramCategory />
      </Page>
    );
  }
}

export default AddProgramCategoryPage;
