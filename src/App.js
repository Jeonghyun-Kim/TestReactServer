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
import Login from './screens/Login';

// IMPORTING COMPONENTS
import Logout from './components/Logout';
import MainHeader from './components/MainHeader';

const AppRouter = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <AuthContext.Provider
        value={{
          accessToken,
          setAccessToken,
          setLoggedIn,
        }}
      >
        <MainHeader isLoggedIn={isLoggedIn}/>
        <h1>{isLoggedIn ? `로그인됨` : `로그인 안됨`}</h1>
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
          <Route path='/login'>
            {isLoggedIn
            ? (
              <Redirect to='/' />
            ) :(
              <Login />
            )}
          </Route>
          <Route path='/logout'>
            <Logout />
          </Route>
        </Switch>
      </AuthContext.Provider>
    </Router>
  )
}

export default AppRouter;
