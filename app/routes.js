// Dependencies
var mongoose = require('mongoose');
var Track = require('./models/track.js');
var request = require('request');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '8b3dbfcbe13f4a649e60157f2be240df';
var client_secret = '0868f8488da34eff83f1183b0889fd76';

// Opens App Routes
module.exports = function(app) {

	// GET Routes
	// --------------------------------------------------------
	// Retrieve records for all tracks in the db
	app.get('/tracks', function(req, res){

		// Uses Mongoose schema to run the search (empty conditions)
		var query = Track.find({});
		query.exec(function(err, tracks){
			if(err)
				res.send(err);

			// If no errors are found, it responds with a JSON of all tracks
			res.json(tracks);
		});
	});

	// POST Routes
	// --------------------------------------------------------
	// Provides method for saving new tracks in the db
	app.post('/tracks', function(req, res){

		// Creates a new Track based on the Mongoose schema and the post body
		var newtrack = new Track(req.body);

		// New Track is saved in the db
		newtrack.save(function(err){
			if(err)
				res.send(err);

			// If no errors are found, it responds with a JSON of the new track
			res.json(req.body);
		});
	});
};