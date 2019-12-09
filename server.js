var express = require('express');
var app = express();

//Bootstrap the App
require('./app/bootstrap')(app, __dirname, express);

var server = app.listen(app.get('port'), function() {
    console.log('Magic happens on port ' + server.address().port);
});