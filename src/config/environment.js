require('../load-env');

const isDevelopment = (process.env.NODE_ENV === 'development')
  || (process.env.NODE_ENV === 'dev');

const environment = {
  ...process.env,
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'production',
  REDIS_URL: process.env.REDIS_URL || 'no-redis',
  DATABASE_URL: process.env.DATABASE_URL,
  APPSECRET: process.env.APPSECRET,
  REDIRECTURL: process.env.REDIRECTURL,
  APPID: process.env.APPID,
  isDevelopment,
};

module.exports = environment;
