/**
 * Config file, which is interpreting all the environment variables
 */

import path from 'path';

var allowedEnvironments = [
  'development'
];

// test if the given environment is a valid one
if ( allowedEnvironments.indexOf(process.env.NODE_ENV) < 0 ) {
  console.error('Invalid Environment');
  process.exit(1);
}

console.log('Using ' + process.env.NODE_ENV + ' environment');

var config = {
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || 3000,
    base_path: path.join(__dirname, '../'), // ~/src/
    database: {
      version:  process.env.DB_ENV_PG_MAJOR,
      lang:     process.env.DB_ENV_LANG,
      host:     'db', // defined host in the docker-compose file
      dbname:   process.env.DB_NAME,
      user:     process.env.DB_ENV_POSTGRES_USER,
      password: process.env.DB_ENV_POSTGRES_PASSWORD

    }
};

export default config;
