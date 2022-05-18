import {
  REGISTRATION_SUCCESS,
  // REGISTRATION_FAIL,
  GET_MY_USER_PROFILE,
  LOGIN_SUCCESS,
  // LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  //
  UPDATE_MY_PROFILE,
  USER_ERROR,
  //
  GET_MY_BASKET,
  GET_MY_FAVORITES
  //   GET_MY_ORDERS
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  basket: null,
  favorites: null,
  //   orders: null,
  error: {}
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MY_USER_PROFILE:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case GET_MY_BASKET:
      return {
        ...state,
        loading: false,
        basket: payload
      };
    case GET_MY_FAVORITES:
      return {
        ...state,
        loading: false,
        favorites: payload
      };
    // case GET_MY_ORDERS:
    //   return {
    //     ...state,
    //     loading: false,
    //     orders: payload
    //   };
    case UPDATE_MY_PROFILE:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case REGISTRATION_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        user: null
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}

export default userReducer;
