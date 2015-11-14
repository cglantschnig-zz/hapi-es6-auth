module.exports = {
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
      resetToken: {
        type: DataTypes.STRING
      },
      resetTokenValidity: {
        type: DataTypes.DATE
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
    return migration.dropTable('Users');
  }
};
