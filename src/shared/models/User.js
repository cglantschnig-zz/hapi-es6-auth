'use strict';

import crypto from 'crypto';
import promisify from 'es6-promisify';

let hashWord = promisify(crypto.pbkdf2);

export default function(sequelize, DataTypes) {
  var User = sequelize.define('User', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function(email) {
        this.setDataValue('email', email.toLowerCase());
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(2048),
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin']
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    resetToken: {
      type: DataTypes.STRING
    },
    resetTokenValidity: {
      type: DataTypes.DATE
    }

  },
  {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.RefreshToken);
        User.hasMany(models.AccessToken);
      }
    },
    instanceMethods: {
      hashPassword: function() {
        var salt = crypto.randomBytes(128).toString('base64');

        return hashWord(this.password, salt, 10000, 512)
          .then((derivedKey) => {
            this.password = derivedKey.toString('hex');
            this.salt = salt;
            return this;
          });
      },
      comparePassword: function(password) {
        return hashWord(password, this.salt, 10000, 512)
          .then((hashedPassword) => {
            return hashedPassword.toString('hex') === this.password;
          });
      }
    }
  });

  return User;
}
