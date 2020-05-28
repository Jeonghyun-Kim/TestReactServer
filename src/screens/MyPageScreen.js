// IMPORTING LIBRARIES
import React from 'react';

// IMPORTING UTILS

// IMPORTING CONTEXTS
import AuthContext from '../AuthContext';

// IMPORTING COMPONENTS
import MyPage from '../components/MyPage';
import NeedSignIn from '../components/NeedSignin';

// IMPORTING DEFINES

export default () => {
  const { isSignedIn } = React.useContext(AuthContext);
  return (
    <>
      {isSignedIn
        ? (
          <MyPage />
        ) : (
          <NeedSignIn />
        )}
    </>
  );
};
