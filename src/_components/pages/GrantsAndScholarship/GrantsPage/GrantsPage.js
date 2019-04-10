import React, { Component } from 'react';

import Page from '../../../common/Page';
import AddButton from '../../../common/AddButton';
import ShowList from '../../../common/ShowList';
import { connect } from 'react-redux';
import { fetchGrants } from '../../../../actions/grantActions';

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
    return (
      <Page title="Forms" breadcrumbs={[{ name: 'Grants', active: true }]}>
        <Row>
          <Col>
            <Card body>
              <AddButton buttonName="Добавить грант" prefix="grants" />
              <ShowList
                list={this.state.grantsList}
                tableHeaders={this.state.tableHeaders}
                tableBody={this.state.tableBody}
                prefix="grants"
              />
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  grants: state.grant.grants,
});

export default connect(
  mapStateToProps,
  { fetchGrants },
)(GrantsPage);
