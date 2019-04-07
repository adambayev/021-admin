import React, { Component } from 'react';

import axios from 'axios';

import GrantsList from '../../components/Grants/List';
import Loader from '../../components/Widget/Loader';
// import TextFieldGroup from './TextFieldGroup';
import setAuthToken from './SetAuthToken';

class GrantsListContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      grants: [],
      organizations: [],
      programCategories: [],
      email: '',
      password: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  loginUser = userData => {
    axios
      .post('http://localhost:5000/api/users/login', userData)
      .then(res => {
        // Save to localStorage
        const { token } = res.data;
        // Set token to ls
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        setAuthToken(token);
        console.log(res);
        // Decode token to get user data
        // const decoded = jwt_decode(token);
        // Set current user
        // dispatch(setCurrentUser(decoded));
      })
      .catch(err => console.log(err));
  };

  fetchData() {
    axios.get(`${process.env.REACT_APP_URL}/Organizations`).then(response => {
      let newState = Object.assign({}, this.state);
      newState.organizations = response.data;
      this.setState(newState);
      axios
        .get(`${process.env.REACT_APP_URL}/ProgramCategories`)
        .then(response => {
          console.log('response.data');
          console.log(response.data);
          console.log('response.data');
          let newState = Object.assign({}, this.state);
          newState.programCategories = response.data;
          this.setState(newState);
          console.log('programCategories');
          console.log(newState.programCategories);
          console.log('programCategories');
          axios.get(`${process.env.REACT_APP_URL}/Grants`).then(response => {
            let newState = Object.assign({}, this.state);
            newState.grants = response.data;
            this.setState(newState);
            this.setState({ isLoading: false });
          });
        });
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    // const { errors } = this.state;

    return (
      <div>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <GrantsList
              grantList={this.state.grants}
              organizations={this.state.organizations}
              programCategories={this.state.programCategories}
            />
            {/* <div className="login">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <p className="lead text-center">
                      Sign in to your DevConnector account
                    </p>
                    <form onSubmit={this.onSubmit}>
                      <TextFieldGroup
                        placeholder="Email Address"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                      />
                      <TextFieldGroup
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        error={errors.password}
                      />
                      <input
                        type="submit"
                        className="btn btn-info btn-block mt-4"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div> */}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default GrantsListContainer;
