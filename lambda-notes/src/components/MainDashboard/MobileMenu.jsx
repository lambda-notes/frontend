import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/Lambda_Notes_Logo.png';
import MobileMenuButton from './MobileMenuButton';

const MobileNav = () => {
  const [menuOpen, setMenu] = useState(false);

  return (
    <Styles>
      <img src={logo} alt="Lambda Notes Logo" />
      <MobileMenuButton menuOpen={menuOpen} setMenu={setMenu} />
    </Styles>
  );
};

export default MobileNav;

const Styles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  background: #131220;

  img {
    /* logo */
    margin: 20px;
    width: 80px;
  }
`;
