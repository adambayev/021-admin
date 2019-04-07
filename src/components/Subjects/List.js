import React from 'react';
import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Spinner,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import SearchInput from 'components/SearchInput';
import CardTable from './CardTable';
import './style.css';

const pageRange = 10;
class DataTable extends React.Component {
  state = {
    activePage: 1,
    filteredSubjectsList: [],
    paginatedList: [],
    searchText: '',
    loading: true,
    pageCount: 0,
  };

  componentDidUpdate = async prevProps => {
    if (prevProps !== this.props) {
      await this.setState({
        filteredSubjectsList: this.props.subjectsList,
        loading: false,
      });
      this.paginateTable(this.props.subjectsList);
    }
  };

  paginateTable = async list => {
    const { activePage } = this.state;
    const pageCount = list.length / 10;

    const until = pageRange * activePage;
    const from = until - pageRange;
    let paginatedList = list;
    if (list.length > pageRange) {
      paginatedList = list.slice(from, until);
    }
    await this.setState({ paginatedList, pageCount });
  };

  render() {
    const {
      activePage,
      searchText,
      loading,
      paginatedList,
      pageCount,
    } = this.state;
    const { subjectsList } = this.props;
    //REFACTOR
    const size = pageCount > 5 ? 6 : 8;
    const offset = pageCount > 5 ? 3 : 4;

    const filterTable = async () => {
      const { searchText } = this.state;
      const filteredSubjectsList = subjectsList.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      await this.setState({ filteredSubjectsList, activePage: 1 });
      await this.paginateTable(filteredSubjectsList);
    };

    const handleSearchChange = async e => {
      const searchText = e.target.value.trim();
      await this.setState({ searchText });
      filterTable();
    };

    const handlePageChange = async page => {
      await this.setState({ activePage: page + 1 });
      const { filteredSubjectsList } = this.state;
      await this.paginateTable(filteredSubjectsList);
    };

    return loading ? (
      <Container style={styles.container}>
        <Row>
          <Spinner color="primary" />
        </Row>
      </Container>
    ) : (
      <Row>
        <Col>
          <Card className="mb-3">
            <CardHeader>{'default'}</CardHeader>
            <CardBody>
              <Row className="headerBar">
                <Col xl="6" lg="6" md="6" sm="12" className="headerBar">
                  <SearchInput
                    onChange={handleSearchChange}
                    value={searchText}
                  />
                </Col>
                <Col xl="6" lg="6" md="6" sm="12">
                  <Link
                    className="d-flex justify-content-end text-decoration-none"
                    to={`/subjects/add`}
                  >
                    <Button color="primary">Добавить сферу/дисциплину</Button>
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CardTable
                    subjectsList={paginatedList}
                    activePage={activePage}
                    pageRange={pageRange}
                  />
                </Col>
              </Row>
            </CardBody>
            <Row>
              <Col sm="12" md={{ size, offset }}>
                <ReactPaginate
                  initialPage={activePage - 1}
                  forcePage={activePage - 1}
                  containerClassName="pagination"
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  previousLabel={pageCount > 1 ? 'Предыдущая' : null}
                  nextLabel={pageCount > 1 ? 'Следующая' : null}
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
          </Card>
        </Col>
      </Row>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default DataTable;
