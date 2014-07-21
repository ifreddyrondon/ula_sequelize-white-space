var lineReader = require('line-reader'),
	async = require('async'),
	path = require('path'),
	fs = require('graceful-fs');

exports.toJSON = function(zone, data){

	if (data.length > 0) {

		var place = {};
		place.name = zone;
		place.coordinates = [];

		async.series([
			function(callback){
				async.eachSeries(data, function(file, callback) {

					if (path.extname(file.name).toLowerCase() === '.txt') {

						async.series([
							function(callback){
								arrayCoordinate = [];
								arrayFrequencyPotency = [];
								coordinate = {};
								potencyMin = -1000;
								potencyMax = -1000;
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
										if(potencyMax == -1000 || potencyMin == -1000)
											potencyMin = potencyMax = lineSplit[1];
										else {
											if (potencyMax > lineSplit[1])
												potencyMax = lineSplit[1];
											if (potencyMin < lineSplit[1])
												potencyMin = lineSplit[1];
										}
										arrayFrequencyPotency.push(lineSplit);
									}
									else if(lineSplit.length == 1)
										arrayCoordinate.push(lineSplit);

									callback();
								}, null);
									
							callback();
							},
							function(callback){
								coordinate.latitude = arrayCoordinate[0];
								coordinate.longitude = arrayCoordinate[1];
								coordinate.createdDate = arrayCoordinate[2];
								coordinate.potencyMax = potencyMax;
								coordinate.potencyMin = potencyMin;
								coordinate.data = arrayFrequencyPotency;
								place.coordinates.push(coordinate);
								callback();
							}
						]);

					}
					callback();
				});	
				callback();

			},function(callback){
				fs.writeFile('public/my.json', JSON.stringify(place, null, 4), function(err) {
				    if(err) {
				      console.log(err);
				    } else {
				      console.log("JSON saved");
				    }
				}); 
				
			}
		]);
	}

	

//{'name': 'Merida','coordNumber' : 1, 'coordinates' : [{'latitud':0,'longitud':0,'createdDate':'nada','dataNumber':0,'potencyMin':0,potencyMax:'0',data:[]}]}

};