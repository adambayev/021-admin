import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
// import jwt_decode from 'jwt-decode';

//const URL = process.env.REACT_APP_URL;
import { URL } from '../config';

export const registerUser = (userData, history) => dispatch => {
  debugger;
  axios
    .post(`${URL}/Users/register`, userData)
    .then(response => {
      response.ok
        ? history.push('/login')
        : dispatch({
            type: GET_ERRORS,
            payload: response.message,
          });
    })
    .catch(response =>
      dispatch({
        type: GET_ERRORS,
        payload: response.message,
      }),
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post(`${URL}/users/login`, userData)
    .then(res => {
      const token = res.data.data.tokens.accessToken;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      // const decoded = jwt_decode(token);
      dispatch(setCurrentUser(res.data.data.user));
    })
    .catch(err => {
      const errors = err.response.data.errors;
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
