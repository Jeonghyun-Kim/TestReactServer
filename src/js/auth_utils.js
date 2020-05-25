import { SERVER_URL, KEY, ERROR_CODE } from './defines';

const signIn = async ({ username = '', password = '' }, cb = () => {}) => {
  try {
    const response = await fetch(`${SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const resJson = await response.json();
    if (response.ok) {
      sessionStorage.setItem(KEY.ACCESS_TOKEN, resJson.token);
      sessionStorage.setItem(KEY.REFRESH_TOKEN, resJson.refresh_token);
    }
    cb(resJson.error);
  } catch (error) {
    cb(ERROR_CODE.API_SERVER_DOWN);
  }
}

const signOut = () => {
  sessionStorage.removeItem(KEY.ACCESS_TOKEN);
  sessionStorage.removeItem(KEY.REFRESH_TOKEN);
}

const signUp = async ({ username = '', name = '', email = '', password = '', gender = null }, cb = () => {}) => {
  try {
    const response = await fetch(`${SERVER_URL}/auth/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, name, email, password, gender })
    });
    const resJson = await response.json();
    if (response.ok) {
      sessionStorage.setItem(KEY.ACCESS_TOKEN, resJson.token);
      sessionStorage.setItem(KEY.REFRESH_TOKEN, resJson.refresh_token);
    }
    cb(resJson.error);
  } catch (error) {
    cb(ERROR_CODE.API_SERVER_DOWN);
  }
}

const renewToken = async (cb = () => {}) => {
  const access_token = sessionStorage.getItem(KEY.ACCESS_TOKEN);
  const refresh_token = sessionStorage.getItem(KEY.REFRESH_TOKEN);
  // TODO: don't send request if access token is not expired yet.
  if (refresh_token) {
    try {
      const response = await fetch(`${SERVER_URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        },
        body: JSON.stringify({ refresh_token })
      });
      const resJson = await response.json();
      if (response.ok) {
        sessionStorage.setItem(KEY.ACCESS_TOKEN, resJson.token);
        cb(true);
      } else {
        cb(false);
      };
    } catch (error) {
      cb(false);
    }
  } else {
    cb(false);
  }
}

// TODO: check whether token is expired or not.

export {
  signIn,
  signOut,
  signUp,
  renewToken
};