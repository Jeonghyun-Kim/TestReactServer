// IMPORTING LIBRARIES
import React, { useContext, useState } from 'react';
import { Button, TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

// IMPORTING CONTEXTS
import AuthContext from '../AuthContext';

// IMPORTING COMPONENTS

export default () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [gender, setGender] = useState(null);

	const { setSignedIn, setAccessToken } = useContext(AuthContext);
	const history = useHistory();

	const handleJoin = async () => {
		let accessToken = 'Token!';
		sessionStorage.setItem('@access_token', accessToken)
		setAccessToken(accessToken);
		setSignedIn(true);
		history.push('/');
	}

	return (
		<>
			<h2>Join Us Today!</h2>
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
					label='e-mail'
					variant='outlined'
					value={email}
					fullWidth
					margin='normal'
					onChange={(event) => setEmail(event.target.value)}
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
				<RadioGroup aria-label="gender" name="gender1" value={gender} onChange={(event) => setGender(event.target.value)}>
					<FormControlLabel value='Female' control={<Radio />} label="Female" />
					<FormControlLabel value='Male' control={<Radio />} label="Male" />
				</RadioGroup>
			</form>
			<Button variant='contained' color='primary' onClick={() => handleJoin()}>Submit</Button>
		</>
	)
}