import { SERVER_URL, KEY } from './defines';

const getMyInfo = async (cb) => {
  const token = sessionStorage.getItem(KEY.ACCESS_TOKEN);
  try {
    const response = await fetch(`${SERVER_URL}/user/my`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    const resJson = await response.json();
    cb(resJson);
  } catch (error) {
    throw new Error(`ERROR: ${error}`);
  }
}

export {
  getMyInfo
}