import React from 'react';
import { Route } from 'react-router-dom';

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
      <Route exact path='/landing' component={Landing} />
      <Route path='/login' component={Auth} />`
      <Route exact path='/' component={SideNav} />
      <Route exact path='/' component={MainDashboard} />
    </>
  );
}

export default App;
