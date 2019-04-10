import {
  FETCH_ORGANIZATIONS_REQUEST,
  ORGANIZATIONS_LOADING,
  FETCH_GRANTS_REQUEST,
  CREATE_ORGANIZATION_SUCCESS,
} from '../actions/types';

const initialState = {
  organizations: [],
  grants: [],
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
    case ORGANIZATIONS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        success: true,
      };
    case FETCH_GRANTS_REQUEST:
      return {
        ...state,
        grants: action.payload,
      };
    default:
      return state;
  }
}
