import React from 'react';

const CardHeader = () => {
  return (
    <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Изменить
        </th>
        <th
          style={{
            justifyContent: 'center',
          }}
        >
          Удалить
        </th>
      </tr>
    </thead>
  );
};

export default CardHeader;
