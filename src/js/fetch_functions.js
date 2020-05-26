import { renewToken } from './auth_utils';
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
    if (resJson.error === ERROR_CODE.TOKEN_EXPIRED) {
      return renewToken(flag => flag ? getMyInfo(cb) : cb({ error: ERROR_CODE.API_SERVER_DOWN }));
    }
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
        'Authorization': token,
      },
      body : formData
    })
    const resJson = await response.json();
    if (resJson.error === ERROR_CODE.TOKEN_EXPIRED) {
      return renewToken(flag => flag ? postPainting(formData, cb) : cb({ error: ERROR_CODE.API_SERVER_DOWN }));
    }
    cb(resJson);
  } catch (error) {
    cb({ error: ERROR_CODE.API_SERVER_DOWN });
  }
}

const getPainting = async (id, cb) => {
  const token = sessionStorage.getItem(KEY.ACCESS_TOKEN);
  try {
    const response = await fetch(`${SERVER_URL}/painting/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    const resJson = await response.json();
    if (resJson.error === ERROR_CODE.TOKEN_EXPIRED) {
      return renewToken(flag => flag ? getPainting(id, cb) : cb({ error: ERROR_CODE.API_SERVER_DOWN }));
    }
    cb(resJson);
  } catch (error) {
    cb({ error: ERROR_CODE.API_SERVER_DOWN });
  }
}

export {
  getMyInfo,
  postPainting,
  getPainting
}