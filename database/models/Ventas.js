const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Venta = sequelize.define('Ventas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_vehiculo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_vendedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Ventas',
    timestamps: false,
  });

  Venta.associate = (models) => {
    Venta.belongsTo(models.vendedores, {
      as: 'vendedorventa',
      foreignKey: 'id_vendedor'
    })
    Venta.belongsTo(models.Vehiculos, {
      as: 'vehiculoventa',
      foreignKey: 'id_vehiculo',
    })
  }

  return Venta;
};
