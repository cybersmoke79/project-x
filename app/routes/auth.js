module.exports = function (auth, router) {

	var authService = require('../services/auth');

	router.get('/', function (req, res) {
		if (req.isAuthenticated()) {
			res.redirect('/app');
		} else {
			res.render('auth/login', { layout: 'auth', title: 'Login' });
		}
	});

	router.get('/login', function (req, res) {
		if (req.isAuthenticated()) {
			res.redirect('/app');
		} else {
			res.render('auth/login', { layout: 'auth', title: 'Login' });
		}
	});

	router.get('/logout', function (req, res) {
		authService.logout(req, res);
	});

	router.get('/register', function (req, res) {
		if (req.isAuthenticated()) {
			res.redirect('/app');
		} else {
			res.render('auth/register', { layout: 'auth', title: 'Create your account' });
		}
	});

	router.get('/reset-process', function (req, res) {
		if (req.isAuthenticated()) {
			res.redirect('/app');
		} else {
			if (typeof req.query.token != 'undefined') {
				res.render('auth/password', { layout: 'auth', title: 'Update your password', token : req.query.token });
			} else {
				res.redirect('/reset');
			}
		}
	});


	router.get('/reset', function (req, res) {
		if (req.isAuthenticated()) {
			res.redirect('/app');
		} else {
			res.render('auth/reset', { layout: 'auth', title: 'Reset your password' });
		}
	});


	router.post('/login', auth.libs.passport.authenticate('login', {
		successRedirect: '/login/success',
		failureRedirect: '/login/error',
		failureFlash: true
	}));


	router.post('/reset', function (req, res) {
		authService.reset.request(req,res);
	});

	router.post('/reset-process', function (req, res) {
		authService.reset.process( req, res);
	});

	router.post('/register', function (req, res) {
		authService.register( req, res );
	});

	router.get('/login/success', function(req, res) {
		res.json({ status : true,  message: 'Login successful', reload : true });
	});
	
	router.get('/login/error', function(req, res) {
		res.json({ status : true, message: 'Invalid username or password' });
	});
};