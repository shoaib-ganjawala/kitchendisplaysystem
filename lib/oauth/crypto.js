/**
 * Created by shoaib-ganjawala on 18/1/18.
 */

'use strict';

//Ref: http://lollyrock.com/articles/nodejs-encryption/
var crypto = require('crypto'),
	algorithm = 'aes-256-ctr',
	salt = 'd6F3Efeq';

exports.encrypt = function(text) {
	var cipher = crypto.createCipher(algorithm, salt);
	var crypted = cipher.update(text, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
};

exports.decrypt = function(text){
	var decipher = crypto.createDecipher(algorithm, salt);
	var dec = decipher.update(text, 'hex', 'utf8');
	dec += decipher.final('utf8');
	return dec;
};
