module.exports = {
	

	/**
     * Handle logout action then redirect
     */
	logout: function (req, res) {
		if (req.isAuthenticated()) {
			var user = req.user;
			rest.oauth_request_get('/logout', user.access_token, function (status, response) {
				req.logout();
				res.redirect('/');
			});
		} else {
			res.redirect('/');
		}
	},

	reset : {
		request : function (req, res) {
			var username = req.body.username;
			rest.request_post('/access/reset/request', { username : username}, function (status, response) {
				if (status) {
					res.json({ status : ( response.status == 'success' ), message: response.message });
				} else {
					res.json({ status : false, message: 'An error occured' });
				}
			});
		},

		process : function (req, res) {
			var token = req.body.token;
			var password = req.body.password;
			rest.request_post('/access/reset/process', { token : token, password : password }, function (status, response) {
				if (status) {
					res.json({ status : ( response.status == 'success' ), message: response.message });
				} else {
					res.json({ status : false, message: 'An error occured' });
				}
			});
		}
	},

	/**
	 * Account register
	 */
	register : function( req, res ) {
		var username = req.body.username;
		var name = req.body.name;
		var email = req.body.email;
		var password = req.body.password;
		rest.request_post('/access/register', { username : username, name: name, email : email, password : password}, function (status, response) {
			if (status) {
				res.json({ status : ( response.status == 'success' ), message: response.message });
			} else {
				res.json({ status : false, message: 'An error occured' });
			}
		});
	}
	
}