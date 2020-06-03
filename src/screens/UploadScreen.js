// IMPORTING LIBRARIES
import React from 'react';
import Container from '@material-ui/core/Container';

// IMPORTING CONTEXTS
import AuthContext from '../AuthContext';

// IMPORTING COMPONENTS
import UploadPainting from '../components/UploadPainting';
import NeedSignin from '../components/NeedSignin';

// IMPORTING UTILS

// IMPORTING DEFINES

export default () => {
  const { isSignedIn } = React.useContext(AuthContext);
  return (
    <Container maxWidth="md">
      {isSignedIn
        ? (
          <UploadPainting />
        ) : (
          <NeedSignin />
        )}
    </Container>
  );
};
