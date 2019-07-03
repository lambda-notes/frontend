import {
  GET_USER,
  GET_USER_FAIL,
  LOGOUT,
  GET_LESSONS,
  GET_LESSONS_FAIL,
  LESSON_CLICKED,
  SPRINT_CLICKED,
  SET_USER
} from '../constants';

const initialState = {
  user: {},
  isLoading: false,
  isAdmin: false,
  sprints: [],
  lessons: [],
  selectedLesson: null,
  selectedSprint: null
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
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case LOGOUT:
      // destroy token?
      return state;

    case GET_LESSONS:
      return {
        ...state,
        sprints: action.payload.sprints,
        lessons: action.payload.lessons
      };

    case GET_LESSONS_FAIL:
      return {
        ...state,
        error: 'Failed to fetch user.'
      };

    case LESSON_CLICKED:
      return {
        ...state,
        selectedLesson: action.payload
      };
    case SPRINT_CLICKED:
      return {
        ...state,
        selectedSprint: action.payload
      };

    default:
      return state;
  }
};
