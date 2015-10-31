module.exports = {
  up: function(migration, DataTypes) {
    return migration.createTable('AccessTokens', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      token: {
        type: DataTypes.UUID,
        allowNull: false
      },
      expires_in: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE
      },
      updated_at: {
        type: DataTypes.DATE
      }
    });
  },

  down: function(migration, Sequelize) {
    return migration.dropTable('AccessTokens');
  }
};
