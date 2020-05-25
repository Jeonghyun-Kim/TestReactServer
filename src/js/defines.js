const SERVER_URL = '';
const S3_URL = 's3.ap-northeast-2.amazonaws.com'
const STORAGE_URL = {
  PAINTING: `https://palette-painting-s3.${S3_URL}`,
  PROFILE: `https://palette-profile-s3.${S3_URL}`
}

const KEY = {
  ACCESS_TOKEN: '@access_token',
  REFRESH_TOKEN: '@refresh_token'
}

const ERROR_CODE = {
  COMMON_ERROR: -1,
  OK: 0,
  AWS_S3_ERROR: 10,
  USERNAME_ALREADY_OCCUPIED: 11,
  EMAIL_ALREADY_OCCUPIED: 12,
  NO_SUCH_USER: 13,
  PASSWORD_WRONG: 14,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  TOKEN_EXPIRED: 419,
};

export {
  SERVER_URL,
  STORAGE_URL,
  KEY,
  ERROR_CODE
};
