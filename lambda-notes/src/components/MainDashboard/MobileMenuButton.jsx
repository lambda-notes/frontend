import React from 'react';
import styled from 'styled-components';

const MobileMenuButton = ({ toggleMenu, menuOpen }) => {
  return (
    <Styles>
      <div
        className={
          menuOpen
            ? 'hamburger-menu menu-open clickHamburgerMenu'
            : 'hamburger-menu'
        }
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </div>
    </Styles>
  );
};

export default MobileMenuButton;

const Styles = styled.div`
  .hamburger-menu {
    width: 25px;
    height: 20px;
    margin-right: 20px;
    position: relative;
    cursor: pointer;
    display: inline-block;

    span {
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
      position: absolute;
      background: white;
      border-radius: 2px;
      transition: 0.3s cubic-bezier(0.8, 0.5, 0.2, 1.4);
      width: 100%;
      height: 3px;
      transition-duration: 500ms;
    }

    span:nth-child(1) {
      top: 0px;
      left: 0px;
    }

    span:nth-child(2) {
      top: 8.5px;
      left: 0px;
    }

    span:nth-child(3) {
      bottom: 0px;
      left: 0px;
    }
  }

  .menu-open {
    z-index: 3;
  }

  .clickHamburgerMenu span:nth-child(1) {
    transform: rotate(45deg);
    top: 11px;
  }
  .clickHamburgerMenu span:nth-child(2) {
    transform: scale(0.3);
  }
  .clickHamburgerMenu span:nth-child(3) {
    transform: rotate(-45deg);
    top: 11px;
  }
`;
