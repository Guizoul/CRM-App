'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Salle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Salle.init({
    type: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    batiment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Salle',
  });
  return Salle;
};