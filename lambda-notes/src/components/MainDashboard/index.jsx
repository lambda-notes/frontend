import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

// component imports
import AdminDash from '../AdminDash';
import NotesDash from '../NotesDash';
import TopNav from './TopNav';

const MainDash = () => {
  const isAdmin = false;

  return (
    <Styles>
      <TopNav />
      {isAdmin && <Route path="/dashboard/admin" component={AdminDash} />}
      <Route path="/dashboard" component={NotesDash} />
      {/* <Route path="/dashboard/:id" component={Note} /> */}
    </Styles>
  );
};

export default MainDash;

const Styles = styled.div`
  min-width: calc(100vw - 320px);

  @media (max-width: 800px) {
    width: 100%;
  }
`;
