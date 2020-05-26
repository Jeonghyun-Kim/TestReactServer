import { SERVER_URL, KEY, ERROR_CODE } from './defines';

const getMyInfo = async (cb) => {
  const token = sessionStorage.getItem(KEY.ACCESS_TOKEN);
  try {
    const response = await fetch(`${SERVER_URL}/my`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    const resJson = await response.json();
    cb(resJson);
  } catch (error) {
    cb({ error: ERROR_CODE.API_SERVER_DOWN });
  }
}

const postPainting = async (formData, cb) => {
  const token = sessionStorage.getItem(KEY.ACCESS_TOKEN);
  try {
    const response = await fetch(`${SERVER_URL}/painting`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Authorization': token,
      },
      body : formData
    })
    const resJson = await response.json();
    cb(resJson);
  } catch (error) {
    cb({ error: ERROR_CODE.API_SERVER_DOWN });
  }
}

export {
  getMyInfo,
  postPainting
}