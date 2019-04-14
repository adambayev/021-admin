import {
  FETCH_ORGANIZATIONS_REQUEST,
  CREATE_ORGANIZATION_SUCCESS,
  FETCH_GRANTS_REQUEST,
  ADD_GRANT_VALUE,
  ADD_FILE,
  FETCH_GRANTGIVERS_REQUEST,
  FETCH_SUBJECTS_REQUEST,
  FETCH_LOCATIONS_REQUEST,
  FETCH_CATEGORIES_REQUEST,
  PROGRAM_LOADING,
} from '../actions/types';

const initialState = {
  organizations: [],
  grants: [],
  file: {},
  grantsList: [],
  grantGivers: [],
  subjects: [],
  locations: [],
  categories: [],
  loading: false,
  success: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORGANIZATIONS_REQUEST:
      return {
        ...state,
        organizations: action.payload,
        loading: false,
      };
    case CREATE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        success: true,
      };
    case FETCH_GRANTS_REQUEST:
      return {
        ...state,
        grantsList: action.payload,
        loading: false,
      };
    case ADD_GRANT_VALUE:
      return {
        ...state,
        grants: { ...state.grants, [action.payload.id]: action.payload.value },
      };
    case ADD_FILE:
      return {
        ...state,
        file: action.payload,
      };
    case FETCH_GRANTGIVERS_REQUEST:
      return {
        ...state,
        grantGivers: action.payload,
        loading: false,
      };
    case FETCH_SUBJECTS_REQUEST:
      return {
        ...state,
        subjects: action.payload,
        loading: false,
      };
    case FETCH_LOCATIONS_REQUEST:
      return {
        ...state,
        locations: action.payload,
        loading: false,
      };
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case PROGRAM_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
