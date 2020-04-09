require('dotenv').config()
const appEnvironment = process.env.NODE_ENV || 'development';

const database = {
  [appEnvironment]: {
    databaseUrl: process.env.DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT || 'postgres',
    logging: false, // env.isDevelopment, uncomment this line to see your database logs
    use_env_variable: 'DATABASE_URL',
  },
};

// DO NOT CHANGE EVER!!!
module.exports = database;
