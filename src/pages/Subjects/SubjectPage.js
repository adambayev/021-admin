import React, { Component } from 'react';

import Page from 'components/Page';
import SubjectsList from '../../containers/Subjects/List';

class SubjectPage extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Page title="Forms" breadcrumbs={[{ name: 'Grants', active: true }]} />
        <SubjectsList />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
};

export default SubjectPage;
