import React from 'react';
import { Card, Table } from 'reactstrap';
import { TableHeader, TableItem } from './components';

const CardTable = props => {
  const { subjectsList, activePage, pageRange } = props;
  const initialPage = pageRange * activePage - pageRange;

  const renderTable = () =>
    subjectsList.map((item, index) => (
      <TableItem item={item} index={index + initialPage} key={item.id} />
    ));

  return (
    <Card body>
      <Table>
        <TableHeader />
        <tbody>{renderTable()}</tbody>
      </Table>
    </Card>
  );
};

export default CardTable;
