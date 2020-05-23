// IMPORTING LIBRARIES
import React, { useState } from 'react';
// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// IMPORTING CONTEXTS
import AuthContext from './AuthContext';

// IMPORTING SCREENS
import Home from './screens/Home';
import Menu1 from './screens/Menu1';
import Menu2 from './screens/Menu2';
import Menu3 from './screens/Menu3';
import Signin from './screens/Singin';
import Join from './screens/Join';

// IMPORTING COMPONENTS
import Signout from './components/Signout';
import MainHeader from './components/MainHeader';

const AppRouter = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [isSignedIn, setSignedIn] = useState(false);

  return (
    <Router>
      <AuthContext.Provider
        value={{
          accessToken,
          setAccessToken,
          setSignedIn,
        }}
      >
        <MainHeader isSignedIn={isSignedIn}/>
        <h1>{isSignedIn ? `로그인됨` : `로그인 안됨`}</h1>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/menu1'>
            <Menu1 />
          </Route>
          <Route path='/menu2'>
            <Menu2 />
          </Route>
          <Route path='/menu3'>
            <Menu3 />
          </Route>
          <Route path='/signin'>
            {isSignedIn
            ? (
              <Redirect to='/' />
            ) :(
              <Signin />
            )}
          </Route>
          <Route path='/signout'>
            <Signout />
          </Route>
          <Route path='/join'>
            <Join />
          </Route>
        </Switch>
      </AuthContext.Provider>
    </Router>
  )
}

export default AppRouter;
