// IMPORTING LIBRARIES
import React, { useContext } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// IMPORTING UTILS

// IMPORTING CONTEXTS
import AuthContext from '../AuthContext';

// IMPORTING COMPONENTS
import Signin from '../components/Signin';

// IMPORTING DEFINES

// const useStyles = makeStyles((theme) => ({
// }))

export default () => {
  const { isSignedIn } = useContext(AuthContext);
  // const classes = useStyles();
  return (
    <Container maxWidth="sm">
      {isSignedIn
        ? (
          <h2>You are already Signed In!</h2>
        ) : (
          <Signin />
        )}
    </Container>
  );
};
