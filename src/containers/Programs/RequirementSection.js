import React, { Component } from 'react';
import FormFields from '../../components/common/FormFields';
import { connect } from 'react-redux';
import { addGrantValue, fetchLocations } from '../../actions/programActions';
import { Card, CardBody, CardHeader, Col, Collapse, Form } from 'reactstrap';
import { MdKeyboardArrowDown } from 'react-icons/md';

class RequirementSection extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        requirementsDetails: {
          position: 'left',
          element: 'textareaWithEditor',
          value: '',
          label: true,
          labelText: 'Требование к кандиадатам',
          config: {
            name: 'requirementsDetails_input',
            rows: 4,
            cols: 36,
          },
        },
        requiredCountries: {
          position: 'right',
          element: 'multipleselect',
          value: [],
          label: true,
          labelText: 'Требование к кандидатам, страна',
          config: {
            name: 'requiredCountries_input',
            options: [],
          },
        },
        requiredAge: {
          position: 'left',
          element: 'inputrange',
          value: true,
          label: true,
          labelText: 'Требования по возрасту',
          config: {
            name: 'requiredAgeFrom_input',
            type: 'number',
            placeholder: 'Enter',
            minOption: 1,
            maxOption: 99,
            disabled: false,
          },
        },
        requiredAgeFrom: {
          value: 20,
        },
        requiredAgeTo: {
          value: 50,
        },
      },
      isOpenRequirements: false,
    };
  }

  componentDidMount() {
    this.props.fetchLocations();
  }

  componentWillReceiveProps(nextProps) {
    const newState = this.state.formData;
    if (nextProps.grants) {
      for (let key in nextProps.grants) {
        if (newState[key]) {
          newState[key].value = nextProps.grants[key];
        }
      }
    }

    if (nextProps.locations) {
      newState.requiredCountries.config.options = nextProps.locations;
    }
  }

  changeHandler = (value, id) => {
    this.props.addGrantValue({ id, value });
  };

  changeState = formData => {
    this.setState({ formData });
  };

  handleClick = name => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    const headerStyle = {
      padding: 0,
      transform: this.state.isOpenRequirements
        ? 'rotate(0deg)'
        : 'rotate(-90deg)',
      transitionDuration: '0.3s',
      transitionProperty: 'transform',
    };
    return (
      <Col xl={12} lg={12} md={12}>
        <Card>
          <CardHeader onClick={() => this.handleClick('Requirements')}>
            Требования
            <MdKeyboardArrowDown style={headerStyle} />
          </CardHeader>
          <Collapse isOpen={this.state.isOpenRequirements}>
            <CardBody>
              <Form>
                <FormFields
                  columns={1}
                  labelSm={3}
                  inputSm={9}
                  change={(value, id) => this.changeHandler(value, id)}
                  changeState={newState => this.changeState(newState)}
                  data={this.state.formData}
                />
              </Form>
            </CardBody>
          </Collapse>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  grants: state.program.grants,
  locations: state.program.locations,
});

export default connect(
  mapStateToProps,
  { addGrantValue, fetchLocations },
)(RequirementSection);
