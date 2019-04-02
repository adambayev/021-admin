import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const DataTable = props => {
  console.log('props.programCategories');
  console.log(props.programCategories);
  // let filteredOrganizations = props.organizations.filter(
  //   a => (a.id = item.organizationId),
  // );
  const renderTable = () => {
    return (
      <Row>
        <Col>
          <Card body>
            <Row>
              <Col xl={12} lg={12} md={12}>
                <Link
                  class="d-flex justify-content-end text-decoration-none"
                  to={`/grants/add`}
                >
                  <Button color="primary">Добавить грант</Button>
                </Link>
              </Col>
            </Row>
            <Table {...{ ['default']: true }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Название</th>
                  <th>Организация</th>
                  <th>Программа</th>
                  <th class="text-center">Изменить</th>
                  <th class="text-center">Удалить</th>
                </tr>
              </thead>
              <tbody>
                {props.grantList.map((item, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
                      <td>
                        <div
                          style={{
                            width: '300px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {item.shortDescription}
                        </div>
                      </td>
                      <td>
                        <div
                          style={{
                            width: '500px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {item.description}
                        </div>
                      </td>
                      <td>
                        <Link
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                          to={`/grants/edit/${item.id}`}
                        >
                          <FaEdit className={'nav-item-icon'} />
                        </Link>
                      </td>
                      <td>
                        <Link
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                          to={`/grants/delete/${item.id}`}
                        >
                          <FaTrash className={'text-center nav-item-icon'} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    );
  };

  return <div>{renderTable()}</div>;
};

export default DataTable;
