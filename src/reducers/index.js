import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import grantReducer from './grantReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  grant: grantReducer,
});
