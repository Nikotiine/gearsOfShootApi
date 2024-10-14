import * as process from 'process';
export default () => ({
  jwtSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
});
