import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../AuthContext';

export default () => {
  const { setAccessToken, setSignedIn } = useContext(AuthContext);

  useEffect(() => {
    setAccessToken(null);
    setSignedIn(false);
  })

  return (
    <Redirect to='/' />
  )
}