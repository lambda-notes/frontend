import React from 'react';
import { Route } from 'react-router-dom';

import Landing from './components/Landing';
import Auth from './components/Auth';
import MainDashboard from './components/MainDashboard';
import SideNav from './components/SideNav';

import { GlobalStyles } from './styles';

function App() {
  return (
    <>
      <GlobalStyles />
      <Route exact path='/landing' component={Landing} />
      <Route path='/login' component={Auth} />
      <Route exact path='/' component={SideNav} />
      <Route exact path='/' component={MainDashboard} />
    </>
  );
}

export default App;
