import { GET_USER, GET_USER_FAIL, LOGOUT } from '../constants';

const initialState = {
  user: {},
  isLoading: false,
  isAdmin: false
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      // set local storage with token?
      localStorage.setItem({ token: action.token });
      return {
        ...state,
        user: action.payload,
        isAdmin: action.payload.admin,
        error: ''
      };

    case GET_USER_FAIL:
      return {
        ...state,
        error: 'Failed to fetch user.'
      };
    case LOGOUT:
      // destroy token?
      return state;

    default:
      return state;
  }
};
