/**
 * List of plugins which are about to be installed. Read more at:
 * http://hapijs.com/tutorials/plugins
 */
import config from '../../shared/config';

let pluginList = [];

// plugins that should just be enabled if we are not in test environment
if (config.environment !== 'test') {
  pluginList.push({
    register: require('good'),
    options: {
      opsInterval: 1000,
      reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
      }]
    }
  });
}

export default pluginList;
