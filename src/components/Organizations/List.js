import React from 'react';
import { Card, Col, Row, Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const DataTable = props => {
  const renderTable = () => {
    return (
      <Row>
        <Col>
          <Card body>
            <Row>
              <Col xl={12} lg={12} md={12}>
                <Link
                  className="d-flex justify-content-end text-decoration-none"
                  to={`/organizations/add`}
                >
                  <Button color="primary">Добавить организацию</Button>
                </Link>
              </Col>
            </Row>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Название</th>
                  <th className="text-center">Изменить</th>
                  <th className="text-center">Удалить</th>
                </tr>
              </thead>
              <tbody>
                {props.organizationsList.map((item, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
                      <td>
                        <Link
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                          to={`/organizations/edit/${item.id}`}
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
                          to={`/organizations/delete/${item.id}`}
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
