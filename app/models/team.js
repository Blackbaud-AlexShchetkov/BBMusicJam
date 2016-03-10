// Pulls Mongoose dependency for creating schemas
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
	teamname: { type: String, trim: true, required: true, index: { unique: true } },
	members: { type: [String] } // usernames
});

module.exports = mongoose.model('team', TeamSchema);
