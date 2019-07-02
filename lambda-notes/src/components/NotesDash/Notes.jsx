import React, { useState } from 'react';
import styled from 'styled-components';
import Note from './Note';
import { Value } from 'slate';
import initialValue from './value.json';
import axios from 'axios';
import { url } from '../Auth/config';

import { useStateValue } from 'react-conflux';
import { notesContext } from '../../store/contexts';
import {
  SET_CURRENT_NOTE,
  SET_NOTE_TITLE,
  GET_NOTES,
  NEW_NOTE
} from '../../store/constants';

const Notes = () => {
  const existingValue = JSON.parse(localStorage.getItem('content'));
  const [bool, setBool] = useState(true);
  const [state, dispatch] = useStateValue(notesContext);

  if (existingValue && bool) {
    console.log('if');
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
    console.log('saved note', note);
    let title = state.noteTitle;
    if (title === '') {
      title = 'New Note';
    }
    axios
      .post(`${url}/notes/`, {
        notesLessonID: 1,
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
    axios
      .delete(`${url}/notes/${state.currentNote.id}`)
      .then(res => console.log(res.data.message))
      .catch(err => console.log(err));
  };

  const updateNote = () => {
    let note = state.currentNote;
    note.note = JSON.stringify(state.currentNote.note);
    if (state.noteTitle !== '') {
      note.noteTitle = state.noteTitle;
    }
    console.log(note);
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

  const handleChange = e => {
    e.preventDefault();
    dispatch({ type: SET_NOTE_TITLE, payload: e.target.value });
  };

  return (
    <Styles>
      {state.newNote || state.currentNote.id ? (
        <div className="noteOptions">
          <div>
            <input
              className="input"
              onChange={handleChange}
              value={state.noteTitle}
              placeholder="Title"
            />
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
      {state.currentNote.id || state.newNote ? <Note /> : null}
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
`;
