import React from 'react';

import TopNav from './TopNav';
import AdminDash from '../AdminDash';
import NotesDash from '../NotesDash';

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
