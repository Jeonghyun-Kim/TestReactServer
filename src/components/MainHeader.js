import React from 'react';
import { Link } from 'react-router-dom';

export default ({ isSignedIn }) => {
  return (
    <div className='nav-bar'>
      <Link to='/'> home </Link>
      <Link to='/menu1'> menu1 </Link>
      <Link to='/menu2'> menu2 </Link>
      <Link to='/menu3'> menu3 </Link>
      {isSignedIn
      ? (
        <Link to='/signout' > 로그아웃 </Link>
      ) : (
        <Link to='/signin'> 로그인 </Link>
      )}
    </div>
  )
}