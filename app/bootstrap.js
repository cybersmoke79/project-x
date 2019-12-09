/**
 * App bootstrap
 * Load and configure the app
 */
module.exports = function(app, dirname, express) {

    var exphbs  = require('express-handlebars');
	var session = require('express-session');
	var path = require('path');
	var favicon = require('serve-favicon');
	var flash = require("connect-flash");
	var logger = require('morgan');
	var cookieParser = require('cookie-parser');
	var bodyParser = require('body-parser');
	var errorhandler = require('errorhandler');
    var settings = require('./config/app');
    
    var _server_date = new Date();
	var _server_year = _server_date.getFullYear();

	app.locals.year = _server_year;

	app.set('views', path.join(dirname, 'views'));
	app.engine('.hbs', exphbs({
				helpers: require('./core/handlebars'),
				defaultLayout: 'main',
				extname: '.hbs',
				
				partialsDir: [
					'views/partials/'
				]
				}));
	app.set('view engine', '.hbs');
	app.set('title', settings.app.name);

	//app.use(favicon(dirname + '/public/favicon.ico'));
	app.use(logger('dev'));
	app.use(flash());
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(dirname, 'public')));
	app.use(session({
		secret: settings.app.secret,
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge:31536000000 }
	}));

	app.use(errorhandler({
        dumpExceptions: true,
        showStack: true
    }));

    app.set('port', settings.app.port);

    require('./core/functions')(app);
    
    var auth = require('./core/auth');

    app.use(auth.libs.passport.initialize());
    app.use(auth.libs.passport.session());

    auth(app);

	require('./core/router')(app, auth);
};