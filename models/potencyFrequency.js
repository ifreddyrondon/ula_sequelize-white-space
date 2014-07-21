module.exports = function(sequelize, DataTypes) {
  var PotencyFrequency = sequelize.define('PotencyFrequency', {
    potency: { 
    	type: DataTypes.FLOAT,
      allowNull: false,
    },
    frequency: { 
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
  	associate: function(models) {
    	PotencyFrequency.belongsTo(models.Coordinate);
  	}

  });
 
  return PotencyFrequency;
};


