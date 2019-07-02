import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

// component imports
import AdminDash from '../AdminDash';
import NotesDash from '../NotesDash';
import TopNav from './TopNav';

const MainDash = () => {
  const isAdmin = true;

  return (
    <Styles>
      <TopNav />
      <Route exact path="/dashboard" component={NotesDash} />
      {isAdmin && <Route path="/dashboard/admin" component={AdminDash} />}
    </Styles>
  );
};

export default MainDash;

const Styles = styled.div`
  min-width: calc(100vw - 320px);
`;
