import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, addGrantValue } from '../../actions/programActions';
import Tabs from '../../components/common/Tabs/Tabs';
import * as _ from 'lodash';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Collapse,
  FormGroup,
  Label,
  Input,
  Row,
} from 'reactstrap';
import { MdKeyboardArrowDown } from 'react-icons/md';

class GrantDetailsSection extends Component {
  constructor() {
    super();
    this.state = {
      formData: [
        {
          totalCost: {
            position: 'left',
            element: 'dropdowninput',
            value: { currency: 'KZT', amount: 0 },
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
            value: 2,
            label: true,
            labelText: 'Тип финансирования гранта/стипендии',
            config: {
              name: 'grantType_input',
              options: [
                { id: 0, name: 'Полное финансирование' },
                { id: 1, name: 'Частичное финансирование' },
              ],
            },
          },
          grantPercent: {
            position: 'left',
            element: 'inputwithradio',
            value: {
              isPercentage: true,
              currency: '%',
              amount: 0,
            },
            label: true,
            labelText: 'Покрытие стоимости обучения на одного человека',
            config: {
              name: 'grantPercent_input',
              type: 'number',
              placeholder: '',
              header: '%',
              dropdownDisabled: true,
              disabled: false,
            },
          },

          scholarship: {
            position: 'right',
            element: 'dropdowninput',
            value: { currency: 'KZT', amount: 0 },
            label: true,
            labelText: 'Ежемесячная стипендия',
            config: {
              name: 'scholarship_input',
              type: 'number',
              placeholder: '',
              header: 'Валюта',
              options: ['KZT', 'USD', 'EUR'],
              dropdownDisabled: true,
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
            value: { currency: 'месяцы', amount: 0 },
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
            value: 0,
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
            value: 0,
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
            value: 0,
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
      isOpenDetails: false,
    };
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  componentWillReceiveProps(nextProps) {
    const newState = this.state;

    if (nextProps.categories) {
      newState.grantDetails.options = nextProps.categories;
    }
  }

  handleClick = name => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  checkboxHandler = (event, dataId) => {
    let newState = this.state;
    newState.grantDetails.options &&
      newState.grantDetails.options.map((item, i) => {
        return item.id === dataId
          ? (newState.grantDetails.options[i].checked = event.target.checked)
          : null;
      });

    newState.grantDetails.options &&
      this.state.grantDetails.options.map(item => {
        const newItem = this.state.formData[0];
        newItem.programCategoryId.value = dataId;
        if (item.checked && item.id === dataId) {
          return newState.grantDetails.value.push(_.cloneDeep(newItem));
        }
        return null;
      });

    this.updateDetails(newState);
  };

  updateGrantsForm = (newState, dataId) => {
    const newData = this.state.grantDetails;
    newData[dataId] = newState;

    this.setState({
      grantDetails: newData,
    });
    this.addGrantDetails();
  };

  addGrantDetails = () => {
    let details = {};
    let detailsArray = [];
    this.state.grantDetails.value.map(item => {
      if (item.grantType.value !== '') {
        for (let key in item) {
          details[key] = item[key].value;
        }
        let det = _.cloneDeep(details);
        det.currency = det.totalCost.currency;
        det.totalCost = det.totalCost.amount;
        det.coverageType = det.grantPercent.isPercentage ? 0 : 1;
        det.grantPercent = det.grantPercent.amount;
        det.durationType = det.duration.currency === 'месяцы' ? 0 : 1;
        det.duration = det.duration.amount;
        det.scholarship = det.scholarship.amount;
        return detailsArray.push(det);
      }
      return null;
    });

    this.props.addGrantValue({ id: 'grantDetails', value: detailsArray });
  };

  updateDetails = newState => {
    this.setState({
      newState,
    });
  };

  onDublicate = dataId => {
    let newState = this.state;

    this.state.grantDetails.value
      .filter(data => data.programCategoryId.value === dataId)
      .map((item, i) => {
        if (i === 0) {
          const newItem = _.cloneDeep(item);
          return newState.grantDetails.value.push(_.cloneDeep(newItem));
        }
        return null;
      });

    this.updateDetails(newState);
    console.log('onDublicate');
    console.log(this.state.grantDetails);
  };

  onClose = (dataId, itemId) => {
    let newState = this.state;

    let modifiableArray = this.state.grantDetails.value.filter(
      data => data.programCategoryId.value === dataId,
    );

    let unmodifiableArray = this.state.grantDetails.value.filter(
      data => data.programCategoryId.value !== dataId,
    );

    let modifiedArray = modifiableArray.splice(itemId, 1);

    console.log(modifiedArray);
    newState.grantDetails.value = [...unmodifiableArray, ...modifiableArray];
    console.log(newState);
    // .map((item, i) => {
    //   if (i === itemId) {
    //     const newItem = _.cloneDeep(data);

    //     return newState.grantDetails.value.splice(itemId, 1);
    //   }
    //   return null;
    // });

    this.updateDetails(newState);
    console.log('kkk');
    console.log(this.state);
  };

  render() {
    const headerStyle = {
      padding: 0,
      transform: this.state.isOpenDetails ? 'rotate(0deg)' : 'rotate(-90deg)',
      transitionDuration: '0.3s',
      transitionProperty: 'transform',
    };

    return (
      <Col xl={12} lg={12} md={12}>
        <Card>
          <CardHeader onClick={event => this.handleClick('Details')}>
            Вид программы и стоимость гранта
            <MdKeyboardArrowDown style={headerStyle} />
          </CardHeader>
          <Collapse isOpen={this.state.isOpenDetails}>
            <CardBody>
              <Form>
                {this.state.grantDetails.options &&
                  this.state.grantDetails.options.map(item => (
                    <FormGroup check inline key={item.id}>
                      <Label check>
                        <Input
                          id={item.id}
                          type="checkbox"
                          onChange={event =>
                            this.checkboxHandler(event, item.id)
                          }
                        />{' '}
                        {item.name}
                      </Label>
                    </FormGroup>
                  ))}
              </Form>
            </CardBody>
            <Col xl={12} lg={12} md={12}>
              {this.state.grantDetails.options &&
                this.state.grantDetails.options.map((item, i) => {
                  if (item.checked) {
                    return (
                      <Row key={item.id}>
                        <Col xl={12} lg={12} md={12}>
                          <Card>
                            <Tabs
                              item={item}
                              formData={this.state.grantDetails}
                              itemId={i}
                              dataId={item.id}
                              change={(newState, dataId) =>
                                this.updateGrantsForm(newState, dataId)
                              }
                              onDublicate={dataId => this.onDublicate(dataId)}
                              onClose={(dataId, itemId) =>
                                this.onClose(dataId, itemId)
                              }
                            />
                          </Card>
                        </Col>
                      </Row>
                    );
                  }
                  return null;
                })}
            </Col>
          </Collapse>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.program.categories,
});

export default connect(
  mapStateToProps,
  { fetchCategories, addGrantValue },
)(GrantDetailsSection);
