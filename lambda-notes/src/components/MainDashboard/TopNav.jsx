import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const navButtons = ['home', 'notes', 'search'];

const TopNav = () => {
  const logout = () => {
    axios.get(`https://lambda-school-notes.herokuapp.com/auth/logout`);
  };

  return (
    <Styles>
      <div className="nav-links">
        {navButtons.map(link => (
          <Link to={`/dashboard/${link}`} key={link}>
            <h3>{link}</h3>
          </Link>
        ))}
      </div>
      <h3 style={{ cursor: 'pointer' }} onClick={logout}>
        Logout
      </h3>
    </Styles>
  );
};

export default TopNav;

const Styles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  border-bottom: 1px solid #e4e8ea;

  .nav-links {
    display: flex;

    a {
      text-decoration: none;
    }
  }

  h3 {
    padding: 0.2rem 2.4rem;
    color: #82838b;
    font-size: 16px;
    font-weight: 500;
    text-transform: capitalize;

    @media (max-width: 800px) {
      font-size: 14px;
      padding: 0.2rem 1.2rem;
    }

    &:hover {
      color: #131220;
      cursor: pointer;
    }
  }
`;
