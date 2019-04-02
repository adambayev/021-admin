import React, { Component } from 'react';

import Page from 'components/Page';
import ProgramCategoriesList from '../../containers/ProgramCategories/List';

class ProgramCategoryPage extends Component {
  render() {
    return (
      <Page
        title="Forms"
        breadcrumbs={[{ name: 'ProgramCategories', active: true }]}
      >
        <ProgramCategoriesList />
      </Page>
    );
  }
}

export default ProgramCategoryPage;
