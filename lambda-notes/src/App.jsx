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
import Youtube from './components/Youtube';

function App() {
  return (
    <>
      <GlobalStyles />
      <Styles>
        <Route exact path='/youtube' component={Youtube} />
        <Route exact path='/landing' component={Landing} />
        <Route path='/login' component={Auth} />
        <div className='main-view'>
          <Route exact path='/' component={SideNav} />
          <Route exact path='/' component={MainDashboard} />
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
