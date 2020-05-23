// IMPORTING LIBRARIES
import React, { useContext, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

// IMPORTING CONTEXTS
import AuthContext from '../AuthContext';

// IMPORTING COMPONENTS

export default () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const { setSignedIn, setAccessToken } = useContext(AuthContext);
	const history = useHistory();

	const handleSingin = async () => {
		let accessToken = 'Token!';
		sessionStorage.setItem('@access_token', accessToken)
		setAccessToken(accessToken);
		setSignedIn(true);
	}

	return (
		<>
			<h2>Sign In Page!</h2>
			<form>
				<TextField
					label='username'
					variant='outlined'
					value={username}
					fullWidth
					margin='normal'
					onChange={(event) => setUsername(event.target.value)}
				/>
				<TextField
					label='password'
					type='password'
					variant='outlined'
					value={password}
					fullWidth
					margin='normal'
					onChange={(event) => setPassword(event.target.value)}
				/>
			</form>
			<Button variant='contained' color='primary' onClick={() => handleSingin()}>Sign In!</Button>
			<Button variant='contained' color='primary' onClick={() => history.push('/join')}>JOIN!</Button>
		</>
	)
}