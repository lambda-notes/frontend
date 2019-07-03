import {
  GET_USER,
  GET_USER_FAIL,
  LOGOUT,
  GET_LESSONS,
  GET_LESSONS_FAIL,
  LESSON_CLICKED,
  SPRINT_CLICKED,
  SET_USER,
  TOGGLE_MENU,
  OPEN_MODAL,
  CLOSE_MODAL
} from '../constants';

const initialState = {
  user: {},
  isLoading: false,
  isAdmin: false,
  sprints: [],
  lessons: [],
  selectedLesson: null,
  selectedSprint: null,
  menuOpen: false,
  modalMessage: '',
  modalOpen: false
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      // set local storage with token?
      // localStorage.setItem({ token: action.token });
      return {
        ...state,
        user: action.payload,
        // isAdmin: action.payload.accountType === 1 ? true : false,
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
        selectedLesson: null,
        selectedSprint: action.payload
      };
    case TOGGLE_MENU:
      return {
        ...state,
        menuOpen: action.payload
      };
    case OPEN_MODAL:
      return {
        ...state,
        modalMessage: action.payload,
        modalOpen: true
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalMessage: '',
        modalOpen: false
      };
    default:
      return state;
  }
};
