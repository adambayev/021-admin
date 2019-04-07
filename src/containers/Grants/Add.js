import React, { Component } from 'react';

import AddGrant from '../../components/Grants/Add';
import axios from 'axios';
import * as _ from 'lodash';

class AddGrantContainer extends Component {
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
            name: 'programCategoryId_input',
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
        isDeadline: {
          position: 'right',
          element: 'switch',
          value: true,
          label: true,
          labelText: 'Бессрочный',
          config: {
            label: 'Бессрочный',
            name: 'deadline_input',
            type: 'number',
            placeholder: '',
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
        deadlineStarts: {
          position: 'right',
          element: 'input',
          value: '',
          label: true,
          labelText: 'Начало приема заявок',
          config: {
            disabled: true,
            name: 'startDate_input',
            type: 'date',
            placeholder: 'Выберит дату',
          },
        },
        empty: {
          position: 'left',
        },
        deadlineEnds: {
          position: 'right',
          element: 'input',
          value: '',
          label: true,
          labelText: 'Конец приема заявок',
          config: {
            disabled: true,
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
          value: { min: 18, max: 99 },
          label: true,
          labelText: 'Требования по возрасту',
          config: {
            name: 'requiredAgeFrom_input',
            type: 'number',
            placeholder: 'Enter',
            minValue: 1,
            maxValue: 99,
          },
        },
      },
      processData: {
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
          element: 'file',
          value: ['file'],
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
      grantFormData: [
        {
          totalCost: {
            position: 'left',
            element: 'dropdowninput',
            value: { currency: 'KZT' },
            label: true,
            labelText: 'Стоимость обучения в год',
            config: {
              name: 'totalCost_input',
              type: 'number',
              placeholder: '',
              header: 'Валюта',
              options: ['KZT', 'USD', 'EUR'],
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
          grantPercent: {
            position: 'left',
            element: 'inputwithradio',
            value: {
              isPercentage: true,
              currency: '%',
              amount: '',
            },
            label: true,
            labelText: 'Покрытие стоимости обучения на одного человека',
            config: {
              name: 'grantPercent_input',
              type: 'number',
              placeholder: '',
              header: '%',
            },
          },

          scholarship: {
            position: 'right',
            element: 'dropdowninput',
            value: { currency: 'KZT' },
            label: true,
            labelText: 'Ежемесячная стипендия',
            config: {
              name: 'scholarship_input',
              type: 'number',
              placeholder: '',
              header: 'Валюта',
              options: ['KZT', 'USD', 'EUR'],
            },
          },
          flights: {
            position: 'left',
            element: 'switch',
            value: false,
            label: true,
            labelText: 'Сумма на перелеты',
            config: {
              name: 'flights_input',
              type: 'number',
              placeholder: '',
            },
          },
          duration: {
            position: 'right',
            element: 'dropdowninput',
            value: { currency: 'месяцы', amount: '' },
            label: true,
            labelText: 'Длительность программы',
            config: {
              name: 'duration_input',
              type: 'number',
              placeholder: '',
              header: 'Период',
              options: ['месяцы', 'годы'],
            },
          },
          amount: {
            position: 'left',
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
          grantSum: {
            position: 'right',
            element: 'input',
            value: '',
            label: true,
            labelText: 'Общая сумма гранта на человека',
            config: {
              disabled: true,
              name: 'grantSum_input',
              type: 'number',
              placeholder: '',
            },
          },
          empty: {
            position: 'left',
          },
          totalFund: {
            position: 'right',
            element: 'input',
            value: '',
            label: true,
            labelText: 'Общий стипендиальный фонд',
            config: {
              disabled: true,
              name: 'totalFund_input',
              type: 'number',
              placeholder: '',
            },
          },
          programCategoryId: {
            value: 0,
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
      isOpenProcessOfFiling: false,
      isOpenProgramCategories: false,
      file: '',
      error: null,
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
        newState['grantDetails'].options = response.data.data;
        this.setState(newState);
      });
    axios.get(`${process.env.REACT_APP_URL}/Organizations`).then(response => {
      let newState = Object.assign({}, this.state);
      newState.formData['organizationId'].config.options = response.data.data;
      this.setState(newState);
    });
    axios.get(`${process.env.REACT_APP_URL}/GrantGivers`).then(response => {
      let newState = Object.assign({}, this.state);
      newState.formData['grantGiverId'].config.options = response.data.data;
      this.setState(newState);
    });
    axios
      .get(`${process.env.REACT_APP_URL}/Content/subjects`)
      .then(response => {
        let newState = Object.assign({}, this.state);
        newState.formData['subjects'].config.options = response.data;
        this.setState(newState);
      });
    axios.get(`${process.env.REACT_APP_URL}/locations`).then(response => {
      let newState = Object.assign({}, this.state);
      newState.formData['locations'].config.options = _.cloneDeep(
        response.data.data,
      );
      newState.requirementsData[
        'requiredCountries'
      ].config.options = _.cloneDeep(response.data.data);
      this.setState(newState);
    });
  }

  updateForm = newState => {
    this.setState({
      formData: newState.formData,
      grantFormData: newState.grantFormData,
      isOpenDetails: newState.isOpenDetails,
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

  updateProcessForm = newState => {
    this.setState({
      processData: newState,
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

    for (let key in this.state.processData) {
      dataToSubmit[key] = this.state.processData[key].value;
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

    dataToSubmit.requiredAgeFrom = this.state.requirementsData.requiredAge.value.min;
    dataToSubmit.requiredAgeTo = this.state.requirementsData.requiredAge.value.max;

    dataToSubmit['grantDetails'] = detailsArray;
    dataToSubmit['subjects'] = subjectArray;
    dataToSubmit['locations'] = locationArray;
    dataToSubmit['requiredCountries'] = requiredCountryArray;

    console.log(this.state);
    console.log(dataToSubmit);

    this.fileUpload(this.state.file, dataToSubmit).then(response => {
      console.log(response.data);
      response.data.ok
        ? this.setState({ error: 'Данные успешно выгрузились' })
        : this.setState({ error: 'Произошла ошибка при выгрузке данных' });
    });

    // axios
    //   .post(`${process.env.REACT_APP_URL}/Grants`, dataToSubmit)
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  };

  fileUpload(file, data) {
    const url = `${process.env.REACT_APP_URL}/Grants/file`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('grant', JSON.stringify(data));
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return axios.post(url, formData, config);
  }

  render() {
    return (
      <React.Fragment>
        <AddGrant
          updateForm={newState => this.updateForm(newState)}
          updateGrantsForm={(newState, dataId) =>
            this.updateGrantsForm(newState, dataId)
          }
          updateDescription={newState => this.updateDesciptiionForm(newState)}
          updateRequirements={newState => this.updateRequirementsForm(newState)}
          updateProcess={newState => this.updateProcessForm(newState)}
          updateDetails={newState => this.updateDetails(newState)}
          handleClick={name => this.handleClick(name)}
          submitForm={event => this.submitForm(event)}
          data={this.state}
          error={this.state.error}
        />
      </React.Fragment>
    );
  }
}

export default AddGrantContainer;
