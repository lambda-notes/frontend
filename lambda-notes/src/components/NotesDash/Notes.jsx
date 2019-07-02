import React, { useState } from 'react';
import styled from 'styled-components';
import Note from './Note';
import { Value } from 'slate';
import initialValue from './value.json';
import axios from 'axios';
import { url } from '../Auth/config';

import { useStateValue } from 'react-conflux';
import { notesContext } from '../../store/contexts';
import { SET_CURRENT_NOTE, SET_NOTE_TITLE } from '../../store/constants';

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
        state.notes.push(res.data.note);
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

  const handleChange = e => {
    e.preventDefault();
    dispatch({ type: SET_NOTE_TITLE, payload: e.target.value });
  };

  return (
    <Styles>
      <button onClick={saveNote}>Save Note</button>
      <button onClick={deleteNote}>Delete Note</button>
      <input
        onChange={handleChange}
        value={state.noteTitle}
        placeholder="Title"
      />
      <Note />
    </Styles>
  );
};

export default Notes;

const Styles = styled.div`
  background: white;
  width: 100%;
`;
