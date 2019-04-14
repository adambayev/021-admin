import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormFields from '../../_components/common/FormFields';
import { addGrantValue } from '../../actions/programActions';

import { Card, CardBody, CardHeader, Col, Collapse, Form } from 'reactstrap';
import { MdKeyboardArrowDown } from 'react-icons/md';

class DescriptionSection extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        shortDescription: {
          position: 'left',
          element: 'textareaWithEditor',
          value: '',
          label: true,
          labelText: 'Краткое описание гранта/стипендии',
          config: {
            name: 'shortDescription_input',
            rows: 2,
            cols: 36,
          },
        },
        description: {
          position: 'right',
          element: 'textareaWithEditor',
          value: '',
          label: true,
          labelText: 'Полное описание гранта/стипендии',
          config: {
            name: 'description_input',
            rows: 8,
            cols: 36,
          },
        },
      },
      isOpenDescriptions: false,
    };
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
  }

  changeHandler = (value, id) => {
    this.props.addGrantValue({ id, value });
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
      transform: this.state.isOpenDescriptions
        ? 'rotate(0deg)'
        : 'rotate(-90deg)',
      transitionDuration: '0.3s',
      transitionProperty: 'transform',
    };
    return (
      <Col xl={12} lg={12} md={12}>
        <Card>
          <CardHeader onClick={() => this.handleClick('Descriptions')}>
            Описание
            <MdKeyboardArrowDown style={headerStyle} />
          </CardHeader>
          <Collapse isOpen={this.state.isOpenDescriptions}>
            <CardBody>
              <Form>
                <FormFields
                  columns={1}
                  labelSm={3}
                  inputSm={9}
                  change={(value, id) => this.changeHandler(value, id)}
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

export default connect(
  null,
  { addGrantValue },
)(DescriptionSection);
