import React from 'react';
import styled from 'styled-components';

// component imports
import AdminDash from '../AdminDash';
import NotesDash from '../NotesDash';
import TopNav from './TopNav';

const MainDash = () => {
  const isAdmin = false;

  return (
    <Styles>
      <TopNav />
      {isAdmin ? <AdminDash /> : <NotesDash />}
    </Styles>
  );
};

export default MainDash;

const Styles = styled.div`
  border: 1px solid blue;
  min-width: calc(100vw - 320px);
`;
