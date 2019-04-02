import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CardItem = ({ item, index }) => {
  return (
    <tr key={item.id}>
      <th scope="row">{index + 1}</th>
      <td>{item.name}</td>
      <td>
        <Link
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          to={`/subjects/edit/${item.id}`}
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
          to={`/subjects/delete/${item.id}`}
        >
          <FaTrash className={'text-center nav-item-icon'} />
        </Link>
      </td>
    </tr>
  );
};

export default CardItem;
