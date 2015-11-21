import { readFile } from 'fs';
import recursiveReaddir from 'recursive-readdir';
import promisify from 'es6-promisify';
import config from '../config';


const recursiveReaddirAsync = promisify(recursiveReaddir);
const readFileAsync = promisify(readFile);

let cache = {};

export function loadLanguageFiles() {

  return recursiveReaddirAsync(config.i18n_path)
    .then((files) => {
      let promises =  files.map((filename) => {
        const relativePath = filename.substring(config.i18n_path.length + 1, filename.lastIndexOf('.'));
        return readFileAsync(filename, 'utf8')
          .then((content) => {
            let obj = JSON.parse(content);
            for (let key in obj) {
              let intKey = relativePath + '/' + key;
              cache[intKey] = obj[key];
            }
          });
      });
      return Promise.all(promises);
    })
    .then(() => {
      return cache;
    });
    
}

export default cache;
