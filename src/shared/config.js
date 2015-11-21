/**
 * Config file, which is interpreting all the environment variables
 */

import path from 'path';

const allowedEnvironments = [
  'development',
  'test'
];
const environment = process.env.NODE_ENV;

// test if the given environment is a valid one
if ( allowedEnvironments.indexOf(environment) < 0 ) {
  console.error('Invalid Environment');
  process.exit(1);
}

console.log('Using ' + environment + ' environment');

const config = {
  environment: environment,
  host: process.env.APP_HOST || '0.0.0.0',
  port: process.env.APP_PORT || 3000,
  base_path: path.join(__dirname, '../'), // ~/src/
  mail: {
    is_enabled: environment === 'test' ? false : process.env.MAIL_ENABLED === 'enabled',
    key: process.env.MAIL_SERVICE_KEY,
    from_address: process.env.MAIL_FROM_ADDRESS,
    template_path: path.join(__dirname, 'templates') // ~/src/shared/templates/
  },
  api_database: {
    version:  process.env.DB_ENV_PG_MAJOR,
    lang:     process.env.DB_ENV_LANG,
    host:     'db', // defined host in the docker-compose file
    dbname:   process.env.DB_NAME,
    user:     process.env.DB_ENV_POSTGRES_USER,
    password: process.env.DB_ENV_POSTGRES_PASSWORD
  },
  test_database: {
    version:  process.env.DB_TEST_ENV_PG_MAJOR,
    lang:     process.env.DB_TEST_ENV_LANG,
    host:     'db_test', // defined host in the docker-compose file
    dbname:   process.env.DB_TEST_NAME,
    user:     process.env.DB_TEST_ENV_POSTGRES_USER,
    password: process.env.DB_TEST_ENV_POSTGRES_PASSWORD
  },
  token_validity: 1 * 60 * 60, // 1 hour
  refresh_token_validity: 30 * 24 * 60 * 60, // 30 days
  default_langauge: process.env.DEFAULT_LANGUAGE || 'en',
  i18n_path: path.join(__dirname, 'i18n')
};

// set the database which is about to be used
config.database = config.api_database;

// make test specific changes
if (environment === 'test') {
  config.database = config.test_database;
}

export default config;
