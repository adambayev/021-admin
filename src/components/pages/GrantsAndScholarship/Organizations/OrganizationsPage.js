import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrganizations } from '../../../../actions/programActions';

import Page from '../../../common/Page';
import AddButton from '../../../common/AddButton';
import ShowList from '../../../common/ShowList';
import Spinner from '../../../common/Spinner';

import { Row, Col, Card } from 'reactstrap';

class OrganizationsPage extends Component {
  constructor() {
    super();
    this.state = {
      tableHeaders: ['#', 'Название'],
      tableBody: ['id', 'name'],
      organizationsList: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.organizations) {
      this.setState({ organizationsList: nextProps.organizations });
    }
  }

  componentDidMount() {
    this.props.fetchOrganizations();
  }

  render() {
    let organizationContent;

    if (this.props.loading) {
      organizationContent = <Spinner />;
    } else {
      organizationContent = (
        <Card body>
          <AddButton buttonName="Добавить организацию" prefix="organizations" />
          <ShowList
            list={this.state.organizationsList}
            tableHeaders={this.state.tableHeaders}
            tableBody={this.state.tableBody}
            prefix="organizations"
          />
        </Card>
      );
    }

    return (
      <Page title="Forms" breadcrumbs={[{ name: 'Grants', active: true }]}>
        <Row>
          <Col>{organizationContent}</Col>
        </Row>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  organizations: state.program.organizations,
  loading: state.program.loading,
});

export default connect(
  mapStateToProps,
  { fetchOrganizations },
)(OrganizationsPage);
