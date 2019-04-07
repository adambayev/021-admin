import { STATE_SIGNUP } from 'components/AuthForm';
// import { STATE_LOGIN } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import AuthModalPage from 'pages/AuthModalPage';
import AuthPage from 'pages/AuthPage';
// pages
//import DashboardPage from 'pages/DashboardPage';
import Login from './containers/Login';
import GrantPage from 'pages/Grants/GrantPage';
import AddGrant from 'pages/Grants/AddGrant';
import EditGrant from 'pages/Grants/EditGrant';
import DeleteGrant from 'pages/Grants/DeleteGrant';
import GrantGiverPage from 'pages/GrantGivers/GrantGiverPage';
import AddGrantGiver from 'pages/GrantGivers/AddGrantGiver';
import EditGrantGiver from 'pages/GrantGivers/EditGrantGiver';
import DeleteGrantGiver from 'pages/GrantGivers/DeleteGrantGiver';
import SubjectPage from 'pages/Subjects/SubjectPage';
import AddSubject from 'pages/Subjects/AddSubject';
import EditSubject from 'pages/Subjects/EditSubject';
import DeleteSubject from 'pages/Subjects/DeleteSubject';
import OrganizationPage from 'pages/Organizations/OrganizationPage';
import AddOrganization from 'pages/Organizations/AddOrganization';
import EditOrganization from 'pages/Organizations/EditOrganization';
import DeleteOrganization from 'pages/Organizations/DeleteOrganization';
import ProgramCategoryPage from 'pages/ProgramCategories/ProgramCategoryPage';
import AddProgramCategory from 'pages/ProgramCategories/AddProgramCategory';
import EditProgramCategory from 'pages/ProgramCategories/EditProgramCategory';
import DeleteProgramCategory from 'pages/ProgramCategories/DeleteProgramCategory';
import ProgramPage from 'pages/ProgramPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './styles/reduction.scss';

// const getBasename = () => {
//   return `/${process.env.PUBLIC_URL.split('/').pop()}`;
// };

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={Login}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />
            <LayoutRoute
              exact
              path="/login-modal"
              layout={MainLayout}
              component={AuthModalPage}
            />
            <LayoutRoute
              exact
              path="/"
              layout={MainLayout}
              component={AddGrant}
            />
            <LayoutRoute
              exact
              path="/register"
              layout={MainLayout}
              component={AuthPage}
            />
            <LayoutRoute
              exact
              path="/grants"
              layout={MainLayout}
              component={GrantPage}
            />
            <LayoutRoute
              exact
              path="/grants/add"
              layout={MainLayout}
              component={AddGrant}
            />
            <LayoutRoute
              exact
              path="/grants/edit/:id"
              layout={MainLayout}
              component={EditGrant}
            />
            <LayoutRoute
              exact
              path="/grants/delete/:id"
              layout={MainLayout}
              component={DeleteGrant}
            />
            <LayoutRoute
              exact
              path="/grantgivers"
              layout={MainLayout}
              component={GrantGiverPage}
            />
            <LayoutRoute
              exact
              path="/grantgivers/add"
              layout={MainLayout}
              component={AddGrantGiver}
            />
            <LayoutRoute
              exact
              path="/grantgivers/edit/:id"
              layout={MainLayout}
              component={EditGrantGiver}
            />
            <LayoutRoute
              exact
              path="/grantgivers/delete/:id"
              layout={MainLayout}
              component={DeleteGrantGiver}
            />
            <LayoutRoute
              exact
              path="/subjects"
              layout={MainLayout}
              component={SubjectPage}
            />
            <LayoutRoute
              exact
              path="/subjects/add"
              layout={MainLayout}
              component={AddSubject}
            />
            <LayoutRoute
              exact
              path="/subjects/edit/:id"
              layout={MainLayout}
              component={EditSubject}
            />
            <LayoutRoute
              exact
              path="/subjects/delete/:id"
              layout={MainLayout}
              component={DeleteSubject}
            />
            <LayoutRoute
              exact
              path="/organizations"
              layout={MainLayout}
              component={OrganizationPage}
            />
            <LayoutRoute
              exact
              path="/organizations/add"
              layout={MainLayout}
              component={AddOrganization}
            />
            <LayoutRoute
              exact
              path="/organizations/edit/:id"
              layout={MainLayout}
              component={EditOrganization}
            />
            <LayoutRoute
              exact
              path="/organizations/delete/:id"
              layout={MainLayout}
              component={DeleteOrganization}
            />
            <LayoutRoute
              exact
              path="/programcategories"
              layout={MainLayout}
              component={ProgramCategoryPage}
            />
            <LayoutRoute
              exact
              path="/programcategories/add"
              layout={MainLayout}
              component={AddProgramCategory}
            />
            <LayoutRoute
              exact
              path="/programcategories/edit/:id"
              layout={MainLayout}
              component={EditProgramCategory}
            />
            <LayoutRoute
              exact
              path="/programcategories/delete/:id"
              layout={MainLayout}
              component={DeleteProgramCategory}
            />
            <LayoutRoute
              exact
              path="/programs"
              layout={MainLayout}
              component={ProgramPage}
            />
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
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
