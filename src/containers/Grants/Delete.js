import React, { Component } from 'react';

import axios from 'axios';

import * as _ from 'lodash';
import DeleteGrant from '../../components/Grants/Delete';
import Loader from '../../components/Widget/Loader';

class DeleteGrantContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
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
          labelText: 'Сайт организатора',
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
          labelText: 'Подача заявки',
          config: {
            name: 'request_input',
            type: 'url',
            placeholder: 'Enter your link',
          },
        },
        grantAssignment: {
          position: 'right',
          element: 'select',
          value: '',
          label: true,
          labelText: 'Присвоение гранта/стипендии',
          config: {
            name: 'grantAssignment_input',
            options: [
              { id: 0, name: 'До поступления' },
              { id: 1, name: 'После поступления' },
            ],
          },
        },
        grantGiverId: {
          position: 'left',
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
          position: 'right',
          element: 'multipleselect',
          value: [],
          label: true,
          labelText: 'Сфера/ Дисциплина',
          config: {
            name: 'subjects_input',
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
        shortDescription: {
          position: 'left',
          element: 'textarea',
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
          element: 'textarea',
          value: '',
          label: true,
          labelText: 'Полное описание гранта/стипендии',
          config: {
            name: 'description_input',
            rows: 8,
            cols: 36,
          },
        },
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
        locations: {
          position: 'left',
          element: 'multipleselect',
          value: [],
          label: true,
          labelText: 'Местоположение',
          config: {
            name: 'locations_input',
            options: [],
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
        endDate: {
          position: 'right',
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
        grantDetails: {
          position: 'left',
          element: 'multipleselect',
          value: [],
          label: true,
          labelText: 'Детали гранта',
          config: {
            name: 'grantDetails_input',
            options: [],
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
      isOpenDetails: false,
    };
  }

  async fetchData() {
    console.log('this.state.formData.programCategories');
    console.log(this.state.formData.programCategories);
    const response = await axios
      .get(`${process.env.REACT_APP_URL}/ProgramCategories`)
      .then(response => {
        let newState = Object.assign({}, this.state);
        response.data.map(item => {
          newState.checkboxData.programCategories.value.push({
            id: item.id,
            value: false,
            label: true,
            labelText: item.name,
            config: {
              name: 'programCategoryId_input',
            },
          });
          let temp = _.cloneDeep(this.state.grantFormData[0]);
          temp.id = item.id;
          newState.grantFormData.push(temp);
        });

        newState.isLoading = false;
        this.setState(newState);
        //this.setState({ isLoading: false });
      });
  }

  componentWillMount() {
    axios
      .get(`${process.env.REACT_APP_URL}/ProgramCategories`)
      .then(response => {
        let newState = Object.assign({}, this.state);
        newState.formData['grantDetails'].value = response.data;
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
      newState.formData['requiredCountries'].value = _.cloneDeep(response.data);
      this.setState(newState);
    });
    axios.get(`${process.env.REACT_APP_URL}/Grants`).then(response => {
      let newState = Object.assign({}, this.state);

      let res = response.data.filter(a => a.id == this.props.params.id);

      for (let key in this.state.formData) {
        newState.formData[key].value = res[0][key];
      }

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

    dataToSubmit.id = this.props.params.id;

    axios
      .delete(
        `${process.env.REACT_APP_URL}/Grants/${this.props.params.id}`,
        dataToSubmit,
      )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <DeleteGrant
            updateForm={newState => this.updateForm(newState)}
            updateGrantsForm={(newState, dataId) =>
              this.updateGrantsForm(newState, dataId)
            }
            submitForm={event => this.submitForm(event)}
            data={this.state}
            params={this.props.params}
          />
        )}
      </div>
    );
  }
}

export default DeleteGrantContainer;
