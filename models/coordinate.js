module.exports = function(sequelize, DataTypes) {
  var Coordinate = sequelize.define('Coordinate', {
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: -90, max: 90 }
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: -180, max: 180 }
    },
    numberPotencyFrequency: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    potencyMin: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    potencyMax : {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    potencyAvg : {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    potencySD : {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    createdDate : {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    }
  }, {

    associate: function(models) {
      Coordinate.belongsTo(models.Place);
      Coordinate.hasMany(models.PotencyFrequency);            
    },

    validate: {
      bothCoordsOrNone: function() {
        if ((this.latitude === null) || (this.longitude === null)) {
          throw new Error('Require either both latitude and longitude');
        }
      }
    },

  });
 
  return Coordinate;
};