import {
  GET_USER,
  GET_USER_FAIL,
  LOGOUT,
  GET_LESSONS,
  GET_LESSONS_FAIL
} from '../constants';

const initialState = {
  user: {},
  isLoading: false,
  isAdmin: false,
  lessons: []
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      // set local storage with token?
      // localStorage.setItem({ token: action.token });
      return {
        ...state,
        user: action.payload,
        isAdmin: action.payload.accountType === 'admin' ? true : false,
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

    case GET_LESSONS:
      return {
        ...state,
        lessons: action.payload
      };

    case GET_LESSONS_FAIL:
      return {
        ...state,
        error: 'Failed to fetch user.'
      };
    default:
      return state;
  }
};
