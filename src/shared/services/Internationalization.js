import IntlMessageFormat from 'intl-messageformat';
import config from '../config';
import cache from '../utils/localizations';

/**
 * Class for handling with i18n strings
 */
class Internationalization {

  constructor(language) {
    this.defaultLanguage = config.default_langauge;
    this.cache = cache;
    this.language = language || this.defaultLanguage;
  }

  /**
   * function that gives you either a localization template for
   * 1) your language
   * 2) default language
   * 3) [ key ]
   */
  getCachedItem(key) {
    var code =      this.cache[this.language + '/' + key]
                ||  this.cache[this.defaultLanguage + '/' + key]
                ||  `[ {key} ]`;
    return code;
  }

  /**
   * gets a translated string for a given key
   * optional you can give data (needed for some keys as parameter)
   */
  get(key, data = {}) {
    let code = this.getCachedItem(key);
    let message = new IntlMessageFormat(code, this.language);
    return message.format(data);
  }

}

export default Internationalization;
