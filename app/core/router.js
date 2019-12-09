module.exports = function(app,auth) {

	function authentication_check(req, res, next){
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        if (req.isAuthenticated()){
            next();
        }else{
			res.redirect('/');
        }
	}
	

	var router = require('express').Router();

	app.all('/app/*', authentication_check);
	require('../routes/auth')(auth, router);
	require('../routes/app/index')(router);
	require('../routes/app/admin')(router);
	app.use('/', router);
	
	app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
	});
	
	app.use(function(err, req, res, next) {
        if(!err.status){
            err.status = 500;
		}
        if(!err.message){
            if ( err.status = 500 )
                err.message = "An error occured";
            else if ( err.status = 404 )
                err.message = "Page not found";
		}
        res.render('error', {
			layout: false,
			message: err.message,
			status: err.status
        });
    });
};