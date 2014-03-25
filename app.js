var express = require('express');
var http = require('http');
var path = require('path');
var oauth = require('oauth');
var mongoose = require('mongoose');
var querystring= require('querystring');
var socketio = require('socket.io');
var routes = require('./routes');
var user = require('./routes/user');
var config = require('./config');
var app = express();
app.locals({
	//local varibles for through out website
	 title: 'E-Supporters'
});
// all environments
app.configure( function() {
		app.set('port', process.env.PORT || 3000);
    app.use(express.static(path.join(__dirname, 'public')));
		app.set('views', path.join(__dirname, 'views'));
		app.set('view engine', 'ejs');
		app.use(express.favicon());
		app.use(express.logger('dev'));
		app.use(express.json());
		app.use(express.urlencoded());
	  app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser(config.cookiesecret));
		app.use(express.session({
            secret: config.sid,
            key: config.key,
            cookie: {
                secret: true,
                 expires: new Date(Date.now() + 60 * 60000), 
                 maxAge: 60*60000    //60 mints
            }
       }));
		app.use(app.router);

});

//DataBase
mongoose.connect(config.dbUrl_heroku, function  (err) {
  if (err) console.log('unable to connect to database: '+err );
  else
  	 console.log('DataBase Connected.');
});

var models = require('./models');
function db (req, res, next) {
  req.db = {
    User : models.User,
    Comment : models.Comment,
    Pm : models.Pm
   };
  return next();
}


//routes
app.get('/',db,routes.Home);
app.post('/register',db,routes.user.register);
app.post('/logout',routes.user.logout);
app.post('/vote/:id',db,routes.user.checkUser,routes.pm.VoteUp,routes.pm.countVotes);
app.get('*',routes.Page404);


//app.get('/comment/:id',routes);
//app.post('/comment/:id',routes.pm.commnet);

//api
//app.get('/api/getvotes');
//app.get('api/getnewusers');

//admin
//app.get('/admin/pm/new',db,routes.pm.New);
//app.post('/admin/pm/add',db,routes.pm.Add);

 


//server
var server = http.createServer(app);
var io = socketio.listen(server);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//sockets
io.sockets.on('connection', function (socket) {
 var intervalid = setInterval(function () {
    models.User.findOne({},'DisplayName ProfilePic',{ sort:{Updated_at :-1 }},function (err,user) {
      models.Pm.find({},'Votes',function  (err,pms) {
        var d = {
         date : new Date(),
         User : user,
         Pm : pms
        };
        socket.emit('serverdata',  d );       
      });
     });
  },10000);
 socket.on('disconnect', function () {
    console.log('@@@@@@@-------------Disconnecting from sockets');
    clearInterval(intervalid);
  });
 
});