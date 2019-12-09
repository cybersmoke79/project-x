var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var lo = require('lodash');

var libs = {
	passport: passport,
	LocalStrategy: LocalStrategy,
	lo: lo
};


module.exports = function (app) {
	libs.passport.serializeUser(function (user, done) {
		done(null, user);
	});

	libs.passport.deserializeUser(function (user, done) {
		done(null, user);
	});

	libs.passport.use('login', new LocalStrategy({
		passReqToCallback: true
	},
		function (req, username, password, done) {

			rest.oauth_login(username, password, function (success, response) {
				if (success) {
					
					var app_response = JSON.parse(response);
					var user = {}
					account = {};
					
					if (app_response.access_token) {
						user = {};
						user.access_token = app_response.access_token;
						user.refresh_token = app_response.refresh_token;
						user.expires_in = app_response.expires_in;
						user.token_type = app_response.token_type;
						user.scope = app_response.scope;

						//Get the profile
						rest.oauth_request_get('/api/me', app_response.access_token, function (status, user_profile) {
							if (status) {
								if (user_profile.status == 'success') {
									if ( user_profile.active ) {
										user.login = user_profile.login;
										user.name = user_profile.name;
										user.email = user_profile.email;
										user.role = user_profile.role;
										user.id = user_profile.id;
										user.active = user_profile.active;
										var access  = {
											super : false,
											admin : false,
											client : false
										};
										if (user_profile. role == 'SUPERADMIN') {
											access.super = true;
											access.admin = true;
										}
										if (user_profile. role == 'ADMIN') {
											access.admin = true;
										}
										if (user_profile. role == 'CLIENT') {
											access.client = true;
										}
										user.access = access;
										return done(null, user);
									} else {
										return done(null, false);
									}
								} else {
									return done(null, false);
								}
							} else {
								return done(null, false);
							}
						});
					} else {
						return done(null, false);
					}
				} else {
					return done(null, false);
				}
			});
		})
	)
}

module.exports.libs = libs;