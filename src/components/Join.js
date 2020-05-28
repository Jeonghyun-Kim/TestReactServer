// IMPORTING LIBRARIES
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { useHistory } from 'react-router-dom';

// IMPORTING CONTEXTS
import AuthContext from '../AuthContext';

// IMPORTING COMPONENTS

// IMPORTING UTILS
import { signUp } from '../js/auth_utils';
import {
  validateUsername,
  validateName, validateEmail,
  validatePassword,
  validateSame,
} from '../js/validation';

// IMPORTING DEFINES
import { ERROR_CODE } from '../js/defines';

// TODO: INPUT VALIDATION
export default () => {
  const [username, setUsername] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [gender, setGender] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [usernameError, setUsernameError] = React.useState(null);
  const [nameError, setNameError] = React.useState(null);
  const [emailError, setEmailError] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);
  const [password2Error, setPassword2Error] = React.useState(null);

  const { setSignedIn } = React.useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    signUp({
      username, name, email, password, gender,
    }, (err) => {
      switch (err) {
        case ERROR_CODE.USERNAME_ALREADY_OCCUPIED:
          setError('Try another username!');
          break;
        case ERROR_CODE.EMAIL_ALREADY_OCCUPIED:
          setError('Your email already exists.');
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
  };

  return (
    <>
      <h2>Join Us Today!</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="username"
          variant="outlined"
          value={username}
          fullWidth
          margin="normal"
          error={usernameError}
          helperText={usernameError}
          onChange={(event) => {
            setUsernameError(validateUsername(event.target.value.toLowerCase()));
            setUsername(event.target.value.toLowerCase());
          }}
        />
        <TextField
          label="name"
          variant="outlined"
          value={name}
          fullWidth
          margin="normal"
          error={nameError}
          helperText={nameError}
          onChange={(event) => {
            setNameError(validateName(event.target.value));
            setName(event.target.value);
          }}
        />
        <TextField
          label="e-mail"
          variant="outlined"
          value={email}
          fullWidth
          margin="normal"
          error={emailError}
          helperText={emailError}
          onChange={(event) => {
            setEmailError(validateEmail(event.target.value.toLowerCase()));
            setEmail(event.target.value.toLowerCase());
          }}
        />
        <TextField
          label="password"
          type="password"
          variant="outlined"
          value={password}
          fullWidth
          margin="normal"
          error={passwordError}
          helperText={passwordError}
          onChange={(event) => {
            setPasswordError(validatePassword(event.target.value));
            setPassword(event.target.value);
          }}
        />
        <TextField
          label="re-password"
          type="password"
          variant="outlined"
          value={password2}
          fullWidth
          margin="normal"
          error={password2Error}
          helperText={password2Error}
          onChange={(event) => {
            setPassword2Error(validateSame(password, event.target.value));
            setPassword2(event.target.value);
          }}
        />
        <h3>성별</h3>
        <RadioGroup aria-label="gender" name="gender" value={gender} onChange={(event) => setGender(event.target.value)}>
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
        </RadioGroup>
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>
      <h3>{error}</h3>
    </>
  );
};
