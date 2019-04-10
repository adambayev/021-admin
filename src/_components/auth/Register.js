import logo200Image from 'assets/img/logo/logo_200.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
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
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    const newUser = {
      nickName: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.password2,
    };

    console.log(newUser);

    this.props.registerUser(newUser, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      showLogo,
      nameLabel,
      nameInputProps,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
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
                <Label for={nameLabel}>{nameLabel}</Label>
                <Input
                  {...nameInputProps}
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </FormGroup>
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
              <FormGroup>
                <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
                <Input
                  {...confirmPasswordInputProps}
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
              </FormGroup>
              <Button
                size="lg"
                className="bg-gradient-theme-left border-0"
                block
                onClick={this.handleSubmit}
              >
                Signup
              </Button>

              <div className="text-center pt-1">
                <h6>or</h6>
                <h6>
                  <Link to="/login">Login</Link>
                </h6>
              </div>
              {errors.name && <div>Error</div>}
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

Register.defaultProps = {
  showLogo: true,
  nameLabel: 'Name',
  nameInputProps: {
    type: 'text',
    placeholder: 'your name',
  },
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
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { registerUser },
)(withRouter(Register));
