// IMPORTING LIBRARIES
import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

// IMPORTING CONTEXTS
import AuthContext from '../AuthContext';

// IMPORTING COMPONENTS
import TextInput from './Input/TextInput';

// IMPORTING UTILS
import { signIn } from '../js/auth_utils';

// IMPORTING DEFINES
import { ERROR_CODE } from '../js/defines';

// TODO: INPUT VALIDATION
export default () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);

  const { setSignedIn } = React.useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    signIn({ email, password }, (err) => {
      switch (err) {
        case ERROR_CODE.NO_SUCH_USER:
          setError('Check your email!');
          break;
        case ERROR_CODE.PASSWORD_WRONG:
          setError('Check your password!');
          break;
        case undefined:
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
      <h2>Sign In Page!</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="email"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          label="password"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <Button variant="contained" color="primary" type="submit">Sign In!</Button>
        <Button variant="contained" color="primary" onClick={() => history.push('/join')}>JOIN!</Button>
      </form>
      <h3>{error}</h3>
    </>
  );
};
