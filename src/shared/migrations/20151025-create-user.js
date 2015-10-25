export default {
  up: function(migration, DataTypes) {
    return migration.createTable('Users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(512),
        allowNull: false
      },
      salt: {
        type: DataTypes.STRING(128),
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
    migration.dropTable('Users');
  }
};
