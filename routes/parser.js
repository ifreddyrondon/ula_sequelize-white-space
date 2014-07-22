var lineReader = require('line-reader'),
	async = require('async'),
	path = require('path'),
	fs = require('graceful-fs');

/*--------------------------------------------------------------------------------------------------------------*/
exports.toJSON = function(zone, data, callback){

	var place = {};
	place.name = zone;
	place.numberCoordinates = 0;
	place.coordinates = [];

	async.series([
		function(callback){

			if(data[0] === undefined){
				if (path.extname(data.name).toLowerCase() === '.txt') 
					extractCoordinateObject(place,data);
				callback();
			}
			else if(data.length > 1) {
				async.eachSeries(data, function(file, callback) {
					if (path.extname(file.name).toLowerCase() === '.txt') 
						extractCoordinateObject(place,file);
					
					callback();
				});	
				callback();	
			}

		},function(callback2){
			callback(place);
		}
	]);
};

/*--------------------------------------------------------------------------------------------------------------*/
function extractCoordinateObject(place, file){
	async.series([
		function(callback){
			arrayCoordinate = [];
			arrayFrequencyPotency = [];
			coordinate = {};
			numberPotencyFrequency = 0;
			potencyMin = null;
			potencyMax = null;
			potencyAvg = null;
			potencySD_X = null;
			potencySD_M = null;
			callback();
		},
		function(callback){
		    array = fs.readFileSync(file.path).toString().split("\n");
			callback();
		},
		function(callback){
			async.eachSeries(array, function(line, callback) {
		    	lineSplit = line.split("\t");	
				if(lineSplit.length == 2){
					var newPotency = Number(lineSplit[1]);
					if(potencyMin === null)
						potencyMin = potencyMax = newPotency;
					else {
						if (potencyMax < newPotency)
							potencyMax = newPotency;
						if (potencyMin > newPotency)
							potencyMin = newPotency;
					}
					potencyAvg = potencyAvg + newPotency;
					potencySD_M = potencySD_M + newPotency;
					potencySD_X = potencySD_X + (newPotency * newPotency);
					numberPotencyFrequency ++;
					arrayFrequencyPotency.push([Number(lineSplit[0]),Number(lineSplit[1])]);
				}
				else if(lineSplit.length == 1)
					arrayCoordinate.push(lineSplit);

				callback();
			}, null);
				
		callback();
		},
		function(callback){
			coordinate.latitude = Number(arrayCoordinate[0]);
			coordinate.longitude = Number(arrayCoordinate[1]);
			coordinate.numberPotencyFrequency = numberPotencyFrequency;
			coordinate.potencyMax = potencyMax;
			coordinate.potencyMin = potencyMin;
			coordinate.potencyAvg = potencyAvg / numberPotencyFrequency;
			coordinate.potencySD = Math.sqrt((potencySD_X - (potencySD_M*potencySD_M)/numberPotencyFrequency)/(numberPotencyFrequency - 1));
			coordinate.createdDate = String(arrayCoordinate[2]);
			coordinate.data = arrayFrequencyPotency;
			place.numberCoordinates ++;
			place.coordinates.push(coordinate);
			callback();
		}
	]);
}
