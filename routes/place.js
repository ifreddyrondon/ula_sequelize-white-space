var db = require('../models');

exports.create = function(req, res) {
  db.Place.create({ 
  	name: 'Merida City'
  }).success(function() {
    res.redirect('/');
  });
};
