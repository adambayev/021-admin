import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPagedGrants } from '../../../../actions/programActions';

import Page from '../../../common/Page';
import AddButton from '../../../common/AddButton';
import ShowList from '../../../common/ShowList';
import Spinner from '../../../common/Spinner';
import Pagination from '../../../common/Pagination';

import { Row, Col, Card } from 'reactstrap';

class GrantsPage extends Component {
  constructor() {
    super();
    this.state = {
      tableHeaders: ['#', 'Название', 'Краткое описание'],
      tableBody: ['id', 'name', 'shortDescription'],
      page: 1,
      size: 10,
      pageCount: 0,
      currentPage: 1,
      pagedGrantsList: {
        results: [],
        currentPage: 1,
        pageCount: 0,
        pageSize: 1,
        rowCount: 0,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pagedGrants) {
      this.setState({ pagedGrantsList: nextProps.pagedGrants });
    }
  }

  componentDidMount() {
    const { page, size } = this.state;
    this.props.fetchPagedGrants(page, size);
  }

  handlePageChange = selectedPage => {
    const { size } = this.state;

    if (selectedPage > 0) {
      this.props.fetchPagedGrants(selectedPage, size);
    }

    this.setState({ page: selectedPage });
  };

  render() {
    let grantContent;

    if (this.props.loading) {
      grantContent = <Spinner />;
    } else {
      grantContent = (
        <Card body>
          <AddButton buttonName="Добавить грант" prefix="grants" />
          <ShowList
            list={this.state.pagedGrantsList.results}
            tableHeaders={this.state.tableHeaders}
            tableBody={this.state.tableBody}
            prefix="grants"
          />
          <Pagination
            handlePageChange={value => this.handlePageChange(value)}
            grantList={this.state.pagedGrantsList.results}
            page={this.state.page}
            pageRange={this.state.pagedGrantsList.pageSize}
            pageCount={this.state.pagedGrantsList.pageCount}
            currentPage={this.state.page}
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
  pagedGrants: state.program.pagedGrantsList,
  loading: state.program.loading,
});

export default connect(
  mapStateToProps,
  { fetchPagedGrants },
)(GrantsPage);
