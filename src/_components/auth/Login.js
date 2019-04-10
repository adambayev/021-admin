import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Card,
  Label,
  FormFeedback,
} from 'reactstrap';
import logo200Image from 'assets/img/logo/logo_200.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors.errors });
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log(userData);

    this.props.loginUser(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value, errors: {} });
  };

  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
    } = this.props;

    const { errors } = this.state;

    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Col md={6} lg={4}>
          <Card body>
            <Form onSubmit={this.handleSubmit}>
              {showLogo && (
                <div className="text-center pb-4">
                  <img
                    src={logo200Image}
                    className="rounded"
                    style={{ width: 60, height: 60, cursor: 'pointer' }}
                    alt="logo"
                  />
                </div>
              )}
              <FormGroup>
                <Label for={usernameLabel}>{usernameLabel}</Label>
                <Input
                  invalid={errors && errors.Email ? true : false}
                  {...usernameInputProps}
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                {errors && errors.Email && (
                  <FormFeedback>{errors.Email[0]}</FormFeedback>
                )}
              </FormGroup>
              <FormGroup>
                <Label for={passwordLabel}>{passwordLabel}</Label>
                <Input
                  invalid={errors && errors.Password ? true : false}
                  {...passwordInputProps}
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                {errors && errors.Password && (
                  <FormFeedback>{errors.Password[0]}</FormFeedback>
                )}
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" />{' '}
                  {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
                </Label>
              </FormGroup>
              <hr />
              <Button
                size="lg"
                className="bg-gradient-theme-left border-0"
                block
                onClick={this.handleSubmit}
              >
                Login
              </Button>
              <div className="text-center pt-1">
                <h6>or</h6>
                <h6>
                  <Link to="/register">Signup</Link>
                </h6>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

Login.defaultProps = {
  showLogo: true,
  usernameLabel: 'Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { loginUser },
)(Login);
