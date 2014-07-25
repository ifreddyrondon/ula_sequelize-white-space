var db = require('../models');

exports.create = function(req, res) {
  db.Place.create({ 
  	name: 'Merida City',
  	UserId: 1
  }).success(function() {
    res.redirect('/');
  });
};
