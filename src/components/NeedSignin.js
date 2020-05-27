// IMPORTING LIBRARIES
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

// IMPORTING CONTEXTS

// IMPORTING COMPONENTS

// IMPORTING UTILS

// IMPORTING DEFINES

export default () => {
  const history = useHistory();
  return (
    <>
      <h2>You need to sign in to view this page!</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push('/signin')}
      >
        Sign In
      </Button>
    </>
  );
};
