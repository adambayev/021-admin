import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import { Col, Row } from 'reactstrap';

class Pagination extends Component {
  state = {
    activePage: 1,
    filteredGrantsList: [],
    paginatedList: [],
    searchText: '',
    loading: true,
    pageCount: 0,
  };

  componentDidUpdate = async prevProps => {
    if (prevProps !== this.props) {
      await this.setState({
        filteredGrantsList: this.props.grantList,
        loading: false,
      });
      this.paginateTable(this.props.grantList);
    }
  };

  paginateTable = async list => {
    const { activePage } = this.state;

    const pageCount = list.length / this.props.pageRange;
    const until = this.props.pageRange * activePage;
    const from = until - this.props.pageRange;
    let paginatedList = list;
    if (list.length > this.props.pageRange) {
      paginatedList = list.slice(from, until);
    }
    await this.setState({ paginatedList, pageCount });
  };

  render() {
    const size = this.props.pageCount > 5 ? 6 : 8;
    const offset = this.props.pageCount > 5 ? 3 : 4;

    const handlePageChange = async page => {
      await this.setState({ activePage: page + 1 });
      const { filteredGrantsList } = this.state;
      await this.paginateTable(filteredGrantsList);

      this.state.activePage !== this.props.currentPage &&
        this.props.handlePageChange(page + 1);
    };
    return (
      <div>
        <Row>
          <Col sm="12" md={{ size, offset }}>
            <ReactPaginate
              initialPage={this.props.currentPage - 1}
              forcePage={this.props.currentPage - 1}
              containerClassName="pagination"
              pageCount={this.props.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              previousLabel={this.props.pageCount > 1 ? 'Предыдущая' : null}
              nextLabel={this.props.pageCount > 1 ? 'Следующая' : null}
              breakLabel="..."
              pageClassName="page-item"
              breakClassName="page-item"
              previousClassName="page-item"
              nextClassName="page-item"
              activeClassName="page-item active"
              activeLinkClassName="page-link pointer"
              pageLinkClassName="page-link pointer"
              breakLinkClassName="page-link pointer"
              previousLinkClassName="page-link pointer"
              nextLinkClassName="page-link pointer"
              onPageChange={page => {
                handlePageChange(page.selected);
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Pagination;
