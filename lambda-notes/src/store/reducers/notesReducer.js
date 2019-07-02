import {
  GET_NOTES,
  GET_NOTES_FAIL,
  ADD_NOTE,
  ADD_NOTE_FAIL
} from '../constants';

const initialState = {
  notes: [],
  isLoading: false,
  error: ''
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: [...action.payload],
        error: ''
      };
    case GET_NOTES_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload]
      };
    case ADD_NOTE_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
