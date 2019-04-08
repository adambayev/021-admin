import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';

import Avatar from '../../common/Avatar';
import { UserCard } from '../../common/Card';
// import Notifications from 'components/Notifications';
import SearchInput from '../../common/SearchInput';
// import { notificationsData } from 'demos/header';
// import withBadge from 'hocs/withBadge';
import {
  MdClearAll,
  MdExitToApp,
  MdHelp,
  MdInsertChart,
  MdMessage,
  MdPersonPin,
  MdSettingsApplications,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import bn from '../../../utils/bemnames';

const bem = bn.create('header');

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
          <SearchInput />
        </Nav>

        {isAuthenticated && (
          <Nav navbar className={bem.e('nav-right')}>
            <NavItem>
              <NavLink id="Popover2">
                <Avatar
                  onClick={this.toggleUserCardPopover}
                  className="can-click"
                />
              </NavLink>
              <Popover
                placement="bottom-end"
                isOpen={this.state.isOpenUserCardPopover}
                toggle={this.toggleUserCardPopover}
                target="Popover2"
                className="p-0 border-0"
                style={{ minWidth: 250 }}
              >
                <PopoverBody className="p-0 border-light">
                  <UserCard
                    title="Admin"
                    subtitle={user.email}
                    text="Last updated 3 mins ago"
                    className="border-light"
                  >
                    <ListGroup flush>
                      <ListGroupItem
                        tag="button"
                        action
                        className="border-light"
                      >
                        <MdPersonPin /> Profile
                      </ListGroupItem>
                      <ListGroupItem
                        tag="button"
                        action
                        className="border-light"
                      >
                        <MdInsertChart /> Stats
                      </ListGroupItem>
                      <ListGroupItem
                        tag="button"
                        action
                        className="border-light"
                      >
                        <MdMessage /> Messages
                      </ListGroupItem>
                      <ListGroupItem
                        tag="button"
                        action
                        className="border-light"
                      >
                        <MdSettingsApplications /> Settings
                      </ListGroupItem>
                      <ListGroupItem
                        tag="button"
                        action
                        className="border-light"
                      >
                        <MdHelp /> Help
                      </ListGroupItem>
                      <ListGroupItem
                        tag="button"
                        action
                        className="border-light"
                        onClick={this.onLogoutClick}
                      >
                        <MdExitToApp /> Signout
                      </ListGroupItem>
                    </ListGroup>
                  </UserCard>
                </PopoverBody>
              </Popover>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser },
)(Header);
