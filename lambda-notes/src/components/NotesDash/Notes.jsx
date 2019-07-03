import React, { useState } from 'react';
import styled from 'styled-components';
import Note from './Note';
import { Value } from 'slate';
import axios from 'axios';
import { url } from '../Auth/config';

import { useStateValue } from 'react-conflux';
import { notesContext, globalContext } from '../../store/contexts';
import {
  SET_CURRENT_NOTE,
  NEW_NOTE,
  DELETE_NOTE,
  ADD_NOTE,
  OPEN_MODAL
} from '../../store/constants';

const Notes = props => {
  const existingValue = JSON.parse(localStorage.getItem('content'));
  const [bool, setBool] = useState(true);
  const [state, dispatch] = useStateValue(notesContext);
  const [globalState, globalDispatch] = useStateValue(globalContext);
  const { selectedLesson, user } = globalState;

  console.log('Global State - User: ', globalState.user);
  if (existingValue && bool) {
    setBool(false);
    const resValue = Value.fromJSON(existingValue);
    dispatch({
      type: SET_CURRENT_NOTE,
      payload: { ...state.currentNote, note: resValue }
    });
  }

  const saveNote = e => {
    console.log('Global State - User: ', globalState.user);
    e.preventDefault();
    const note = JSON.stringify(state.currentNote.note);
    let title = state.currentNote.noteTitle;
    if (title === '') {
      title = 'New Note';
    }
    axios
      .post(`${url}/notes/`, {
        notesLessonID: selectedLesson,
        userID: user.id,
        note: note,
        noteTitle: title
      })
      .then(res => {
        localStorage.removeItem('content');
        let parsed = JSON.parse(res.data.note.note);
        res.data.note.note = Value.fromJSON(parsed);
        dispatch({ type: ADD_NOTE, payload: res.data.note });
        globalDispatch({ type: OPEN_MODAL, payload: 'Your note was created' });
      })
      .catch(err => {
        globalDispatch({
          type: OPEN_MODAL,
          payload: 'There was an error creating your note'
        });
      });
  };

  const deleteNote = () => {
    dispatch({ type: DELETE_NOTE, payload: state.currentNote.id });
    axios
      .delete(`${url}/notes/${state.currentNote.id}`)
      .then(res => {
        globalDispatch({ type: OPEN_MODAL, payload: 'Your note was deleted' });
      })
      .catch(err => {
        globalDispatch({
          type: OPEN_MODAL,
          payload: 'Your note could not be deleted'
        });
      });
  };

  const updateNote = () => {
    let note = state.currentNote;
    note.note = JSON.stringify(state.currentNote.note);
    if (state.noteTitle !== '') {
      note.noteTitle = state.noteTitle;
    }

    axios
      .put(`${url}/notes/${state.currentNote.id}`, note)
      .then(res => {
        console.log(res.data.note);
        dispatch({
          type: 'UPDATE_NOTE',
          payload: res.data.note
        });
        globalDispatch({
          type: OPEN_MODAL,
          payload: 'Your note was updated'
        });
      })
      .catch(err => {
        globalDispatch({
          type: OPEN_MODAL,
          payload: 'There was an error updating your note'
        });
      });
  };

  const newNote = e => {
    e.preventDefault();
    localStorage.removeItem('content');
    dispatch({ type: NEW_NOTE, payload: true });
  };

  return (
    <Styles>
      {selectedLesson || state.newNote || state.currentNote.id ? (
        <div className="noteOptions">
          <div>
            {selectedLesson && !state.newNote && !state.currentNote.id && (
              <button className="btn success" onClick={newNote}>
                New Note
              </button>
            )}
          </div>
          {(state.newNote || state.currentNote.id) && (
            <div>
              {state.currentNote.id ? (
                <button className="btn primary" onClick={updateNote}>
                  Update Note
                </button>
              ) : (
                <button className="btn primary" onClick={saveNote}>
                  Save Note
                </button>
              )}
              <button className="btn danger" onClick={deleteNote}>
                Delete Note
              </button>
            </div>
          )}
        </div>
      ) : null}
      {state.currentNote.id || state.newNote ? <Note props={props} /> : null}
    </Styles>
  );
};

export default Notes;

const Styles = styled.div`
  background: white;
  width: 100%;
  padding: 10px;

  .noteOptions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .danger {
    margin-left: 10px;
  }
`;
