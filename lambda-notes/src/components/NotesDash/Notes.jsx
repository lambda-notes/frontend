import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Note from './Note';
import { Value } from 'slate';
import axios from 'axios';
import { url } from '../Auth/config';

import { useStateValue } from 'react-conflux';
import { notesContext, globalContext } from '../../store/contexts';
import {
  SET_CURRENT_NOTE,
  SET_NOTE_TITLE,
  NEW_NOTE,
  DELETE_NOTE
} from '../../store/constants';

const Notes = props => {
  const existingValue = JSON.parse(localStorage.getItem('content'));
  const [bool, setBool] = useState(true);
  const [state, dispatch] = useStateValue(notesContext);
  const [globalState] = useStateValue(globalContext);
  const { selectedLesson } = globalState;

  useEffect(() => {
    if (props.props.location.pathname.slice(11)) {
      let index = state.notes.find(
        note => note.id == props.props.location.pathname.slice(11)
      );
      if (index) {
        dispatch({
          type: SET_CURRENT_NOTE,
          payload: index
        });
      }
    }
  }, [dispatch, props.props.location.pathname, state.notes]);

  if (existingValue && bool) {
    setBool(false);
    const resValue = Value.fromJSON(existingValue);
    dispatch({
      type: SET_CURRENT_NOTE,
      payload: { ...state.currentNote, note: resValue }
    });
  }

  const saveNote = e => {
    e.preventDefault();
    const note = JSON.stringify(state.currentNote.note);
    let title = state.noteTitle;
    if (title === '') {
      title = 'New Note';
    }
    axios
      .post(`${url}/notes/`, {
        notesLessonID: selectedLesson,
        userID: 2,
        note: note,
        noteTitle: title
      })
      .then(res => {
        localStorage.clear();
        let parsed = JSON.parse(res.data.note.note);
        res.data.note.note = Value.fromJSON(parsed);
        state.notes.push(res.data.note);
        dispatch({ type: NEW_NOTE, payload: false });

        console.log(res.data.message);
      })
      .catch(err => console.log(err));
  };

  const deleteNote = () => {
    dispatch({ type: DELETE_NOTE, payload: state.currentNote.id });
    axios
      .delete(`${url}/notes/${state.currentNote.id}`)
      .then(res => {
        console.log(res.data.id);
      })
      .catch(err => console.log(err));
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
          payload: res.data.note /* maybe? */
        });
      })
      .catch(err => dispatch({ type: 'UPDATE_NOTE_FAIL', payload: err }));
  };

  const newNote = e => {
    e.preventDefault();
    localStorage.clear();
    dispatch({ type: NEW_NOTE, payload: true });
  };

  return (
    <Styles>
      {state.newNote || state.currentNote.id ? (
        <div className="noteOptions">
          <div>
            {selectedLesson && (
              <button className="btn success" onClick={newNote}>
                New Note
              </button>
            )}
          </div>
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
