import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// data management
import { useStateValue } from 'react-conflux';
import { globalContext } from './store/contexts';
import { url } from './components/Auth/config';

// style imports
import { GlobalStyles } from './styles';

// component imports
import Auth from './components/Auth';
import MainDashboard from './components/MainDashboard';
import Landing from './components/Landing';
import SideNav from './components/SideNav';
import MobileNav from './components/MainDashboard/MobileNav';
import Modal from './components/Modal/Modal';

function App(props) {
  const [state, dispatch] = useStateValue(globalContext);
  const { user, modalOpen } = state;

  // this temporarily gets the user id from the url
  useEffect(() => {
    if (!localStorage.getItem('id')) {
      const id = props.history.location.pathname.slice(11);
      localStorage.setItem('id', id);
    }
  }, [props.history.location.pathname, user.id]);

  // get id from local storage
  useEffect(() => {
    const id = localStorage.getItem('id');
    // we will need to attach token to this when we have it.

    axios
      .get(`${url}/users/${id}`)
      .then(res => {
        dispatch({ type: 'GET_USER', payload: res.data.user });
      })
      .catch(err => dispatch({ type: 'GET_USER_FAIL', payload: err }));
  }, [dispatch]);

  const [window_width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <Styles>
        {modalOpen && <Modal />}
        <Route exact path="/" render={props => <Landing {...props} />} />
        {/* <Route path="/login" component={Auth} /> */}
        <div className="main-view">
          {window_width <= 800 ? (
            <Route path="/dashboard" component={MobileNav} />
          ) : (
            <Route path="/dashboard" component={SideNav} />
          )}
          <Route path="/dashboard" component={MainDashboard} />
        </div>
      </Styles>
    </>
  );
}

export default App;

const Styles = styled.div`
  height: 100vh;
  .main-view {
    display: flex;
    height: 100vh;

    @media (max-width: 800px) {
      flex-direction: column;
    }
  }
`;
