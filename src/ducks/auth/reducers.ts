import {
  LOGOUT_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  USER_CONFIRM,
  START_LOADING,
  DONE_LOADING,
  RESET_MESSAGE,
  RESET_PASSWORD,
  EMAIL_CHANGED,
  PASSWORD_CHANGED
} from "./types";
import { AnyAction } from "redux";
import reduceReducers from "reduce-reducers";

const initialAuthState = {
  email: "",
  password: "",
  user: null,
  error: "",
  confirmation: "",
  loading: false,
  registered: false,
  showPassword: "",
  showPopup: false
};

const registerReducer = (state = initialAuthState, action: AnyAction) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS: {
      const { message, password } = action.payload;
      return {
        ...state,
        confirmation: message,
        showPassword: password,
        showPopup: true
      };
    }
    case USER_CONFIRM:
      return {
        ...state,
        showPopup: false
      };
    default:
      return state;
  }
};

const loginReducer = (state = initialAuthState, action: AnyAction) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

const formReducer = (state = initialAuthState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };
    case DONE_LOADING:
      return { ...state, loading: false };
    case RESET_PASSWORD:
      return { ...state, password: "" };
    case RESET_MESSAGE:
      return { ...state, error: "", confirmation: "" };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default reduceReducers(registerReducer, formReducer, loginReducer);
