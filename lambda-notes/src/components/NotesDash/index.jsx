import React from 'react';
import styled from 'styled-components';

// component imports
import SubMenu from './SubMenu';
import Notes from './Notes';

const NotesDash = () => {
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
`;
