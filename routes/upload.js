var db = require('../models'),
	parser = require('./parser');

exports.upload = function(req, res){

	if (req.body.zone && req.files.data) {
		parser.toJSON(req.body.zone,req.files.data);
	}
	
};


