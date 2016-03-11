// Pulls Mongoose dependency for creating schemas
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Playlist Schema for storing tracks
var PlaylistSchema = new Schema({
	teamname: {type: String, required: true},
	date: {type: Date, required: true},
	theme: {type: String},
	tracks: [{
		id: {type: String, required: true}, // Spotify id for track
		name: {type: String, required: true},
		artists: {type: [String], required: true},
		album: {type: String, required: true},
		cover_url: {type: String}, 
		added_by: {type: String, required: true}, // Username
		voted_by: [{
			username: {type: String},
			points: {type: Number}
		}]
	}]
});

// Get current date before save
PlaylistSchema.pre('save', function (next) {
	var playlist = this;
	// Make sure date is stored without time
	playlist.date = new Date(new Date().setHours(0, 0, 0, 0)); 
	next();
});

// Exports the PlaylistSchema for use elsewhere. Sets the MongoDB collection to be used as: "playlists" (collections will auto pluralize)
module.exports = mongoose.model('playlist', PlaylistSchema);
