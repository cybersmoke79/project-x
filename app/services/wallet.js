module.exports = {

	list : function(req, callback) {
		var user = req.user;
		rest.oauth_request_get("/api/me/wallets", 
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
		var phone = req.body.phone;
		var operator = req.body.operator;
		rest.oauth_request_post("/api/wallet/save", {
			phone : phone,
			userId : user.id,
			operatorId : operator
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

	transactions : function(req, id, start, end, res) {
		var page = 0,
			user = req.user;
		if (typeof req.query.offset != 'undefined') {
			var offset = req.query.offset;
			if (offset == 0) {
				page = 0;
			} else {
				page = (offset / 10);
			}
		}
		rest.oauth_request_get("/api/wallet/history?id="+id+"&start="+start+"&end="+end+"&page=" + page, 
			user.access_token,function(status,message){
			if ( status ) {
				res.json(message);
			} else {
				res.json({ 'total' : 0, rows: [] });
			}
		});
	}
};