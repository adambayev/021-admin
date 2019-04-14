import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AddButton = ({ list, tableHeaders, tableBody, prefix }) => {
  const linkStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const rowStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  return (
    <Table>
      <thead>
        <tr>
          {tableHeaders.map((item, i) => (
            <th key={i}>{item}</th>
          ))}
          <th className="text-center">Изменить</th>
          <th className="text-center">Удалить</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, i) => {
          return (
            <tr key={i}>
              {tableBody.map((value, i) => (
                <th key={i}>
                  <div style={rowStyle}>{item[value]}</div>
                </th>
              ))}
              <td>
                <Link style={linkStyle} to={`/${prefix}/edit/${item.id}`}>
                  <FaEdit className={'nav-item-icon'} />
                </Link>
              </td>
              <td>
                <Link style={linkStyle} to={`/${prefix}/delete/${item.id}`}>
                  <FaTrash className={'text-center nav-item-icon'} />
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default AddButton;
