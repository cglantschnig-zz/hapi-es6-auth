module.exports = {
  up: function(migration, DataTypes) {
    return migration.createTable('RefreshTokens', {
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
        type: DataTypes.DATE,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE
      },
      updated_at: {
        type: DataTypes.DATE
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      }
    });
  },

  down: function(migration, Sequelize) {
    return migration.dropTable('RefreshTokens');
  }
};
