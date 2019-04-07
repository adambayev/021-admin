import React from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardHeader,
  CardBody,
} from 'reactstrap';
import classnames from 'classnames';
import AdditionalForm from '../../components/Widget/AdditionalForm';
import './Tabs.css';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 0,
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  render() {
    return (
      <div>
        <CardHeader>{this.props.item.name}</CardHeader>
        <Nav tabs>
          {this.props.formData.value.map((item, i) => {
            console.log(this.props);
            if (item.programCategoryId.value === this.props.item.id) {
              return (
                <NavItem key={i}>
                  <NavLink
                    style={{ color: '#495057' }}
                    className={classnames({
                      active: this.state.activeTab === i,
                    })}
                    onClick={() => {
                      this.toggle(i);
                    }}
                  >
                    {`Стипендия #${i + 1}`}
                  </NavLink>
                </NavItem>
              );
            }
            return null;
          })}
          <NavItem>
            <NavLink
              style={{ color: '#495057' }}
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                //this.toggle('2');
                this.props.onDublicate(this.props.dataId);
              }}
            >
              +
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          {this.props.formData.value.map((item, i) => {
            console.log('this.props');
            console.log(this.props);
            if (item.programCategoryId.value === this.props.item.id) {
              return (
                <TabPane key={i} tabId={i}>
                  <CardBody>
                    <AdditionalForm
                      formData={this.props.formData.value[i]}
                      elementId={i}
                      dataId={this.props.dataId}
                      change={(newState, dataId) =>
                        this.props.change(newState, dataId)
                      }
                    />
                  </CardBody>
                </TabPane>
              );
            }
            return null;
          })}
        </TabContent>
      </div>
    );
  }
}
