import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Value } from 'slate';

// data management
import { useStateValue } from 'react-conflux';
import { notesContext } from '../../store/contexts';
import { globalContext } from '../../store/contexts';
import { url } from '../Auth/config';

// component imports
import SubMenu from './SubMenu';
import Notes from './Notes';

const NotesDash = () => {
  const [state, dispatch] = useStateValue(notesContext);
  const [globalState, globalDispatch] = useStateValue(globalContext);
  const { notes } = state;
  const { selectedLesson } = globalState;

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
  }, []);

  const filterNotes = () => {
    return notes.filter(note => note.notesLessonID === selectedLesson);
  };

  console.log(filterNotes());

  return (
    <Styles>
      <SubMenu notes={filterNotes()} />
      <Notes notes={notes} />
    </Styles>
  );
};

export default NotesDash;

const Styles = styled.div`
  display: flex;
  height: calc(100vh - 70px);
`;
