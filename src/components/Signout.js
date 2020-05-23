import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../AuthContext';

import { signOut } from '../js/auth_utils';

export default () => {
  const { setAccessToken, setSignedIn } = useContext(AuthContext);

  useEffect(() => {
    signOut();
    setAccessToken(null);
    setSignedIn(false);
  })

  return (
    <Redirect to='/' />
  )
}