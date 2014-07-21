var db = require('../models');

exports.create = function(req, res) {
  db.User.create({ 
  	email: 'spantons@gmail.com',
  	password: '123123'
  }).success(function() {
    res.redirect('/');
  });
};
