module.exports = {

	list : function(req, callback) {
		var user = req.user;
		rest.oauth_request_get("/api/me/apikeys", 
			user.access_token,function(status,message){
			if ( status ) {
				callback(message);
			} else {
				callback({});
			}
		});
	},

	save : function(req, res) {
		var user = req.user;
		rest.oauth_request_post("/api/me/apikeys/create", {}, 
			user.access_token,function(status,message){
			if (status) {
				res.json({
					status : ( message.status == 'success' ),
					message : message.message,
					reload : true
				});
			} else {
				res.json({ status : false, message: 'An error occured' });
			}
		});
	},

	delete : function(req, res) {
		var user = req.user;
		var id = req.body.id;
		rest.oauth_request_post("/api/me/apikeys/delete", {
			id : id
		}, user.access_token,function(status,message){
			if (status) {
				res.json({
					status : ( message.status == 'success' ),
					message : message.message,
					reload : true
				});
			} else {
				res.json({ status : false, message: 'An error occured' });
			}
		});
	},
};