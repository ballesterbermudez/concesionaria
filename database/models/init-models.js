var DataTypes = require("sequelize").DataTypes;
var _Combustibles = require("./Combustibles");
var _Vehiculos = require("./Vehiculos");
var _Ventas = require("./Ventas");
var _vendedores = require("./vendedores");

function initModels(sequelize) {
  var Combustibles = _Combustibles(sequelize, DataTypes);
  var Vehiculos = _Vehiculos(sequelize, DataTypes);
  var Ventas = _Ventas(sequelize, DataTypes);
  var vendedores = _vendedores(sequelize, DataTypes);

  Vehiculos.belongsTo(Combustibles, { as: "id_combustible_Combustible", foreignKey: "id_combustible"});
  Combustibles.hasMany(Vehiculos, { as: "vehiculos", foreignKey: "id_combustible"});
  Ventas.belongsTo(Vehiculos, { as: "id_vehiculo_Vehiculo", foreignKey: "id_vehiculo"});
  Vehiculos.hasMany(Ventas, { as: "venta", foreignKey: "id_vehiculo"});
  Ventas.belongsTo(vendedores, { as: "id_vendedor_vendedore", foreignKey: "id_vendedor"});
  vendedores.hasMany(Ventas, { as: "venta", foreignKey: "id_vendedor"});

  return {
    Combustibles,
    Vehiculos,
    Ventas,
    vendedores,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
