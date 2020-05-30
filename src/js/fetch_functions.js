import { renewToken } from './auth_utils';
import { SERVER_URL, KEY, ERROR_CODE } from './defines';

const fetchServer = async (url, method, body, cb) => {
  const token = sessionStorage.getItem(KEY.ACCESS_TOKEN);
  try {
    const response = await fetch(`${SERVER_URL}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        body,
      },
    });
    const resJson = await response.json();
    if (resJson.error === ERROR_CODE.TOKEN_EXPIRED) {
      renewToken((flag) => {
        if (flag) {
          fetchServer(url, method, body, cb);
        } else {
          cb({ error: ERROR_CODE.API_SERVER_DOWN });
        }
      });
    } else {
      cb(resJson);
    }
  } catch (error) {
    cb({ error: ERROR_CODE.API_SERVER_DOWN });
  }
};

const getMyInfo = (cb) => {
  fetchServer('/my', 'GET', null, cb);
};

const postPainting = async (formData, cb) => {
  fetchServer('/painting', 'POST', formData, cb);
};

const getPainting = async (id, cb) => {
  fetchServer(`/painting/${id}`, 'GET', null, cb);
};

export {
  getMyInfo,
  postPainting,
  getPainting,
};
