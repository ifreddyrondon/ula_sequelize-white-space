module.exports = function(sequelize, DataTypes) {
  var Place = sequelize.define('Place', {
    name: { 
    	type: DataTypes.STRING,
    	allowNull: false,
    },
    numberCoordinates: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {

  	associate: function(models) {
    	Place.hasMany(models.Coordinate);      
  	}

  });
 
  return Place;
};


