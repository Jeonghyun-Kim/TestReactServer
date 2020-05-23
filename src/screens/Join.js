// IMPORTING LIBRARIES
import React, { useContext, useState } from 'react';
import { Button, TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

// IMPORTING CONTEXTS
import AuthContext from '../AuthContext';

// IMPORTING COMPONENTS

// IMPORTING UTILS
import { signUp } from '../js/auth_utils';

// IMPORTING DEFINES
import { ERROR_CODE } from '../js/defines';

// TODO: INPUT VALIDATION
export default () => {
	const [username, setUsername] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [gender, setGender] = useState(null);
	const [error, setError] = useState(null);

	const { setSignedIn, setAccessToken } = useContext(AuthContext);
	const history = useHistory();

	const handleJoin = async () => {
		try {
			const res = await signUp(username, name, email, password, gender);
			console.log(res.error)
			switch (res.error) {
				case ERROR_CODE.USERNAME_ALREADY_OCCUPIED:
					setError('Try another username!');
					break;
				case ERROR_CODE.EMAIL_ALREADY_OCCUPIED:
					setError('Your email already exists.')
					break;
				case ERROR_CODE.OK:
					setAccessToken(res.token);
					setSignedIn(true);
					history.push('/');
					break;
				default:
					setError('Server maintenance or Something. Sorry...');
					break;
			}
		} catch (error) {
			setError('Server maintenance or Something. Sorry...');
		}
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
					label='name'
					variant='outlined'
					value={name}
					fullWidth
					margin='normal'
					onChange={(event) => setName(event.target.value)}
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
			<h3>{error}</h3>
		</>
	)
}