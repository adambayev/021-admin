import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import programReducer from './programReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  program: programReducer,
});
