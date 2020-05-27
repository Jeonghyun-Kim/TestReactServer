// IMPORTING LIBRARIES
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// IMPORTING CONTEXTS
import AuthContext from '../AuthContext';

// IMPORTING COMPONENTS

// IMPORTING UTILS
import { signOut } from '../js/auth_utils';

// IMPORTING DEFINES

const useStyles = makeStyles((theme) => ({
  menu: {
    margin: theme.spacing(1, 2, 1, 2),
    fontSize: 20,
    textDecoration: 'none',
    color: 'white'
  },
  grow: {
    flexGrow: 1,
  }
}))

export default () => {
  const { isSignedIn, setSignedIn } = React.useContext(AuthContext);
  const classes = useStyles();

  const handleSignout = () => {
    signOut();
    alert('성공적으로 로그아웃 되었습니다.')
    setSignedIn(false);
  }

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Link className={classes.menu} to='/'> home </Link>
          <Link className={classes.menu} to='/mypage'> mypage </Link>
          <Link className={classes.menu} to='/painting/upload'> upload </Link>
          <Link className={classes.menu} to='/painting/test'>test</Link>
          <div className={classes.grow} />
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