import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addGrantValue,
  addAttachments,
  removeAttachments,
} from '../../actions/programActions';
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
          element: 'multipleFiles',
          value: '',
          label: true,
          labelText: 'Приложение #',
          text: 'Процесс подачи стипендии',
          config: {
            name: 'file_input',
            type: 'file',
            attachments: [{ 0: { value: '' } }],
          },
        },
      },
      isOpenProcessOfFiling: false,
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

  addAttachment = (value, fileName, id, itemId) => {
    const newState = this.state.formData;

    newState.file.config.attachments[itemId].value = fileName;
    itemId < 4 && newState.file.config.attachments.push({ value: '' });

    this.setState({ formData: newState });
    this.props.addAttachments(value);
  };

  removeAttachment = itemId => {
    const newState = this.state.formData;
    let updatedFiles = newState.file.config.attachments;

    updatedFiles.splice(itemId, 1);

    newState.file.config.attachments = updatedFiles;

    this.setState({ formData: newState });
    this.props.removeAttachments(itemId);
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
                  addAttachment={(value, fileName, id, itemId) =>
                    this.addAttachment(value, fileName, id, itemId)
                  }
                  removeAttachment={itemId => this.removeAttachment(itemId)}
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
});

export default connect(
  mapStateToProps,
  { addGrantValue, addAttachments, removeAttachments },
)(ProcessSection);
