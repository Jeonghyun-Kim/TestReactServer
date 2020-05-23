import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../AuthContext';

export default () => {
  const { setAccessToken, setLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    setAccessToken(null);
    setLoggedIn(false);
  })

  return (
    <Redirect to='/' />
  )
}