'use strict';

/**
 * This file returns an object like this as default export
 * {
 *   sequelize: [object],
 *   Sequelize: [object],
 *   User: [Model],
 *   ...
 * }
 *
 * If you need a specific model in your code then call it like
 * import { Model } from './shared/models/';
 *
 * More infos on how to work with models can you find here: http://docs.sequelizejs.com/en/latest/
 *
 */

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config';
var sequelize = new Sequelize(config.database.name, config.database.user, config.database.password, {
  dialect: 'postgres',
  host: config.database.host,
  logging: false,
  define: {
    underscored: true
  }
});
var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
