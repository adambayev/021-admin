import axios from 'axios';
import {
  FETCH_ORGANIZATIONS_REQUEST,
  FETCH_GRANTS_REQUEST,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_FAILURE,
} from './types';
import { URL } from '../config';

export const fetchOrganizations = () => dispatch => {
  axios.get(`${URL}/Organizations`).then(response => {
    dispatch({
      type: FETCH_ORGANIZATIONS_REQUEST,
      payload: response.data.data,
    });
  });
};

export const createOrganization = data => dispatch => {
  axios
    .post(`${URL}/organizations`, data)
    .then(response => {
      dispatch({
        type: CREATE_ORGANIZATION_SUCCESS,
        payload: response.data.ok,
      });
    })
    .catch(err => {
      dispatch({
        type: CREATE_ORGANIZATION_FAILURE,
        payload: err,
      });
    });
};

export const fetchGrants = () => dispatch => {
  axios.get(`${URL}/Grants`).then(response => {
    dispatch({
      type: FETCH_GRANTS_REQUEST,
      payload: response.data.data,
    });
  });
};
