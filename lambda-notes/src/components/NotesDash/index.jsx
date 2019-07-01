import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// data management
import { useStateValue } from 'react-conflux';
import { notesContext } from '../../store/contexts';

// component imports
import SubMenu from './SubMenu';
import Notes from './Notes';

const NotesDash = () => {
  const [state, dispatch] = useStateValue(notesContext);
  const { notes } = state;

  const url = 'https://lambda-school-notes.herokuapp.com/api/restricted';

  useEffect(() => {
    axios
      .get(`${url}/notes/user/1`)
      .then(res => dispatch({ type: 'GET_NOTES', payload: res.data.notes }))
      .catch(err => dispatch({ type: 'GET_NOTES_FAIL', payload: err }));
  }, [notes]);

  return (
    <Styles>
      <SubMenu />
      <Notes />
    </Styles>
  );
};

export default NotesDash;

const Styles = styled.div`
  display: flex;
  height: calc(100vh - 70px);
`;
