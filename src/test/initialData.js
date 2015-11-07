import fs from 'fs';
import path from 'path';
import models from '../shared/models/';

const dataPath = path.join(__dirname, 'data');

/**
 * default export initializes all initial data, which is stored in the data folder
 */
export default function insertTestData() {
  return fs
    .readdirSync(dataPath)
    .map(function(filename) {
      let objectName = filename.split('.').shift();
      // if we no model for the data file throw an exception, otherwise create the data
      if (!models[objectName]) {
        throw 'Model ' + objectName + ' doesnt exists!';
      }
      let initialData = require(path.join(dataPath, filename));
      return models[objectName].bulkCreate(initialData);
    });
}
