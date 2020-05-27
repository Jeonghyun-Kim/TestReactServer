// IMPORTING LIBRARIES
import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// IMPORTING CONTEXTS
import AuthContext from './AuthContext';

// IMPORTING SCREENS
import HomeScreen from './screens/HomeScreen';
import MyPageScreen from './screens/MyPageScreen';
import SigninScreen from './screens/SigninScreen';
import JoinScreen from './screens/JoinScreen';
import UploadScreen from './screens/UploadScreen';
import PaintingScreen from './screens/PaintingScreen';

// IMPORTING COMPONENTS
import MainHeader from './components/MainHeader';

// IMPORTING UTILS
import { renewToken } from './js/auth_utils';

const AppRouter = () => {
  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    renewToken(setSignedIn);
  }, []);

  return (
    <Router>
      <AuthContext.Provider
        value={{
          isSignedIn,
          setSignedIn,
        }}
      >
        <MainHeader />
        <Switch>
          <Route exact path='/'>
            <HomeScreen />
          </Route>
          <Route path='/mypage'>
            <MyPageScreen />
          </Route>
          <Route path='/painting/upload'>
            <UploadScreen />
          </Route>
          <Route path='/painting/test'>
            <PaintingScreen />
          </Route>
          <Route path='/signin'>
            <SigninScreen />
          </Route>
          <Route path='/join'>
            <JoinScreen />
          </Route>
          <Route path='*'>
            <h1>404 NOT FOUND</h1>
          </Route>
        </Switch>
      </AuthContext.Provider>
    </Router>
  )
}

export default AppRouter;
