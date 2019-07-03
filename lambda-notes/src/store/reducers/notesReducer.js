import { Value } from 'slate';
import initialValue from '../../components/NotesDash/value.json';
import {
  GET_NOTES,
  GET_NOTES_FAIL,
  ADD_NOTE,
  ADD_NOTE_FAIL,
  SET_CURRENT_NOTE,
  SET_NOTE_TITLE,
  MODIFY_CURRENT_NOTE,
  UPDATE_NOTE,
  UPDATE_NOTE_FAIL,
  NEW_NOTE,
  CLEAR_NOTE,
  DELETE_NOTE
} from '../constants';

const initialState = {
  notes: [],
  newNote: false,
  isLoading: false,
  error: '',
  currentNote: {
    dateCreated: '',
    dateUpdated: '',
    id: '',
    noteTitle: '',
    noteLessonID: '',
    userID: '',
    note: Value.fromJSON(initialValue)
  },
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
        newNote: false,
        currentNote: action.payload,
        notes: [...state.notes, action.payload]
      };
    case ADD_NOTE_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_NOTE:
      let parsed = JSON.parse(action.payload.note);
      action.payload.note = Value.fromJSON(parsed);

      let index = state.notes.findIndex(note => note.id === action.payload.id);
      state.notes[index] = action.payload;
      return {
        ...state,
        // notes: [...state.notes[index]=action.payload],
        currentNote: action.payload
      };
    case UPDATE_NOTE_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case DELETE_NOTE:
      let num = state.notes.findIndex(note => note.id === action.payload);
      state.notes.splice(num, 1);
      return {
        ...state,
        currentNote: {
          dateCreated: '',
          dateUpdated: '',
          id: '',
          noteTitle: '',
          noteLessonID: '',
          userID: '',
          note: Value.fromJSON(initialValue)
        }
      };
    case SET_CURRENT_NOTE:
      return {
        ...state,
        currentNote: action.payload
      };
    case MODIFY_CURRENT_NOTE:
      return {
        ...state,
        currentNote: { ...state.currentNote, note: action.payload }
      };
    case SET_NOTE_TITLE:
      return {
        ...state,
        currentNote: {
          ...state.currentNote,
          noteTitle: action.payload
        }
      };
    case NEW_NOTE:
      if (action.payload) {
        return {
          ...state,
          newNote: action.payload
        };
      } else {
        return { ...state, newNote: action.payload };
      }
    case CLEAR_NOTE:
      return {
        ...state,
        newNote: false,
        currentNote: {
          dateCreated: '',
          dateUpdated: '',
          id: '',
          noteTitle: '',
          noteLessonID: '',
          userID: '',
          note: Value.fromJSON(initialValue)
        }
      };
    default:
      return state;
  }
};
