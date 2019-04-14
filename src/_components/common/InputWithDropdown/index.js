import React from 'react';
import {
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false,
    };
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen,
    });
  }

  render() {
    return (
      <div>
        <InputGroup>
          <Input
            value={this.props.value && this.props.value.amount}
            onChange={event => this.props.changedValue(event)}
            disabled={this.props.disabled}
          />
          <InputGroupButtonDropdown
            addonType="append"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggleDropDown}
          >
            <DropdownToggle
              className="rounded btn btn-outline-primary"
              disabled={this.props.dropdownDisabled}
              outline
              color={this.props.dropdownDisabled ? 'dark' : 'primary'}
              caret={!this.props.dropdownDisabled}
            >
              {this.props.value && this.props.value.currency
                ? this.props.value.currency
                : this.props.optionHeader}
            </DropdownToggle>
            <DropdownMenu>
              {this.props.options.map((item, i) => (
                <DropdownItem
                  key={i}
                  onClick={() => this.props.clickedItem(item)}
                >
                  {item}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </InputGroupButtonDropdown>
        </InputGroup>
      </div>
    );
  }
}
