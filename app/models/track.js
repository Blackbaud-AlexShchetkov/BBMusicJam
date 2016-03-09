// Pulls Mongoose dependency for creating schemas
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Track Schema for storing tracks
var TrackSchema = new Schema({
	id: {type: String, required: true, unique: true}, // Spotify id for track
	name: {type: String, required: true},
	artists: {type: [String], required: true},
	album: {type: String, required: true},
	date_added: {type: Date, default: Date.now, required: true},
	username: {type: String, required: true} // From users collection
});

// Sets the date_added parameter equal to the current time
// TrackSchema.pre('save', function(next){
// 	now = new Date();
// 	this.date_added = now;
// 	if(!this.date_added) {
// 		this.date_added = now;
// 	}
// 	next();
// });

// Exports the TrackSchema for use elsewhere. Sets the MongoDB collection to be used as: "tracks" (collections will auto pluralize)
module.exports = mongoose.model('track', TrackSchema);
