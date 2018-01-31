/**
 * Created by shoaib-ganjawala on 18/1/18.
 */

'use strict';

const EmailTemplate = require('email-templates').EmailTemplate;
// const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');
const serverConfig = require('../../config/serverConfig');
const path = require('path');
var nodemailer = require('nodemailer');
var pepipostTransport = require('nodemailer-pepipost-transport');

function render(template, model, cb) {
	new EmailTemplate(path.join(__dirname, 'templates', template)).render(model, function (err, results) {
		if (cb) {
			if (err) {
				console.log('Failed rendering templates');
				console.log(err);
			}
			cb(err, results)
		}
	});
}

function sendmail(to, content, fileAttachments, cb) {
	const transporter = nodemailer.createTransport(pepipostTransport({
		auth: {
			api_key: serverConfig.SENDGRID_PASSWORD
		}
	}));
	
	const mail = {
		from: 'Name <shoaib.ganja@yopmail.com>',
		to: ['shoaib.ganja@gmail.com'],
		subject: 'Test Emailer',
		html: '<p> hi, this is a test email sent via Pepipost JSON API.</p>',
	};
	transporter.sendMail(mail, function (err, info) {
		if (err) {
			console.log(err);
		}
		console.log(info);
		if (cb) {
			cb(err, info)
		}
	});
	// nodemailer.createTransport(sendgridTransport({
	// 	auth: {
	// 		api_key: serverConfig.SENDGRID_PASSWORD
	// 	}
	// })).sendMail({
	// 	from: serverConfig.MAIL_FROM_ADDRESS,
	// 	to: to,
	// 	subject: content.text,
	// 	html: content.html,
	// 	attachments: fileAttachments,
	// 	priority: 'high'
	// }, function sendMailCallback(err, d) {
	// 	if (err) {
	// 		console.log('Failed sending email to: ' + to);
	// 		console.log(err);
	// 	}
	// 	if (cb) {
	// 		cb(err, d)
	// 	}
	// });
}

function send(template, model, to, cb) {
	render(template, {model: model}, function (e, templates) {
		if (!!model.fileInfo) {
			if (model.fileInfo.length > 0) {
				var fileAttachments = model.fileInfo;
			} else {
				var fileAttachments = [];
			}
		}
		sendmail(to, templates, fileAttachments, cb);
	});
}

module.exports = {
	send: send
};