import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';

import AuthContext from '../AuthContext';

export default () => {
	const { setLoggedIn } = useContext(AuthContext);

	// const handleSignin = () => {
	// 	console.log(`handlesingin Called!`);
	// 	setLoggedIn(true);
	// }

	return (
		<>
			<h2>Sign In Page!</h2>
			<Button variant='primary' onClick={() => setLoggedIn(true)} >로그인하기!</Button>
		</>
	)
}