module.exports = function(AppRoute){
	var walletrService = require('../../services/wallet');

	AppRoute.post('/data/wallet/save', function(req, res) {
        walletrService.save(req,res);
	});

	AppRoute.get('/data/wallet/history', function(req, res) {
		var id = req.query.id;
		var start = req.query.start;
		var end = req.query.end;
		if ( id ) {
			walletrService.transactions(req,id, start, end,res);
		} else {
			res.json({ 'total' : 0, rows: [] });
		}
	});
};