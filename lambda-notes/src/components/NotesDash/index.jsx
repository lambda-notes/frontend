import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Value } from 'slate';

// data management
import { useStateValue } from 'react-conflux';
import { notesContext } from '../../store/contexts';
import { url } from '../Auth/config';

// component imports
import SubMenu from './SubMenu';
import Notes from './Notes';

const NotesDash = () => {
  const [state, dispatch] = useStateValue(notesContext);
  const { notes } = state;

  useEffect(() => {
    axios
      .get(`${url}/notes/user/2`)
      .then(res => {
        res.data.notes.forEach(note => (note.note = Value.fromJSON(note.note)));
        dispatch({ type: 'GET_NOTES', payload: res.data.notes });
      })
      .catch(err => dispatch({ type: 'GET_NOTES_FAIL', payload: err }));
  }, [dispatch]);

  const updateNote = (id, note) => {
    axios
      .put(`${url}/notes/${id}`, note)
      .then(res =>
        dispatch({
          type: 'UPDATE_NOTE',
          payload: res.data /* maybe? */
        })
      )
      .catch(err => dispatch({ type: 'UPDATE_NOTE_FAIL', payload: err }));
  };

  const deleteNote = () => {
    axios
      .delete(`${url}/notes/${state.currentNote.id}`)
      .then(res => console.log(res.data.message))
      .catch(err => console.log(err));
  };

  return (
    <Styles>
      <SubMenu notes={notes} />
      <Notes notes={notes} />
    </Styles>
  );
};

export default NotesDash;

const Styles = styled.div`
  display: flex;
  height: calc(100vh - 70px);
`;
