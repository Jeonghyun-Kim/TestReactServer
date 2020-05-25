// IMPORTING LIBRARIES
import React, { useContext, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

// IMPORTING CONTEXTS
import AuthContext from '../AuthContext';

// IMPORTING COMPONENTS

// IMPORTING UTILS
import { signIn } from '../js/auth_utils';

// IMPORTING DEFINES
import { ERROR_CODE } from '../js/defines';

// TODO: INPUT VALIDATION
export default () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const { setSignedIn } = useContext(AuthContext);
	const history = useHistory();

	const handleSubmit = (event) => {
		event.preventDefault();
		signIn({ username, password}, (error) => {
			switch (error) {
				case ERROR_CODE.NO_SUCH_USER:
					setError('Check your username!');
					break;
				case ERROR_CODE.PASSWORD_WRONG:
					setError('Check your password!')
					break;
				case ERROR_CODE.OK:
					setSignedIn(true);
					history.goBack(1);
					break;
				default:
					setError('Server maintenance or Something. Sorry...');
					break;
			}
		});
	}

	return (
		<>
			<h2>Sign In Page!</h2>
			<form onSubmit={handleSubmit}>
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
				<Button variant='contained' color='primary' type='submit'>Sign In!</Button>
				<Button variant='contained' color='primary' onClick={() => history.push('/join')}>JOIN!</Button>
			</form>
			<h3>{error}</h3>
		</>
	)
}