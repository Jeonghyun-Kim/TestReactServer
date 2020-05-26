const validateUsername = (username) => {
  username = username.toLowerCase();
  if (username.length === 0) {
    return 'username can\'t be empty';
  }
  if (/[\s\t\n]/.test(username)) {
    return 'blank not accepted';
  }
  if (/[^_a-z0-9]/.test(username)) {
    return 'you only can use alphabets, numbers, and underscores';
  }
  if (!/[a-z0-9]/.test(username)) {
    return 'you should use at least one alphabet or number';
  }
  if (username.length < 3 || username.length > 20) {
    return 'number of character\'s should be between 3 and 20';
  }
  if (/^(___)/.test(username)) {
    return 'can\'t start with triple underscore';
  }
  return false;
}

const validateName = (name) => {
  if (name.length === 0) {
    return 'name can\'t be empty';
  }
  if (/[\t\n]/.test(name)) {
    return 'tab or enter is not accepted';
  }
  if (/[^\s0-9a-zA-Z가-힣]/.test(name)) {
    return 'cannot use special characters';
  }
  if (name.length > 30) {
    return 'too long name'
  }
  return false;
}

const validateEmail = (email) => {
  if (email.length === 0) {
    return 'email can\'t be empty';
  }
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    return 'invalid email address';
  }
  return false;
}

const validatePassword = (password) => {
  if (password.length === 0) {
    return 'password can\'t be empty';
  }
  if (password.length < 8) {
    return 'password must have at least 8 characters';
  }
  if (/[\s\t\n]/.test(password)) {
    return 'blank not accepted';
  }
  // TODO: 2가지 종류 이상.
  return false;
}

const validateSame = (input1, input2) => {
  if (input1 !== input2) {
    return 'no match';
  }
  return false;
}

export {
  validateUsername,
  validateName,
  validateEmail,
  validatePassword,
  validateSame
}