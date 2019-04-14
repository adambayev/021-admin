import React from 'react';
import spinner from '../../../assets/img/spinner/spinner.gif';

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};
