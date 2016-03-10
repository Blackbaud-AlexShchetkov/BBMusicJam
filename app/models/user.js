// Pulls Mongoose dependency for creating schemas
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require(bcrypt);
var SALT_WORK_FACTOR = 10;

// User Schema for storing users
var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },
    password: { type: String, required: true }
});

// Hash password before save
UserSchema.pre('save', function (next) {
	// only hash the password if it has been modified (or is new)
	if (!this.isModified('password')) {
		return next();
	}

	// TODO password requirements

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(saltErr, salt) {
	    if (saltErr) {
	    	return next(saltErr);
	    }

	    // hash the password along with our new salt
	    bcrypt.hash(user.password, salt, function(hashErr, hash) {
	        if (hashErr) {
	        	return next(hashErr);
	        }

	        // override the cleartext password with the hashed one
	        this.password = hash;
	        next();
    	});
    });
});

// To compare passwords
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
        	return cb(err);
        }
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('user', UserSchema);
