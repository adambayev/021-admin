import React from 'react';
import Select from 'react-select';

class Selector extends React.Component {
  state = {
    selectedOptions: [],
    options: [],
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.options !== this.props.options) {
      const { options } = this.props;
      await this.generateArray(options);
    }
  }

  generateArray = async list => {
    const listWithLabels = list.map(item => ({
      ...item,
      label: item.name,
      value: item.name.toLowerCase(),
    }));

    await this.setState({ options: listWithLabels });
  };

  handleChange = selectedOptions => {
    const { optionClicked } = this.props;
    this.setState({ selectedOptions });
    optionClicked(selectedOptions);
  };

  render() {
    const { selectedOptions, options } = this.state;
    return (
      <Select
        value={selectedOptions}
        onChange={this.handleChange}
        options={options}
        isSearchable={true}
        isMulti={true}
      />
    );
  }
}

export default Selector;
