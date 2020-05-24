import { SERVER_URL, KEY } from './defines';

const signIn = async (username = '', password = '') => {
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
      return { token: resJson.token, error: resJson.error };
    } else {
      return { error: resJson.error };
    };
  } catch (error) {
    throw new Error(`ERROR: ${error}`);
  }
}

const signOut = () => {
  sessionStorage.removeItem(KEY.ACCESS_TOKEN);
  sessionStorage.removeItem(KEY.REFRESH_TOKEN);
}

const signUp = async (username = '', name = '', email = '', password = '', gender = null) => {
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
      return { token: resJson.token, error: resJson.error };
    } else {
      return { error: resJson.error };
    };
  } catch (error) {
    throw new Error(`ERROR: ${error}`);
  }
}

const getToken = async (token) => {
  const access_token = token ? token : sessionStorage.getItem(KEY.ACCESS_TOKEN);
  const refresh_token = sessionStorage.getItem(KEY.REFRESH_TOKEN);
  // console.log(`TOKEN RESTORED ACCESS: ${access_token}`);
  // console.log(`TOKEN RESTORED REFRESH: ${refresh_token}`);
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
        return { token: resJson.token, error: resJson.error };
      } else {
        return { error: resJson.error };
      };
    } catch (error) {
      throw new Error(`ERROR: ${error}`);
    }
  } else {
    return null;
  }
}

export {
  signIn,
  signOut,
  signUp,
  getToken
};