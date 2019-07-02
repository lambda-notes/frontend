import { Value } from 'slate';
import initialValue from '../../components/NotesDash/value.json';
import {
  GET_NOTES,
  GET_NOTES_FAIL,
  ADD_NOTE,
  ADD_NOTE_FAIL,
  SET_CURRENT_NOTE,
  SET_NOTE_TITLE
} from '../constants';

const initialState = {
  notes: [],
  isLoading: false,
  error: '',
  currentNote: Value.fromJSON(initialValue),
  noteTitle: ''
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
    case SET_CURRENT_NOTE:
      console.log('Currrent Note', action.payload);
      return {
        ...state,
        currentNote: action.payload
      };
    case SET_NOTE_TITLE:
      return {
        ...state,
        noteTitle: action.payload
      };
    default:
      return state;
  }
};
