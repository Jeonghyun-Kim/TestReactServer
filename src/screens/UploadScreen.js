// IMPORTING LIBRARIES
import React from 'react';

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
    <>
      {isSignedIn
        ? (
          <UploadPainting />
        ) : (
          <NeedSignin />
        )}
    </>
  );
};
