import React from 'react';
import { css } from '@emotion/core';
// First way to import
import { RingLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  render() {
    return (
      <div className="sweet-loading">
        <RingLoader
          css={override}
          sizeUnit={'px'}
          size={60}
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default Loader;
