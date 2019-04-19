import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormFields from '../../components/common/FormFields';
import {
  addGrantValue,
  addFile,
  fetchOrganizations,
  fetchGrantGivers,
  fetchSubjects,
  fetchLocations,
} from '../../actions/programActions';

import { Card, CardBody, CardHeader, Col, Collapse, Form } from 'reactstrap';
import { MdKeyboardArrowDown } from 'react-icons/md';

class GeneralSection extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        organizationId: {
          position: 'left',
          element: 'selectwithlink',
          value: '',
          label: true,
          labelText: 'Название Организации',
          config: {
            name: 'organizationid_input',
            options: [],
          },
        },
        logo: {
          position: 'right',
          element: 'file',
          value: '',
          label: true,
          labelText: 'Афиша',
          text: 'Афиша программы',
          config: {
            name: 'logo_input',
            type: 'file',
          },
        },
        name: {
          position: 'left',
          element: 'input',
          value: '',
          label: true,
          labelText: 'Название программы',
          config: {
            name: 'name_input',
            type: 'text',
            placeholder: 'Enter your name',
          },
        },
        link: {
          position: 'right',
          element: 'input',
          value: '',
          label: true,
          labelText: 'Ссылка на программу',
          config: {
            name: 'link_input',
            type: 'url',
            placeholder: 'Enter your link',
          },
        },
        request: {
          position: 'left',
          element: 'input',
          value: '',
          label: true,
          labelText: 'Ссылка на заявку',
          config: {
            name: 'request_input',
            type: 'url',
            placeholder: 'Enter your link',
          },
        },
        grantGiverId: {
          position: 'right',
          element: 'select',
          value: '',
          label: true,
          labelText: 'Грантодатель',
          config: {
            name: 'grantgiverid_input',
            options: [],
          },
        },
        subjects: {
          position: 'left',
          element: 'multipleselect',
          value: [],
          label: true,
          labelText: 'Сфера/ Дисциплина',
          config: {
            name: 'subjects_input',
            options: [],
          },
        },
        locations: {
          position: 'right',
          element: 'multipleselect',
          value: [],
          label: true,
          labelText: 'Местоположение',
          config: {
            name: 'locations_input',
            options: [],
          },
        },
      },
      file: '',
      isOpenMain: true,
    };
  }

  componentDidMount() {
    this.props.fetchOrganizations();
    this.props.fetchGrantGivers();
    this.props.fetchSubjects();
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

    if (nextProps.organizations) {
      newState.organizationId.config.options = nextProps.organizations;
    }

    if (nextProps.grantGivers) {
      newState.grantGiverId.config.options = nextProps.grantGivers;
    }

    if (nextProps.subjects) {
      newState.subjects.config.options = nextProps.subjects;
    }

    if (nextProps.locations) {
      newState.locations.config.options = nextProps.locations;
    }
  }

  changeHandler = (value, id) => {
    this.props.addGrantValue({ id, value });
  };

  addFile = value => {
    this.props.addFile(value);
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
      transform: this.state.isOpenMain ? 'rotate(0deg)' : 'rotate(-90deg)',
      transitionDuration: '0.3s',
      transitionProperty: 'transform',
    };

    return (
      <Col xl={12} lg={12} md={12}>
        <Card>
          <CardHeader onClick={() => this.handleClick('Main')}>
            Общая информация
            <MdKeyboardArrowDown style={headerStyle} />
          </CardHeader>
          <Collapse isOpen={this.state.isOpenMain}>
            <CardBody>
              <Form>
                <FormFields
                  columns={2}
                  data={this.state.formData}
                  change={(value, id) => this.changeHandler(value, id)}
                  addFile={value => this.addFile(value)}
                  changeState={newState => this.changeState(newState)}
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
  organizations: state.program.organizations,
  grantGivers: state.program.grantGivers,
  subjects: state.program.subjects,
  locations: state.program.locations,
});

export default connect(
  mapStateToProps,
  {
    addGrantValue,
    addFile,
    fetchOrganizations,
    fetchGrantGivers,
    fetchSubjects,
    fetchLocations,
  },
)(GeneralSection);
