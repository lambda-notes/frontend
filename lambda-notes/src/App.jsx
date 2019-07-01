import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// data management
import { useStateValue } from 'react-conflux';
import { globalContext } from './store/contexts';

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

  const url = 'https://lambda-school-notes.herokuapp.com/api/restricted';

  useEffect(() => {
    axios
      .post(`${url}/user/1`)
      .then(res => dispatch({ type: 'GET_USER', payload: res.data.user }))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <GlobalStyles />
      <Styles>
        <Route exact path='/' component={Landing} />
        <Route path='/login' component={Auth} />
        <div className='main-view'>
          <Route path='/dashboard' component={SideNav} />
          <Route path='/dashboard' component={MainDashboard} />
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
