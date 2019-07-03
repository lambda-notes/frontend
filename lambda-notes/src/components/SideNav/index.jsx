import React from 'react';
import styled from 'styled-components';

// asset imports
import logo from '../../assets/Lambda_Notes_Logo.png';

// component imports
import Options from './Options';

const SideNav = () => {
  return (
    <Styles>
      <img src={logo} alt="Lambda Notes Logo" />
      <Options />
    </Styles>
  );
};

export default SideNav;

const Styles = styled.div`
  min-width: 320px;
  background: #131220;
  color: #ffffff;
  overflow-y: auto;

  @media (max-width: 800px) {
    display: none;
  }

  img {
    /* logo */
    margin: 24px;
    width: 100px;
  }
`;
