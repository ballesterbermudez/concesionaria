const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Combustible = sequelize.define('Combustibles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Combustibles',
    timestamps: false
  });

  Combustible.associate = (models) => {
    Combustible.hasMany(models.Vehiculos, {
      as: 'vehiculocombustible',
      foreignKey: 'id_combustible'
    })
  }

  return Combustible;
};
