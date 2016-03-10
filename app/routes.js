// Dependencies
var mongoose = require('mongoose');
var Track = require('./models/track.js');
var Playlist = require('./models/playlist.js');
var User = require('./models/user.js');
var request = require('request');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '8b3dbfcbe13f4a649e60157f2be240df';
var client_secret = '0868f8488da34eff83f1183b0889fd76';

// Opens App Routes
module.exports = function(app) {

	function objectIsEmpty(obj) {
	    for(var prop in obj) {
	        if(obj.hasOwnProperty(prop)) {
	            return false;
	        }
	    }

    	return true && JSON.stringify(obj) === JSON.stringify({});
	}

	// GET Routes
	// --------------------------------------------------------
	// Retrieve playlist for team based on date
	app.get('/playlist', function(req, res) {
		var query = Playlist.findOne({ teamname: req.query.teamname, date: req.query.date });
		query.exec(function(err, playlist) {
			if (err) {
				res.send(err);
			}

			// If no errors are found, it responds with a JSON of the playlist
			res.json(playlist);
		})
	});

	// Get history of playlists for team
	app.get('/teamHistory', function(req, res) {
		var reqObj = req.query;
		var conditions = {
			teamname: reqObj.teamname
		};
		var dateConditions = {};
		if (reqObj.beginDate) {
			dateConditions.$gte = reqObj.beginDate;
		}
		if (reqObj.endDate) {
			dateConditions.$lte = reqObj.endDate;
		}
		if (!objectIsEmpty(dateConditions)) {
			condtions.date = dateConditions;
		}

		var query = Playlist.find(conditions);
		query.exec(function(err, playlists) {
			if (err) {
				res.send(err);
			}

			res.json(playlists);
		});
	});

	// Login user
	app.get('/loginUser', function(req, res) {
		var query = User.findOne({ username: req.query.username });
		query.exec(function(err, user) {
			if (err) {
				res.send(err);
				return;
			}
			if (!user) {
				res.send(false);
				return;
			}
			// Compare password to hash
			user.comparePassword(req.body.password, function(err, isMatch) {
				if (err) {
					res.send(err);
				}

				res.send(isMatch);
			});
		});
	});

	// POST Routes
	// --------------------------------------------------------
	// Provides method for saving new playlists in the db
	app.post('/createPlaylist', function(req, res) {

		// Creates a new Playlist based on the Mongoose schema and the post body
		var newplaylist = new Playlist(req.body);

		// New Playlist is saved in the db
		newplaylist.save(function(err) {
			if (err) {
				res.send(err);
			}

			// If no errors are found, it responds with a JSON of the new playlist
			res.json(req.body);
		});
	});

	// Add track to playlist
	app.post('/addTrackToPlaylist', function(req, res) {
		var conditions = { id: req.body.playlistId };
		var options = { new: true };
		Playlist.findOneAndUpdate(conditions, { $push: { tracks: req.body.track } }, options, function (err, playlist) {
			if (err) {
				res.send(err);
			}

			res.json(playlist);
		});
	});

	// Register user
	app.post('/registerUser', function(req, res) {

		var newuser = new User(req.body);
		newuser.save(function(err) {
			if (err) {
				res.send(err);
			}

			res.json({ username: req.body.username, name: req.body.name });
		});
	});
};
