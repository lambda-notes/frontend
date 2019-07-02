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

const NotesDash = props => {
  const [state, dispatch] = useStateValue(notesContext);
  const { notes } = state;

  useEffect(() => {
    axios
      .get(`${url}/notes/user/2`)
      .then(res => {
        res.data.notes.forEach(note => {
          let parsed = JSON.parse(note.note);
          note.note = Value.fromJSON(parsed);
        });
        dispatch({ type: 'GET_NOTES', payload: res.data.notes });
      })
      .catch(err => dispatch({ type: 'GET_NOTES_FAIL', payload: err }));
  }, [dispatch]);

  return (
    <Styles>
      <SubMenu notes={notes} />
      <Notes props={props} notes={notes} />
    </Styles>
  );
};

export default NotesDash;

const Styles = styled.div`
  display: flex;
  height: calc(100vh - 70px);
`;
