import React from 'react';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';
import './index.css';

class AgeRange extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { min: 18, max: 50 },
    };
  }

  render() {
    return (
      <InputRange
        maxValue={100}
        minValue={0}
        value={this.state.value}
        onChange={value => this.setState({ value })}
      />
    );
  }
}

export default AgeRange;
