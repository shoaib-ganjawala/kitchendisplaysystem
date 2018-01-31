/**
 * Created by shoaib-ganjawala on 18/1/18.
 */

'use strict';

var decode = require('./oauthModel').getAccessToken;
var _ = require('lodash');
// var db = require('../db');
// var model = require('./model');

function authenticate(req, res, next) {
	var token = req.headers['authorization'];
	
	if(token && _.startsWith(token,'Bearer ')){
		decode(token.substring(7), function (err, data) {
			console.log('fffffffffff >>>>>>>>>>>> ', err, data)
			if(err){
				next(err);
				return;
			}
			req.user = data.user;
			next();
			// next.bind(this, data);
			// db['users'].findOne({_id: db.ObjectID(data.user._id)}, function(e,u) {
			// 	if(e){
			// 		return;
			// 	}
			// 	if(u) {
			// 		if(u.usersUUID == data.user.usersUUID) {
			// 			if(!u.isConCurrentUserActive){
			// 				db.users.update({_id: u._id}, {$set: {isConCurrentUserActive: true}});
			// 			}
			// 			req.user = data.user;
			// 			next();
			// 		} else {
			// 			res.status(403).json({code: 403.1, message: 'Oops! Yours session has been forcefully logged out.'});
			// 			next();
			// 		}
			// 	}
			// });
		});
	}
	else {
		res.status(401).json({message: 'Need to pass bearer token authorization header'});
	}
}

module.exports = {
	authenticate: authenticate
};

// function authorize(entityType, access, req, res, next) {
//
// 	//by surjeet.b@productivet.com
// 	//variable allowLimitedAccess is used to allow default permission to all user so that they can update profile, change password etc..
// 	var allowLimitedAccess = false;
// 	if((!_.isUndefined(req.body.securityQuestion) && !_.isUndefined(req.body.securityAnswer)) ||
// 		(!_.isUndefined(req.body.password) && !_.isUndefined(req.body.newPassword)) ||
// 		(!_.isUndefined(req.body.passwordForverificationCode) && !_.isUndefined(req.body.verificationCode)) ||
// 		((!_.isUndefined(req.body.firstname) && !_.isUndefined(req.body.lastname)) || ((!_.isUndefined(req.body.firstname) && !_.isUndefined(req.body.lastname) && !_.isUndefined(req.body.email) && !_.isUndefined(req.body.newEmail))))
// 		&& _.isUndefined(req.body.roles)){
// 		allowLimitedAccess = true;
// 	}
//
// 	if(req.user){
//
// 		var allowed = _.filter(req.user.permissions,function (permission) {
// 			return _.filter(permission, function (m, p) {
// 					return p === entityType && m[access] === '1';
// 				}).length > 0;
// 			//return permission.entity === entityType && permission[access];
// 		}).length;
//
// 		db['users'].findOne({_id: db.ObjectID(req.user._id)}, function(e,u) {
// 			if(e){ return; }
// 			if(u){
// 				if(!u.isConCurrentUserAdmin && !u.isConCurrentUserActive){
// 					res.status(403).json({code: 403.1, message: 'Oops! Yours session has been forcefully logged out.'});
// 				} else {
// 					if(allowed || allowLimitedAccess){
// 						next();
// 					} else {
// 						res.status(403).json({message: 'You are not authorized to access this resource'});
// 					}
// 				}
// 			}
// 		})
// 	} else {
// 		res.status(403).json({message: 'You are not authorized to access this resource'});
// 	}
// }

// module.exports = function (entityType) {
// 	return (function (entityType, access) {
// 		if(access === 'anonymous'){
// 			return function (req, res, next) {
// 				req.user = {
// 					_id: '000000000000000000000000',
// 					title: 'Anonymous'
// 				}
// 				next();
// 			}
// 		}
// 		function accessCode(access) {
// 			switch (access) {
// 				case 'view':
// 					return 0;
// 				case 'edit':
// 					return 1;
// 				case 'create':
// 					return 2;
// 				case 'editSchema':
// 					return 3;
// 				case 'review':
// 					return 4;
// 				default:
// 					return -1;
// 			}
// 		}
// 		return [authenticate,authorize.bind(authorize, entityType, accessCode(access))];
// 	}).bind(this,entityType);
// }

