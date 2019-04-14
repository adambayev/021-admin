import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import {
  GrantsPage,
  CreateGrant,
} from './components/pages/GrantsAndScholarship/GrantsPage';
import {
  OrganizationsPage,
  CreateOrganization,
} from './components/pages/GrantsAndScholarship/Organizations';
import { EmptyLayout, LayoutRoute, MainLayout } from './components/layout';
import PrivateRoute from './components/common/PrivateRoute';

import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './styles/reduction.scss';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              layout={MainLayout}
              component={CreateGrant}
            />
            <LayoutRoute
              exact
              path="/register"
              layout={EmptyLayout}
              component={Register}
            />
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={Login}
            />
            <LayoutRoute
              exact
              path="/grants"
              layout={MainLayout}
              component={GrantsPage}
            />
            <LayoutRoute
              exact
              path="/grants/add"
              layout={MainLayout}
              component={CreateGrant}
            />
            <LayoutRoute
              exact
              path="/organizations"
              layout={MainLayout}
              component={OrganizationsPage}
            />
            <LayoutRoute
              exact
              path="/organizations/add"
              layout={MainLayout}
              component={CreateOrganization}
            />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
