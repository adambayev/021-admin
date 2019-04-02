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
  const renderTable = () => {
    console.log(props.grantGiversList);
    return (
      <Row>
        <Col>
          <Card body>
            <Row>
              <Col xl={12} lg={12} md={12}>
                <Link
                  class="d-flex justify-content-end text-decoration-none"
                  to={`/grantGivers/add`}
                >
                  <Button color="primary">Добавить грантодателя</Button>
                </Link>
              </Col>
            </Row>
            <Table {...{ ['default']: true }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Название</th>
                  <th class="text-center">Изменить</th>
                  <th class="text-center">Удалить</th>
                </tr>
              </thead>
              <tbody>
                {props.grantGiversList.map((item, i) => {
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
                          to={`/grantGivers/edit/${item.id}`}
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
                          to={`/grantGivers/delete/${item.id}`}
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
