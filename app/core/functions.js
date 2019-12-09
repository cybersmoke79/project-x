var rest = require('./rest');

module.exports = function(app) {
	//Set rest as global
	global.rest = rest;


	/**
	 * If is super admin
	 */
	global.is_super_admin = function(req){
		if (req.isAuthenticated()){
			var user = req.user;
			return (user.role == 'SUPERADMIN' && user.active);
		}
		return false;
	}

	global.is_admin = function(req){
		if (req.isAuthenticated()){
			var user = req.user;
			return (user.role == 'ADMIN' && user.active);
		}
		return false;
	}
}