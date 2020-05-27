// IMPORTING LIBRARIES
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// IMPORTING CONTEXTS
import AuthContext from '../AuthContext';

// IMPORTING COMPONENTS

// IMPORTING UTILS
import { signOut } from '../js/auth_utils';

// IMPORTING DEFINES

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignContent: 'space-around'
  },
  menu: {
    margin: theme.spacing(1, 2, 1, 2),
    fontSize: 20,
    textDecoration: 'none',
    color: 'white'
  }
}))

export default () => {
  const { isSignedIn, setSignedIn } = useContext(AuthContext);
  const classes = useStyles();

  const handleSignout = () => {
    signOut();
    alert('성공적으로 로그아웃 되었습니다.')
    setSignedIn(false);
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Link className={classes.menu} to='/'> home </Link>
          <Link className={classes.menu} to='/mypage'> mypage </Link>
          <Link className={classes.menu} to='/painting/upload'> upload </Link>
          <Link className={classes.menu} to='/painting/test'>test</Link>
          {isSignedIn
          ? (
            <Button onClick={handleSignout}>
              <Link className={classes.menu} to='/'> 로그아웃 </Link>
            </Button>
          ) : (
            <Link className={classes.menu} to='/signin'> 로그인 </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}