const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Vehiculo = sequelize.define('Vehiculos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    marca: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    modelo: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    ando_fabricacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    kilometros: {
      type: DataTypes.FLOAT(11,1),
      allowNull: false
    },
    puertas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_combustible: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT(8,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Vehiculos',
    timestamps: false,
  });

  Vehiculo.associate = (models) => {
    Vehiculo.belongsTo(models.Combustibles, {
      as: 'combustiblevehiculo',
      foreignKey: 'id_combustible'
    })
    Vehiculo.hasOne(models.Ventas, {
      as: 'ventavehiculo',
      foreignKey: 'id_vehiculo',
    })
  }
  return Vehiculo;
};
