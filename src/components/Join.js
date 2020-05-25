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

	const { setSignedIn } = useContext(AuthContext);
	const history = useHistory();

	const handleSubmit = (event) => {
		event.preventDefault();
		signUp({ username, name, email, password, gender }, (error) => {
			switch (error) {
				case ERROR_CODE.USERNAME_ALREADY_OCCUPIED:
					setError('Try another username!');
					break;
				case ERROR_CODE.EMAIL_ALREADY_OCCUPIED:
					setError('Your email already exists.')
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
			<h2>Join Us Today!</h2>
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
				<RadioGroup aria-label="gender" name="gender" value={gender} onChange={(event) => setGender(event.target.value)}>
					<FormControlLabel value='Female' control={<Radio />} label="Female" />
					<FormControlLabel value='Male' control={<Radio />} label="Male" />
				</RadioGroup>
				<Button variant='contained' color='primary' type='submit'>Submit</Button>
			</form>
			<h3>{error}</h3>
		</>
	)
}