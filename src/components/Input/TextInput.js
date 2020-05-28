import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = {
  textInput: {
    width: '100%',
  },
};

const useStyles = makeStyles(styles);

export default function TextInput(props) {
  const classes = useStyles();
  const {
    label, value, setValue, ...rest
  } = props;
  return (
    <TextField
      className={classes.textInput}
      {...rest}
      label={label}
      variant="outlined"
      value={value}
      margin="normal"
      onChange={(event) => setValue(event.target.value)}
    />
  );
}

TextInput.defaultProps = {
  label: '',
  value: '',
  setValue: () => {},
};

TextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
};
