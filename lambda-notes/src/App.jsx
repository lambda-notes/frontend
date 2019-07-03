import React, { useEffect } from 'react';
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

function App() {
  const [state, dispatch] = useStateValue(globalContext);

  const { user, isAdmin } = state;
  console.log('test');

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

  return (
    <>
      <GlobalStyles />
      <Styles>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Auth} />
        <div className="main-view">
          <Route path="/dashboard" component={SideNav} />
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
  }
`;
