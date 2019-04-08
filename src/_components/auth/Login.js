import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Card,
  Label,
} from 'reactstrap';
import logo200Image from 'assets/img/logo/logo_200.png';
import { loginUser } from '../../actions/authActions';

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
      this.setState({ errors: nextProps.errors });
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
    this.setState({ [e.target.name]: e.target.value });
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
                  {...usernameInputProps}
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for={passwordLabel}>{passwordLabel}</Label>
                <Input
                  {...passwordInputProps}
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </FormGroup>
              <Button
                size="lg"
                className="bg-gradient-theme-left border-0"
                block
                onClick={this.handleSubmit}
              >
                Login
              </Button>
              {errors.name && <div>Error</div>}
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
