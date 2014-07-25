var db = require('../models');

exports.create = function(req, res) {
  db.User.create({ 
  	email: 'spantons@gmail.com',
  	password: '123123'
  }).success(function() {
    // res.redirect('/');

    db.Place.create({ 
  		name: '123',
  		UserId: 1
  	}).success(function() {
    	res.redirect('/');
  	});


  });
};
