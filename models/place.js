module.exports = function(sequelize, DataTypes) {
  var Place = sequelize.define('Place', {
    name: { 
    	type: DataTypes.STRING,
    	allowNull: false,
    }
  }, {

  	associate: function(models) {
    	Place.hasMany(models.Coordinate);      
  	}

  });
 
  return Place;
};


