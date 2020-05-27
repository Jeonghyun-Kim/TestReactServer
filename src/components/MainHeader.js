// IMPORTING LIBRARIES
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// IMPORTING CONTEXTS
import AuthContext from '../AuthContext';

// IMPORTING COMPONENTS
import SignoutButton from '../components/SignoutButton';

// IMPORTING UTILS

// IMPORTING DEFINES

export default () => {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <div className='nav-bar'>
      <Link to='/'> home </Link>
      <Link to='/mypage'> mypage </Link>
      <Link to='/painting/upload'> upload </Link>
      <Link to='/painting/test'>test</Link>
      {isSignedIn
      ? (
        <SignoutButton>로그아웃</SignoutButton>
      ) : (
        <Link to='/signin'> 로그인 </Link>
      )}
    </div>
  )
}