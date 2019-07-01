import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

// style imports
import { GlobalStyles } from './styles';

// component imports
import Auth from './components/Auth';
import MainDashboard from './components/MainDashboard';
import Landing from './components/Landing';
import SideNav from './components/SideNav';

function App() {
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
