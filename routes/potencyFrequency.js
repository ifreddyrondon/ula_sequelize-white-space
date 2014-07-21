var db = require('../models');

exports.create = function(req, res) {
  	db.Place.find({ where: { name: 'Merida City' } }).success(function(place) {
		db.Coordinate.find({ where: {latitude: 8.1233}}).success(function(coordinate) {    

			db.PotencyFrequency.create({potency: -20,frequency: 300000}).success(function(potencyFrequency) {
				potencyFrequency.setCoordinate(coordinate).success(function() {
        			res.redirect('/');
      			});
			});
  		});
  	});
};