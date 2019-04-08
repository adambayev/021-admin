import {
  FETCH_ORGANIZATIONS_REQUEST,
  FETCH_GRANTS_REQUEST,
} from '../actions/types';

const initialState = {
  organizations: [],
  grants: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORGANIZATIONS_REQUEST:
      return {
        ...state,
        organizations: action.payload,
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
