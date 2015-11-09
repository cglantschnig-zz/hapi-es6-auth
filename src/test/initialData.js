import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, 'data');

/**
 * default export initializes all initial data, which is stored in the data folder
 */
export default function insertTestData() {
  var promiseArray = fs
    .readdirSync(dataPath)
    .map(function(filename) {
      return require(path.join(dataPath, filename));
    });
    let promise = Promise.resolve();
    for (let i in promiseArray) {
      promise = promise.then(() => { return promiseArray[i](); });
    }
    return promise;
}
