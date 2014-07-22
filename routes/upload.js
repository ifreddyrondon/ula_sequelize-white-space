var db = require('../models'),
	parser = require('./parser'),
	fs = require('graceful-fs');

exports.upload = function(req, res){

	if (req.body.zone && req.files.data && req.files.data.length > 0) {
		parser.toJSON(req.body.zone,req.files.data, function(data){
			
			fs.writeFile('public/my.json', JSON.stringify(data, null, 4), function(err) {
			    if(err) {
			      console.log(err);
			    } else {
			      console.log("JSON saved");
			    }
			});
			res.redirect('/');

		});
	}
	else {
		console.log('errrorrrr');
	}
	
};


