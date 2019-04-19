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
import AdditionalForm from '../AdditionalForm';
import './Tabs.css';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '20',
    };
  }

  componentDidMount() {
    let activeTab = '10';
    if (this.props.item) {
      activeTab = this.props.item.id + '0';
    }
    this.setState({ activeTab });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  onTabClose(dataId, i) {
    debugger;
    let activeTab;
    if (this.props.item) {
      activeTab = dataId + '0';
    }
    this.setState({ activeTab });
    this.props.onClose(dataId, i);
  }

  render() {
    return (
      <div>
        <CardHeader>{this.props.item.name}</CardHeader>
        <Nav tabs>
          {this.props.formData.value
            .filter(f => f.programCategoryId.value === this.props.item.id)
            .map((item, i) => {
              // if (item.programCategoryId.value === this.props.item.id) {
              return (
                <NavItem key={i}>
                  <NavLink
                    style={{ color: '#495057' }}
                    className={classnames({
                      active:
                        this.state.activeTab === this.props.item.id + '' + i,
                    })}
                    onClick={() => {
                      this.toggle(this.props.item.id + '' + i);
                    }}
                  >
                    {`Стипендия #${i + 1}`}{' '}
                    {i > 0 && (
                      <button
                        onClick={() => {
                          this.onTabClose(this.props.dataId, i);
                        }}
                        className="close"
                        type="button"
                      >
                        ×
                      </button>
                    )}
                  </NavLink>
                </NavItem>
              );
              // }
              // return null;
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
          {this.props.formData.value
            .filter(f => f.programCategoryId.value === this.props.item.id)
            .map((item, i) => {
              return (
                <TabPane key={i} tabId={this.props.item.id + '' + i}>
                  <CardBody>
                    <AdditionalForm
                      formData={item}
                      elementId={i}
                      dataId={this.props.dataId}
                      change={(newState, dataId) =>
                        this.props.change(newState, dataId)
                      }
                    />
                  </CardBody>
                </TabPane>
              );
            })}
        </TabContent>
      </div>
    );
  }
}
