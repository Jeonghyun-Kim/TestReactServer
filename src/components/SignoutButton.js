// IMPORTING LIBRARIES
import React, { useContext } from 'react';

// IMPORTING CONTEXTS
import AuthContext from '../AuthContext';

// IMPORTING COMPONENTS

// IMPORTING UTILS
import { signOut } from '../js/auth_utils';

// IMPORTING DEFINES

export default ({ children }) => {
  const { setSignedIn } = useContext(AuthContext);

  return (
    <button onClick={() => {
      signOut();
      setSignedIn(false);
    }} >{children}</button>
  )
}