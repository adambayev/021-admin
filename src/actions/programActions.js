import axios from 'axios';
import {
  FETCH_ORGANIZATIONS_REQUEST,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_FAILURE,
  FETCH_GRANTS_REQUEST,
  FETCH_PAGED_GRANTS_REQUEST,
  CREATE_GRANT_SUCCESS,
  CREATE_GRANT_FAILURE,
  ADD_GRANT_VALUE,
  ADD_FILE,
  ADD_ATTACHMENTS,
  REMOVE_ATTACHMENTS,
  FETCH_GRANTGIVERS_REQUEST,
  FETCH_SUBJECTS_REQUEST,
  FETCH_LOCATIONS_REQUEST,
  FETCH_CATEGORIES_REQUEST,
  PROGRAM_LOADING,
} from './types';
import { URL } from '../config';

export const fetchOrganizations = () => dispatch => {
  dispatch(setProgramLoading());
  axios.get(`${URL}/organizations`).then(response => {
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
  dispatch(setProgramLoading());
  axios.get(`${URL}/grants`).then(response => {
    dispatch({
      type: FETCH_GRANTS_REQUEST,
      payload: response.data.data,
    });
  });
};

export const fetchPagedGrants = (page, size) => dispatch => {
  dispatch(setProgramLoading());
  axios.get(`${URL}/grants/${page}/${size}`).then(response => {
    dispatch({
      type: FETCH_PAGED_GRANTS_REQUEST,
      payload: response.data.data,
    });
  });
};

export const createGrant = (file, attachments, data) => dispatch => {
  fileUpload(file, attachments, data).then(response => {
    response.data.ok
      ? dispatch({
          type: CREATE_GRANT_SUCCESS,
          payload: response.data.ok,
        })
      : dispatch({
          type: CREATE_GRANT_FAILURE,
          payload: response.data.ok,
        });
  });
};

const fileUpload = (file, attachments, data) => {
  const url = `${URL}/Grants/file`;
  const formData = new FormData();
  formData.append('file', file);
  for (let i = 0; i < attachments.length; i++) {
    formData.append('attachments', attachments[i]);
  }
  formData.append('grant', JSON.stringify(data));
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  return axios.post(url, formData, config);
};

export const addGrantValue = data => dispatch => {
  dispatch({
    type: ADD_GRANT_VALUE,
    payload: data,
  });
};

export const addFile = data => dispatch => {
  dispatch({
    type: ADD_FILE,
    payload: data,
  });
};

export const addAttachments = data => dispatch => {
  dispatch({
    type: ADD_ATTACHMENTS,
    payload: data,
  });
};

export const removeAttachments = id => dispatch => {
  dispatch({
    type: REMOVE_ATTACHMENTS,
    payload: id,
  });
};

export const fetchGrantGivers = () => dispatch => {
  dispatch(setProgramLoading());
  axios.get(`${URL}/grantgivers`).then(response => {
    dispatch({
      type: FETCH_GRANTGIVERS_REQUEST,
      payload: response.data.data,
    });
  });
};

export const fetchSubjects = () => dispatch => {
  dispatch(setProgramLoading());
  axios.get(`${URL}/content/subjects`).then(response => {
    dispatch({
      type: FETCH_SUBJECTS_REQUEST,
      payload: response.data,
    });
  });
};

export const fetchLocations = () => dispatch => {
  dispatch(setProgramLoading());
  axios.get(`${URL}/locations`).then(response => {
    dispatch({
      type: FETCH_LOCATIONS_REQUEST,
      payload: response.data.data,
    });
  });
};

export const fetchCategories = () => dispatch => {
  dispatch(setProgramLoading());
  axios.get(`${URL}/programcategories`).then(response => {
    dispatch({
      type: FETCH_CATEGORIES_REQUEST,
      payload: response.data.data,
    });
  });
};

export const setProgramLoading = () => {
  return {
    type: PROGRAM_LOADING,
  };
};
