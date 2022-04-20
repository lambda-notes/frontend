import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/Lambda_Notes_Logo.png';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';

// data management
import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts';
import { TOGGLE_MENU } from '../../store/constants';

const MobileNav = () => {
  const [state, dispatch] = useStateValue(globalContext);
  const { menuOpen } = state;

  const toggleMenu = () => {
    dispatch({ type: TOGGLE_MENU, payload: !menuOpen });
  };

  return (
    <Styles>
      <img src={logo} alt="Lambda Notes Logo" />
      <MobileMenuButton toggleMenu={toggleMenu} menuOpen={menuOpen} />
      {menuOpen && <MobileMenu toggleMenu={toggleMenu} menuOpen={menuOpen} />}
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
