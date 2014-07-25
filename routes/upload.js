var db = require('../models'),
	parser = require('./utils/parser'),
	fs = require('graceful-fs'),
	async = require('async');

// TODO: 1 - add error parameter to the callback of parser.toJSON 
//		 2 - errors handler

/*--------------------------------------------------------------------------------------------------------------*/
exports.upload = function(req, res){
	if (req.body.zone && req.files.data && req.files.data.length > 0) {
		
		parser.toJSON(req.body.zone,req.files.data, function(data){
			insertPlace(data, function(err){
				if (err) {
					// call errorHanldler
					console.log(err);
					res.send('ERROR');
				} else 
					res.redirect('/');
			});

			// fs.writeFile('public/my.json', JSON.stringify(data, null, 4), function(err) {
			//     if(err) 
			//       	console.log(err);
			//     else 
			//       	res.redirect('/');
			// });

		});
	}
	else {
		// call errorHanldler
		console.log('Error occured incomplete data');
		res.send('ERROR');
	}	
};

/*--------------------------------------------------------------------------------------------------------------*/
function insertPlace(data, callback){
	
	db.Place.findOrCreate({
		name: data.name, 
		numberCoordinates : data.numberCoordinates,
		potencyMin : data.potencyMin,
		potencyMax : data.potencyMax,
		potencyAvg : data.potencyAvg,
		sdPotencyAvg : data.sdPotencyAvg,
		avgPotencySD : data.avgPotencySD,
		UserId:1
	}).success(function(place, created){
	    insertCoordinates(data, place, function(err){
	    	if (err)
				callback(err);
			else 
				callback();
	    });
	})
	.error(function(err){
		callback('Error occured ' + err);
	});

}

/*--------------------------------------------------------------------------------------------------------------*/
function insertCoordinates(data,place,callback){

	async.each(data.coordinates, function(coordinate, callback) {

		insertCoordinate(coordinate,place.id,function(err){
			if(err) 
	    		callback(err);
	  		else
	    		callback();
	  	});
	  
	}, function(err){	    
	    if(err) 
	    	callback(err);
	    else 
	    	callback();
	});
}

/*--------------------------------------------------------------------------------------------------------------*/
function insertCoordinate(data,placeId,callback){

	db.Coordinate.findOrCreate({
		latitude: data.latitude,
		longitude: data.longitude,
		numberPotencyFrequency: data.numberPotencyFrequency,
		potencyMin: data.potencyMin,
		potencyMax : data.potencyMax,
		potencyAvg : data.potencyAvg,
		potencySD : data.potencySD,
		createdDate: data.createdDate,
		PlaceId: placeId,
	}).success(function(coordinate, created){
		if(created){
			insertPotencyFrequency(data.data,coordinate.id,function(err){
				if (err)
					callback(err);
				else
					callback();
			});	
		} else 
			callback();
	})
	.error(function(err){
		callback('Error occured' + err);
	});

}

/*--------------------------------------------------------------------------------------------------------------*/
function insertPotencyFrequency(data,coordinateId,callback){	
	async.each(data, function(unit, callback) {
		unit.CoordinateId = coordinateId;
	  	callback();
	
	}, function(err){	    
	    if(err) 
	    	callback(err);
	    else {
	    	db.PotencyFrequency.bulkCreate(data)
			.success(function() { 
				callback();
			}).error(function(err){
				callback(err);
			});
	    }
	});
}
