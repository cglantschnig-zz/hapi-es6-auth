module.exports = {
  up: function(migration, DataTypes) {
    return migration.createTable('RefreshTokens', {
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
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    });
  },

  down: function(migration, Sequelize) {
    return migration.dropTable('RefreshTokens');
  }
};
