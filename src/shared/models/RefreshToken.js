'use strict';

export default function(sequelize, DataTypes) {
  var RefreshToken = sequelize.define('RefreshToken', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expires_in: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  },
  {
    classMethods: {
      associate: function(models) {
      }
    }
  });

  return RefreshToken;
};
