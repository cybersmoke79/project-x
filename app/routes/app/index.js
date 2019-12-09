module.exports = function(router){

	var async = require('async');

	var AppRoute = require('express').Router({
        mergeParams: true
	});

	var operatorService = require('../../services/operator');
	var walletrService = require('../../services/wallet');

	AppRoute.get('/', function(req, res) {
		if (req.isAuthenticated()){
			var user = req.user;
			res.render('dashboard/home', { title: 'Dashboard', user: user });
		} else {
			res.redirect('/');
		}
	});

	AppRoute.get('/transactions', function(req, res) {
		if (req.isAuthenticated()){
			var user = req.user,
				wallet = false,
				start = '',
				end = '';
			if (typeof req.query.wallet != 'undefined') {
				wallet = req.query.wallet;
			}
			if (typeof req.query.start != 'undefined') {
				start = req.query.start;
			}
			if (typeof req.query.end != 'undefined') {
				end = req.query.end;
			}
			async.parallel({
				wallets: function(callback) { 
					walletrService.list(req, function(data){
						callback(null, data);
					});
				}
			}, function(err, results) {
				res.render('dashboard/transactions', { title: 'Transactions', user: user, data : results, wallet : wallet, start : start, end : end  });
			});
		} else {
			res.redirect('/');
		}
	});

	AppRoute.get('/wallets', function(req, res) {
		if (req.isAuthenticated()){
			var user = req.user;
			async.parallel({
				wallets: function(callback) { 
					walletrService.list(req, function(data){
						callback(null, data);
					});
				},
				operators : function(callback){
					operatorService.list(req, function(data){
						callback(null, data);
					});
				},
			}, function(err, results) {
				res.render('dashboard/wallets', { title: 'Wallets', user: user, data : results  });
			});
			
		} else {
			res.redirect('/');
		}
	});

	AppRoute.get('/access', function(req, res) {
		if (req.isAuthenticated()){
			var user = req.user;
			res.render('dashboard/access', { title: 'API Keys', user: user });
		} else {
			res.redirect('/');
		}
	});

	require('./data')(AppRoute);

	router.use('/app', AppRoute);
};