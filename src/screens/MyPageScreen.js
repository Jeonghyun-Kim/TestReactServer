// IMPORTING LIBRARIES
import React from 'react';
import Container from '@material-ui/core/Container';

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
    <Container maxWidth="sm">
      {isSignedIn
        ? (
          <MyPage />
        ) : (
          <NeedSignIn />
        )}
    </Container>
  );
};
