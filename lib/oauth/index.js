/**
 * Created by shoaib-ganjawala on 18/1/18.
 */

'user strict';

var oauthserver = require('oauth2-server');
var model =require('./oauthModel');
var oauth = oauthserver({
	model: model,
	grants: ['password', 'refresh_token'],
	debug: true,
	accessTokenLifetime: model.JWT_ACCESS_TOKEN_EXPIRY_SECONDS,   // expiry time in seconds, consistent with JWT setting in model.js
	refreshTokenLifetime: model.JWT_REFRESH_TOKEN_EXPIRY_SECONDS   // expiry time in seconds, consistent with JWT setting in model.js
});

function configure (app) {
	
	app.all('/oauth/token', oauth.grant());
	
	app.get('/oauth/me', oauth.authorise(), function (req, res) {
		res.json(req.user);
	});
	
	return {
		registerErrorHandler: function () {
			app.use(oauth.errorHandler());
		}
	};
}

module.exports = {
	configure: configure
};

