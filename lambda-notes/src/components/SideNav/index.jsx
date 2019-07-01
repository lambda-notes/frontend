import React from 'react';
import styled from 'styled-components';

// asset imports
import logo from '../../assets/Lambda_Notes_Logo.png';

// component imports
import Options from './Options';

const SideNav = () => {
  return (
    <Styles>
      <img src={logo} alt='Lambda Notes Logo' />
      <Options />
    </Styles>
  );
};

export default SideNav;

const Styles = styled.div`
  img {
    width: 150px;
  }
`;
