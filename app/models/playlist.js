// Pulls Mongoose dependency for creating schemas
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Playlist Schema for storing tracks
var PlaylistSchema = new Schema({
	id: {type: String, required: true, unique: true}, // Spotify id for playlist
	teamname: {type: String, required: true},
	date: {type: Date, required: true},
	theme: {type: String},
	tracks: [{
		id: {type: String, required: true, unique: true}, // Spotify id for track
		name: {type: String, required: true},
		artists: {type: [String], required: true},
		album: {type: String, required: true},
		added_by: {type: String, required: true}, // Username
		points: {type: Number, default: 0}
	}]
});

// Exports the PlaylistSchema for use elsewhere. Sets the MongoDB collection to be used as: "playlists" (collections will auto pluralize)
module.exports = mongoose.model('playlist', PlaylistSchema);
