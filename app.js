
/**
 * Module dependencies.
 */

var express = require('express'), 
    routes = require('./routes'),
    upload = require('./routes/upload'),
    user = require('./routes/user'),
    place = require('./routes/place'),
    coordinate = require('./routes/coordinate'),
    potencyFrequency = require('./routes/potencyFrequency'),
    http = require('http'),
    path = require('path'),
    db = require('./models');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.post('/upload', upload.upload);

app.post('/users', user.create);
app.post('/places', place.create);
app.post('/places/:id_name/coordinate', coordinate.create);
app.post('/places/:id_name/:id_coordinate/potencyFrequency', potencyFrequency.create);

db
  .sequelize
  .sync({ force: true })
  .complete(function(err) {
    if (err) {
      throw err[0];
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
      });
    }
  });
