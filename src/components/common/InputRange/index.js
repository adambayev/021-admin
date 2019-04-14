import React from 'react';
import InputRange from 'react-input-range';
import './index.css';

class AgeRange extends React.Component {
  render() {
    return (
      <InputRange
        disabled={this.props.disabled}
        maxValue={this.props.maxOption}
        minValue={this.props.minOption}
        value={this.props.value}
        onChange={value => this.props.changedValue(value)}
      />
    );
  }
}

export default AgeRange;
