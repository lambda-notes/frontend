import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/Lambda_Notes_Logo.png';

const MobileNav = () => {
  return (
    <Styles>
      <img src={logo} alt="Lambda Notes Logo" />
      <h3>Hamburger</h3>
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
