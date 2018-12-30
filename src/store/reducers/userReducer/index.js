import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  LOGIN_REQUEST,
} from '../../actions/actions';
import { combineReducers } from 'redux';

const initialState = {
  currentlyLoggedInUser: '',
  isAuthenticated: false,
  loading: false,
};

function currentlyLoggedInUser(
  state = initialState.currentlyLoggedInUser,
  action
) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

function isAuthenticated(state = initialState.isAuthenticated, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return true;
    case USER_LOGIN_FAILURE:
      return false;
    default:
      return state;
  }
}

function loading(state = initialState.loading, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return true;
    case USER_LOGIN_SUCCESS:
      return false;
    case USER_LOGIN_FAILURE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  loading,
  currentlyLoggedInUser,
  isAuthenticated,
});
