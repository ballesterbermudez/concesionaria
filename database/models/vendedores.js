const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Vendedor = sequelize.define('vendedores', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'vendedores',
    timestamps: false,
  });

  Vendedor.associate = (models) => {
    Vendedor.hasMany(models.Ventas, {
      as: 'ventavendedor',
      foreignKey: 'id_vendedor'
    })
  }


  return Vendedor;
};
