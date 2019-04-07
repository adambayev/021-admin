import React, { Component } from 'react';

import axios from 'axios';

import * as _ from 'lodash';
import EditGrant from '../../components/Grants/Edit';
import Loader from '../../components/Widget/Loader';

class EditGrantContainer extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        organizationId: {
          position: 'left',
          element: 'select',
          value: '',
          label: true,
          labelText: 'Название Организации',
          config: {
            name: 'programCategoryId_input',
            options: [],
          },
        },
        logo: {
          position: 'right',
          element: 'file',
          value: '',
          label: true,
          labelText: 'Логотип',
          text: 'Логотип организации',
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
            name: 'grantGiverId_input',
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
        startDate: {
          position: 'left',
          element: 'input',
          value: '',
          label: true,
          labelText: 'Начало программы',
          config: {
            name: 'startDate_input',
            type: 'date',
            placeholder: 'Выберит дату',
          },
        },
        totalCost: {
          position: 'right',
          element: 'input',
          value: '',
          label: true,
          labelText: 'Размер стипендии',
          config: {
            name: 'totalCost_input',
            type: 'number',
            placeholder: 'Enter',
          },
        },
        endDate: {
          position: 'left',
          element: 'input',
          value: '',
          label: true,
          labelText: 'Конец программы',
          config: {
            name: 'endDate_input',
            type: 'date',
            placeholder: 'Выберит дату',
          },
        },
      },
      descriptionData: {
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
      requirementsData: {
        requirementsDetails: {
          position: 'left',
          element: 'textarea',
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
        requiredAgeFrom: {
          position: 'left',
          element: 'input',
          value: '',
          label: true,
          labelText: 'Требования по возрасту от',
          config: {
            name: 'requiredAgeFrom_input',
            type: 'number',
            placeholder: 'Enter',
          },
        },
        requiredAgeTo: {
          position: 'right',
          element: 'input',
          value: '',
          label: true,
          labelText: 'Требования по возрасту до',
          config: {
            name: 'requiredAgeTo_input',
            type: 'number',
            placeholder: 'Enter',
          },
        },
      },
      grantFormData: [
        {
          programCategoryId: {
            position: 'left',
            element: 'input',
            value: 0,
            label: true,
            labelText: 'Программа',
            config: {
              name: 'programCategoryId_input',
              type: 'text',
              placeholder: '',
            },
          },
          grantType: {
            position: 'right',
            element: 'select',
            value: '',
            label: true,
            labelText: 'Тип финансирования гранта/стипендии',
            config: {
              name: 'grantType_input',
              options: [
                { id: 0, name: 'Полное финансирование' },
                { id: 1, name: 'Частичное финансирование' },
                { id: 2, name: 'Не финансируется' },
              ],
            },
          },
          totalCost: {
            position: 'left',
            element: 'input',
            value: '',
            label: true,
            labelText: 'Стоимость обучения',
            config: {
              name: 'totalCost_input',
              type: 'number',
              placeholder: '',
            },
          },
          grantPercent: {
            position: 'right',
            element: 'input',
            value: '',
            label: true,
            labelText:
              '% гранта покрывающий стоимость обучения на одного человека',
            config: {
              name: 'grantPercent_input',
              type: 'number',
              placeholder: '',
            },
          },
          grantSum: {
            position: 'left',
            element: 'input',
            value: '',
            label: true,
            labelText: 'Общая сумма гранта на человека',
            config: {
              name: 'grantSum_input',
              type: 'number',
              placeholder: '',
            },
          },
          flights: {
            position: 'right',
            element: 'input',
            value: '',
            label: true,
            labelText: 'Сумма на перелеты',
            config: {
              name: 'flights_input',
              type: 'number',
              placeholder: '',
            },
          },
          scholarship: {
            position: 'left',
            element: 'input',
            value: '',
            label: true,
            labelText: 'Стипендия на руки',
            config: {
              name: 'scholarship_input',
              type: 'number',
              placeholder: '',
            },
          },
          amount: {
            position: 'right',
            element: 'input',
            value: '',
            label: true,
            labelText: 'Количество грантов',
            config: {
              name: 'amount_input',
              type: 'number',
              placeholder: '',
            },
          },
          duration: {
            position: 'left',
            element: 'input',
            value: '',
            label: true,
            labelText: 'Длительность программы',
            config: {
              name: 'duration_input',
              type: 'number',
              placeholder: '',
            },
          },
          totalFund: {
            position: 'right',
            element: 'input',
            value: '',
            label: true,
            labelText: 'Общий стипендиальный фонд',
            config: {
              name: 'totalFund_input',
              type: 'number',
              placeholder: '',
            },
          },
          grantDeatails: {
            position: 'left',
            element: 'input',
            value: '',
            label: true,
            labelText: 'Детали гранта и стоимости',
            config: {
              name: 'grantDeatails_input',
              type: 'text',
              placeholder: '',
            },
          },
          isDeadline: {
            position: 'right',
            element: 'input',
            value: false,
            label: true,
            labelText: 'Бессрочный',
            config: {
              name: 'grantType_input',
              type: 'checkbox',
              placeholder: '',
            },
          },
        },
      ],
      grantDetails: {
        value: [],
        options: [],
      },
      isOpenMain: true,
      isOpenDescriptions: false,
      isOpenRequirements: false,
      isOpenDetails: true,
      file: '',
    };
  }

  handleClick = name => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
    console.log(this.state.isOpenMain);
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_URL}/ProgramCategories`)
      .then(response => {
        let newState = Object.assign({}, this.state);
        newState['grantDetails'].options = response.data;
        this.setState(newState);
      });
    axios.get(`${process.env.REACT_APP_URL}/Organizations`).then(response => {
      let newState = Object.assign({}, this.state);
      newState.formData['organizationId'].config.options = response.data;
      this.setState(newState);
    });
    axios.get(`${process.env.REACT_APP_URL}/GrantGivers`).then(response => {
      let newState = Object.assign({}, this.state);
      newState.formData['grantGiverId'].config.options = response.data;
      this.setState(newState);
    });
    axios
      .get(`${process.env.REACT_APP_URL}/Content/subjects`)
      .then(response => {
        let newState = Object.assign({}, this.state);
        newState.formData['subjects'].value = response.data;
        this.setState(newState);
      });
    axios.get(`${process.env.REACT_APP_URL}/Locations`).then(response => {
      let newState = Object.assign({}, this.state);
      newState.formData['locations'].value = _.cloneDeep(response.data);
      newState.requirementsData['requiredCountries'].value = _.cloneDeep(
        response.data,
      );
      this.setState(newState);
    });
    axios.get(`${process.env.REACT_APP_URL}/Grants`).then(response => {
      let newState = Object.assign({}, this.state);

      let res = response.data.filter(a => a.id === this.props.params.id);

      for (let key in this.state.formData) {
        newState.formData[key].value = res[0][key];
      }

      newState.descriptionData.description.value = res[0].description;

      newState.requirementsData.requirementsDetails.value =
        res[0].requirementsDetails;

      // newState.formData.subjects.value.map(item => {
      //   console.log(item);
      // });

      newState.isLoading = false;
      this.setState(newState);
    });
  }

  updateForm = newState => {
    this.setState({
      formData: newState.formData,
      grantFormData: newState.grantFormData,
    });
  };

  updateDesciptiionForm = newState => {
    this.setState({
      descriptionData: newState,
    });
  };

  updateRequirementsForm = newState => {
    this.setState({
      requirementsData: newState,
    });
  };

  updateDetails = newState => {
    this.setState({
      newState,
    });
  };

  updateGrantsForm = (newState, dataId) => {
    const newData = this.state.grantFormData;
    newData[dataId] = newState;

    this.setState({
      grantFormData: newData,
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = {};

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
    }

    for (let key in this.state.descriptionData) {
      dataToSubmit[key] = this.state.descriptionData[key].value;
    }

    for (let key in this.state.requirementsData) {
      dataToSubmit[key] = this.state.requirementsData[key].value;
    }

    let details = {};
    let detailsArray = [];
    this.state.grantDetails.value.map(item => {
      if (item.grantType.value !== '') {
        for (let key in item) {
          details[key] = item[key].value;
        }
        let det = _.cloneDeep(details);
        return detailsArray.push(det);
      }
      return null;
    });

    let subject = {};
    let subjectArray = [];
    this.state.formData.subjects.value.map(item => {
      if (item.value) {
        subject = { subjectId: `${item.id}` };
        return subjectArray.push(subject);
      }
      return null;
    });

    let location = {};
    let locationArray = [];
    this.state.formData.locations.value.map(item => {
      if (item.value) {
        location = { locationId: `${item.id}` };
        return locationArray.push(location);
      }
      return null;
    });

    let requiredCountry = {};
    let requiredCountryArray = [];
    this.state.requirementsData.requiredCountries.value.map(item => {
      if (item.value) {
        requiredCountry = { locationId: `${item.id}` };
        return requiredCountryArray.push(requiredCountry);
      }
      return null;
    });

    dataToSubmit['grantDetails'] = detailsArray;
    dataToSubmit['subjects'] = subjectArray;
    dataToSubmit['locations'] = locationArray;
    dataToSubmit['requiredCountries'] = requiredCountryArray;

    console.log(this.state);
    console.log(dataToSubmit);

    // this.fileUpload(this.state.file, dataToSubmit).then(response => {
    //   console.log(response.data);
    //   console.log(response.data);
    // });

    // axios
    //   .put(`${process.env.REACT_APP_URL}/Grants/${this.props.params.id}`, dataToSubmit)
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  };

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <EditGrant
            updateForm={newState => this.updateForm(newState)}
            updateGrantsForm={(newState, dataId) =>
              this.updateGrantsForm(newState, dataId)
            }
            updateDescription={newState => this.updateDesciptiionForm(newState)}
            updateRequirements={newState =>
              this.updateRequirementsForm(newState)
            }
            updateDetails={newState => this.updateDetails(newState)}
            handleClick={name => this.handleClick(name)}
            submitForm={event => this.submitForm(event)}
            data={this.state}
            params={this.props.params}
          />
        )}
      </div>
    );
  }
}

export default EditGrantContainer;
