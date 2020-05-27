// IMPORTING LIBRARIES
import React, { useContext } from 'react';

// IMPORTING UTILS

// IMPORTING CONTEXTS
import AuthContext from '../AuthContext';

// IMPORTING COMPONENTS
import Join from '../components/Join';

// IMPORTING DEFINES

export default () => {
  const { isSignedIn } = useContext(AuthContext);
  return (
    <>
      {isSignedIn
        ? (
          <h2>You are already Signed In!</h2>
        ) : (
          <Join />
        )}
    </>
  );
};
