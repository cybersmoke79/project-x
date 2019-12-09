/**
 * HTTP Helper
 */

var request = require('request');
var superagent = require("superagent");
var api = require('../config/api');

module.exports = {

	api : api,

    /**
     * Oauth Login
     */
    oauth_login : function(username, password, callback){
        var client_credentials = api.rest.client+":"+api.rest.secret;
        request.post({
            url: 'http://' + client_credentials + '@'+api.rest.simple_url+'/oauth/token',
            form: {
                grant_type: 'password',
                username: username,
                password: password,
                client_id: api.rest.client,
                client_secret: api.rest.secret,
                scope : 'read write'
            }
        },function(err, res, body) {
            if(err){
                callback(false,err);
            }else{
                callback(true,body);
            }
        });
    },

    /**
     * Oauth request GET
     */
    oauth_request_get : function(path, access_token, callback){
        superagent
		    .get(api.rest.url+path)
		    .set('Authorization', 'Bearer ' + access_token)
		    .end(function(err, body){
                if(err){
                    callback(false,err);
                }else{
                    callback(true,body.body);
                }
            });
    },


    oauth_request_get_text : function(path, access_token, callback){
        superagent
		    .get(api.rest.url+path)
		    .set('Authorization', 'Bearer ' + access_token)
		    .end(function(err, body){
                if(err){
                    callback(false,err);
                }else{
                    callback(true,body.text);
                }
            });
    },


    /**
     * Oauth Post
     */
    oauth_request_post : function(path, params, access_token, callback){
        superagent
		    .post(api.rest.url+path)
            .query(params)
            .set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
		    .set('Authorization', 'Bearer ' + access_token)
		    .end(function(err, body){
                if(err){
                    callback(false,err);
                }else{
                    callback(true,body.body);
                }
            });
    },

    /**
     * request GET
     */
    request_get : function(path, callback){
        superagent
		    .get(api.rest.url+path)
		    .end(function(err, body){
                if(err){
                    callback(false,err);
                }else{
                    callback(true,body.body);
                }
            });
    },


    /**
     * Post
     */
    request_post : function(path, params, callback){
        superagent
		    .post(api.rest.url+path)
            .query(params)
            .set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
		    .end(function(err, body){
                if(err){
                    callback(false,err);
                }else{
                    callback(true,body.body);
                }
            });
	},
	
	/**
     * Oauth Post
     */
    oauth_request_upload_post : function(path, params, access_token, callback){
        superagent
		    .post(api.rest.url+path)
            .query(params)
            .set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
		    .set('Authorization', 'Bearer ' + access_token)
		    .end(function(err, body){
                if(err){
                    callback(false,err);
                }else{
                    callback(true,body.body);
                }
            });
    },
};