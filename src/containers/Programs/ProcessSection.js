import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGrantValue } from '../../actions/programActions';
import FormFields from '../../components/common/FormFields';

import { Card, CardBody, CardHeader, Col, Collapse, Form } from 'reactstrap';
import { MdKeyboardArrowDown } from 'react-icons/md';

class ProcessSection extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        applicationProcess: {
          position: 'right',
          element: 'textareaWithEditor',
          value: '',
          label: true,
          labelText: 'Процесс подачи стипендии',
          config: {
            name: 'applicationProcess_input',
            rows: 8,
            cols: 36,
          },
        },
        file: {
          position: 'right',
          element: 'multipleFile',
          value: '',
          label: true,
          labelText: 'Приложение',
          text: 'Процесс подачи стипендии',
          config: {
            name: 'file_input',
            type: 'file',
            options: [],
          },
        },
      },
      isOpenProcessOfFiling: false,
    };
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
      transform: this.state.isOpenProcessOfFiling
        ? 'rotate(0deg)'
        : 'rotate(-90deg)',
      transitionDuration: '0.3s',
      transitionProperty: 'transform',
    };
    return (
      <Col xl={12} lg={12} md={12}>
        <Card>
          <CardHeader onClick={() => this.handleClick('ProcessOfFiling')}>
            Процесс подачи стипендии
            <MdKeyboardArrowDown style={headerStyle} />
          </CardHeader>
          <Collapse isOpen={this.state.isOpenProcessOfFiling}>
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
)(ProcessSection);
