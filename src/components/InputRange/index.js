import React from 'react';
import InputRange from 'react-input-range';
import './index.css';

class AgeRange extends React.Component {
  render() {
    return (
      <InputRange
        maxValue={this.props.maxValue}
        minValue={this.props.minValue}
        value={this.props.value}
        onChange={value => this.props.changedValue(value)}
      />
    );
  }
}

export default AgeRange;
