import IntlMessageFormat from 'intl-messageformat';
import config from '../config';
import cache from '../utils/localizations';

class Internationalization {

  constructor(language) {
    this.defaultLanguage = config.default_langauge;
    this.cache = cache;
    this.language = language || this.defaultLanguage;
  }

  getCachedItem(key) {
    var code =      this.cache[this.language + '/' + key]
                ||  this.cache[this.defaultLanguage + '/' + key]
                ||  `[ {key} ]`;
    return code;
  }

  get(key, data = {}) {
    let code = this.getCachedItem(key);
    let message = new IntlMessageFormat(code, this.defaultLanguage);
    return message.format(data);
  }

}

export default Internationalization;
