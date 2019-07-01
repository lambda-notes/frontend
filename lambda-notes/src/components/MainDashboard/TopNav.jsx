import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const holder = ['home', 'video', 'notes', 'misc'];

const TopNav = () => {
  return (
    <Styles>
      <div className='nav-links'>
        {holder.map(link => (
          <Link to={`/dashboard/${link}`} key={link}>
            <h3>{link}</h3>
          </Link>
        ))}
      </div>
      <h3>Logout</h3>
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

    &:hover {
      color: #131220;
      cursor: pointer;
    }
  }
`;
