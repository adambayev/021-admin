import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGrants } from '../../../../actions/programActions';

import Page from '../../../common/Page';
import AddButton from '../../../common/AddButton';
import ShowList from '../../../common/ShowList';
import Spinner from '../../../common/Spinner';

import { Row, Col, Card } from 'reactstrap';

class GrantsPage extends Component {
  constructor() {
    super();
    this.state = {
      tableHeaders: ['#', 'Название', 'Краткое описание'],
      tableBody: ['id', 'name', 'shortDescription'],
      grantsList: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.grants) {
      this.setState({ grantsList: nextProps.grants });
    }
  }

  componentDidMount() {
    this.props.fetchGrants();
  }

  render() {
    let grantContent;

    if (this.props.loading) {
      grantContent = <Spinner />;
    } else {
      grantContent = (
        <Card body>
          <AddButton buttonName="Добавить грант" prefix="grants" />
          <ShowList
            list={this.state.grantsList}
            tableHeaders={this.state.tableHeaders}
            tableBody={this.state.tableBody}
            prefix="grants"
          />
        </Card>
      );
    }

    return (
      <Page title="Forms" breadcrumbs={[{ name: 'Grants', active: true }]}>
        <Row>
          <Col>{grantContent}</Col>
        </Row>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  grants: state.program.grantsList.results,
  loading: state.program.loading,
});

export default connect(
  mapStateToProps,
  { fetchGrants },
)(GrantsPage);
