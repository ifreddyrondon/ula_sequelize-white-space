var db = require('../models');

exports.create = function(req, res) {
  	db.Place.find({ where: { name: 'Merida City' } }).success(function(place) {
    	db.Coordinate.create({latitude: 8.1233,longitude: -78.88}).success(function(coordinate) {
      		coordinate.setPlace(place).success(function() {
        		res.redirect('/');
      		});
    	});
  	});
};