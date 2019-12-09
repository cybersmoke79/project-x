module.exports = function(router){

	var AppRoute = require('express').Router({
        mergeParams: true
	});


	AppRoute.get('/users', function(req, res) {
		if (req.isAuthenticated()){
			var user = req.user;
			res.render('dashboard/admin/users', { title: 'Dashboard', user: user });
		} else {
			res.redirect('/');
		}
	});

	router.use('/app/admin', AppRoute);
};