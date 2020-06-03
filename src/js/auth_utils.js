import { SERVER_URL, KEY, ERROR_CODE } from './defines';

const signIn = async ({ email = '', password = '' }, cb = () => {}) => {
  try {
    const response = await fetch(`${SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const resJson = await response.json();
    if (response.ok) {
      sessionStorage.setItem(KEY.ACCESS_TOKEN, resJson.accessToken);
      sessionStorage.setItem(KEY.REFRESH_TOKEN, resJson.refreshToken);
    }
    cb(resJson.error);
  } catch (error) {
    cb(ERROR_CODE.API_SERVER_DOWN);
  }
};

const signOut = () => {
  sessionStorage.removeItem(KEY.ACCESS_TOKEN);
  sessionStorage.removeItem(KEY.REFRESH_TOKEN);
};

const signUp = async ({
  nick = '', name = '', email = '', password = '', gender = 'secret',
}, cb = () => {}) => {
  try {
    const response = await fetch(`${SERVER_URL}/auth/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nick, name, email, password, gender,
      }),
    });
    const resJson = await response.json();
    if (response.ok) {
      sessionStorage.setItem(KEY.ACCESS_TOKEN, resJson.accessToken);
      sessionStorage.setItem(KEY.REFRESH_TOKEN, resJson.refreshToken);
    }
    cb(resJson.error);
  } catch (error) {
    cb(ERROR_CODE.API_SERVER_DOWN);
  }
};

const renewToken = async (cb = () => {}) => {
  const accessToken = sessionStorage.getItem(KEY.ACCESS_TOKEN);
  const refreshToken = sessionStorage.getItem(KEY.REFRESH_TOKEN);
  // TODO: don't send request if access token is not expired yet.
  if (refreshToken) {
    try {
      const response = await fetch(`${SERVER_URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
        body: JSON.stringify({ refreshToken }),
      });
      const resJson = await response.json();
      if (response.ok) {
        sessionStorage.setItem(KEY.ACCESS_TOKEN, resJson.accessToken);
        cb(true);
      } else {
        cb(false);
      }
    } catch (error) {
      cb(false);
    }
  } else {
    cb(false);
  }
};

// TODO: check whether token is expired or not.

export {
  signIn,
  signOut,
  signUp,
  renewToken,
};
