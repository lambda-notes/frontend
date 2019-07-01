import React from 'react';

// component imports
import AdminDash from '../AdminDash';
import NotesDash from '../NotesDash';
import TopNav from './TopNav';

const MainDash = () => {
  const isAdmin = false;

  return (
    <>
      <TopNav />
      {isAdmin ? <AdminDash /> : <NotesDash />}
    </>
  );
};

export default MainDash;
