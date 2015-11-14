/**
 * List of plugins which are about to be installed. Read more at:
 * http://hapijs.com/tutorials/plugins
 */
import config from '../../shared/config';

let pluginList = [
  {
    register: require('hapi-auth-bearer-token')
  },
  {
    register: require('hapi-authorization'),
    options: {
        // All the possible roles. Defaults to SUPER_ADMIN, ADMIN, USER, GUEST.
        // Can be set to false if no hierarchy is being used. by setting to
        // false you do not need to know all the potential roles
        // You can also pass a function, which returns the desired values
        roles: ['user', 'admin'],

        // An option to turn on or off hierarchy. Defaults to false
        hierarchy: false,

        // The role hierarchy. Roles with a lower index in the array have access
        // to all roles with a higher index in the array. With the default roles,
        // this means that USER has access to all roles restricted to GUEST,
        // ADMIN has access to all roles restricted to USER and GUEST, and
        // SUPER_ADMIN has access to all roles restricted to ADMIN, USER, and GUEST.
        roleHierarchy: []
    }
  }
];

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
