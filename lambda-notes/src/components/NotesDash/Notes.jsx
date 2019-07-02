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
  const [state, dispatch] = useStateValue(notesContext);

  if (existingValue) {
    dispatch({
      type: SET_CURRENT_NOTE,
      payload: existingValue.toJSON()
    });
  }

  // const [state, setState] = useState({ value: Value.fromJSON(initialValue) });
  const saveNote = e => {
    e.preventDefault();
    const note = JSON.stringify(state.currentNote);
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
      .then(res => console.log(res.message))
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    e.preventDefault();
    dispatch({ type: SET_NOTE_TITLE, payload: e.target.value });
  };

  return (
    <Styles>
      <button onClick={saveNote}>Save Note</button>
      <input
        onChange={handleChange}
        value={
          state.currentNote ? state.currentNote.noteTitle : state.noteTitle
        }
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
