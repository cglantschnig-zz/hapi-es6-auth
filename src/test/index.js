/**
 * hapi-es6-starter
 *
 * This is a little starter kit to create an api with hapi and the newest es6 features compiled with babel.
 * As soon the node run time you just need to remove require('babel/register') and the app will run like expected.
 *
 * Author: Christopher Glantschnig
 *
 */

require('babel/register');

/**
 * initializes the test suits. and set the environment before
 */
process.env.NODE_ENV = 'test';
require('./init');
