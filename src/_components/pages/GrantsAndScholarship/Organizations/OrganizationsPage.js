import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrganizations } from '../../../../actions/grantActions';

import Page from '../../../common/Page';
import AddButton from '../../../common/AddButton';
import ShowList from '../../../common/ShowList';

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
    return (
      <Page title="Forms" breadcrumbs={[{ name: 'Grants', active: true }]}>
        <Row>
          <Col>
            <Card body>
              <AddButton buttonName="Добавить организацию" />
              <ShowList
                list={this.state.organizationsList}
                tableHeaders={this.state.tableHeaders}
                tableBody={this.state.tableBody}
                prefix="organizations"
              />
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  organizations: state.grant.organizations,
});

export default connect(
  mapStateToProps,
  { fetchOrganizations },
)(OrganizationsPage);
