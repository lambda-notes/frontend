import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

// data management
// import { useStateValue } from 'react-conflux';
// import { globalContext } from './store/contexts';
// import { url } from './components/Auth/config';

// style imports
import { GlobalStyles } from './styles';

// component imports
import Auth from './components/Auth';
import MainDashboard from './components/MainDashboard';
import Landing from './components/Landing';
import SideNav from './components/SideNav';
import MobileNav from './components/MainDashboard/MobileNav';
import Modal from './components/Modal/Modal';

function App() {
  // const [state] = useStateValue(globalContext);

  // const { user, isAdmin } = state;
  // switch this to a post request with data
  // useEffect(() => {
  //   axios
  //     .get(`${url}/users/2`)
  //     .then(res => {
  //       localStorage.setItem('token', res.data.token);
  //       dispatch({ type: 'GET_USER', payload: res.data.user });
  //     })
  //     .catch(err => dispatch({ type: 'GET_USER_FAIL', payload: err }));
  // }, []);

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
        <Modal />
        <Route exact path="/" render={props => <Landing {...props} />} />
        <Route path="/login" component={Auth} />
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
  .main-view {
    display: flex;
    height: 100vh;

    @media (max-width: 800px) {
      flex-direction: column;
    }
  }
`;
