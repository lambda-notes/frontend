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

const NotesDash = props => {
  const [state, dispatch] = useStateValue(notesContext);
  const [globalState] = useStateValue(globalContext);
  const { notes } = state;
  const { selectedLesson, user } = globalState;

  useEffect(() => {
    if (user) {
      axios
        .get(`${url}/notes/user/${user.id}`)
        .then(res => {
          res.data.notes.forEach(note => {
            let parsed = JSON.parse(note.note);
            note.note = Value.fromJSON(parsed);
          });
          dispatch({ type: 'GET_NOTES', payload: res.data.notes });
        })
        .catch(err => dispatch({ type: 'GET_NOTES_FAIL', payload: err }));
    }
  }, [user, dispatch]);

  const filterNotes = () => {
    return notes.filter(note => note.notesLessonID === selectedLesson);
  };

  return (
    <Styles>
      <SubMenu notes={filterNotes()} />
      <Notes props={props} notes={notes} />
    </Styles>
  );
};

export default NotesDash;

const Styles = styled.div`
  display: flex;
  height: calc(100vh - 70px);
`;
