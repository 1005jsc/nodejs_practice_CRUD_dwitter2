import dotenv from 'dotenv';
dotenv.config();

// 1. dotenv를 사용하여 .env값을 불러들어온다

// 그냥 사용하는 것 보다 config라는 파일을 따로 만들어서 읽어온다
// process.env를 읽어오기위해 모든 파일에 dotenv.config()를 불러오는 것은 좀 그렇다

// 2. required 라는 함수로 process.env를 불러온다

// 만약 env가 불러와지지 않는 상황이 생기더라도 defaultValue값을 이용할 수 있다.
// 그리고 JWT_SECRET처럼 반드시 필요한 환경변수가 없다면 throw new Error로 서버를
// 멈추게 할 수 있다

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required('JWT_SECRET'),
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 24 * 60 * 60)),
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
  },
  host: {
    port: required('HOST_PORT', 8080),
  },

  db: {
    host: required('DB_HOST'),
    user: required('DB_USER'),
    database: required('DB_DATABASE'),
    password: required('DB_PASSWORD'),
  },
};
