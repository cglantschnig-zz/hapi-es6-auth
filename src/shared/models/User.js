'use strict';

import crypto from 'crypto';

export default function(sequelize, DataTypes) {
  var User = sequelize.define('User', {

    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(128),
      allowNull: false
    }

  },
  {
    classMethods: {
      associate: function(models) {
      }
    }
  });

  var hashPasswordHook = function(instance, done) {
    if (!instance.changed('password')) return done();
    var salt = crypto.randomBytes(128).toString('base64');
    crypto.pbkdf2(user.password, salt, 10000, 512, function(err, derivedKey) {
      instance.set('password', derivedKey);
      instance.set('salt', salt);
      done();
    });
  };
  User.beforeCreate(hashPasswordHook);
  User.beforeUpdate(hashPasswordHook);

  return User;
};
