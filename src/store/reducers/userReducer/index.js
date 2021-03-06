import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  LOGIN_REQUEST,
  USER_LOGOUT,
} from '../../actions/actions';
import { combineReducers } from 'redux';

const initialState = {
  currentlyLoggedInUser: '',
  isLoggedIn: false,
  loading: false,
  token: '',
  isAdmin: false,
};

function token(state = initialState.token, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return action.payload.token;
    case USER_LOGOUT:
      return initialState.token;
    default:
      return state;
  }
}
function currentlyLoggedInUser(
  state = initialState.currentlyLoggedInUser,
  action
) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return action.payload.username;
    case USER_LOGOUT:
      return initialState.currentlyLoggedInUser;
    default:
      return state;
  }
}

function isLoggedIn(state = initialState.isLoggedIn, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return true;
    case USER_LOGIN_FAILURE:
    case USER_LOGOUT:
      return false;
    default:
      return state;
  }
}

function isAdmin(state = initialState.isAdmin, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return action.payload.isAdmin || false;
    case USER_LOGOUT:
      return initialState.isAdmin;
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
  isLoggedIn,
  token,
  isAdmin,
});
