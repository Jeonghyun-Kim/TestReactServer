// IMPORTING LIBRARIES
import React from 'react';

// IMPORTING CONTEXTS
import AuthContext from '../AuthContext';

// IMPORTING COMPONENTS
import PaintingItem from '../components/PaintingItem';
import NeedSignin from '../components/NeedSignin';

// IMPORTING UTILS

// IMPORTING DEFINES

export default () => {
  const { isSignedIn } = React.useContext(AuthContext);
  return (
    <>
      {isSignedIn
        ? (
          <PaintingItem itemId={3} />
        ) : (
          <NeedSignin />
        )}
    </>
  );
};
