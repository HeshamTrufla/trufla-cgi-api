/**
 * ApiToken.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var schema = new mongoose.Schema({
	token: {
		type: String,
		maxlength: 512,
		unique: true
	},
	name: {
		type: String
	},
	revoked: {
		type: Boolean,
		default: false
	},
	category: {
		type: String,
		required: true,
		enum: ['Public', 'Private']
	}/*,
	publicUser: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}*/
}, {
	timestamps: true
});

schema.plugin(uniqueValidator);
exports.schema = schema;