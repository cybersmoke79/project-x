module.exports = {

	list : function(req, callback) {
		var user = req.user;
		rest.oauth_request_get("/api/providers/list", 
			user.access_token,function(status,message){
			if ( status ) {
				callback(message);
			} else {
				callback({});
			}
		});
	}
};