import {
  CHECK_LOGIN,
  LOGIN_USER_SUCCESSFUL,
  API_ERROR,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGIN_USER
} from "./actionTypes";

const initialState = {
  user: {},
  tokens: {},
  loginError: null,
  loading: false,
  userID: ''
};

const login = (state = initialState, action) => {

  switch (action.type) {

    case LOGIN_USER: 
      break;

    case CHECK_LOGIN:      
      break;
    case LOGIN_USER_SUCCESSFUL:        
      state = {
        ...state,
        loading: false,
        user: action.payload.user,
        userID: action.payload.user._id, // Include user data in the state
        tokens: action.payload.tokens, // Include token data in the state
      };
      break;
    case LOGOUT_USER:      
      state = initialState;
      break;

    case LOGOUT_USER_SUCCESS:
      
      state = initialState;
      break;

    case API_ERROR:
      state = {
        ...state,
        loading: false,
        loginError: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
