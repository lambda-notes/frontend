import React from 'react';
import styled from 'styled-components';
import Options from '../SideNav/Options';
import logo from './../../assets/Lambda_Notes_Logo.png';

const MobileMenu = () => {
  return (
    <Styles>
      <div>
        <img src={logo} alt="Lambda Notes Logo" />
        <Options mobile />
      </div>
    </Styles>
  );
};

export default MobileMenu;

const Styles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  position: absolute;
  color: white;
  top: 0;
  background: #131220;
  z-index: 1;
`;
