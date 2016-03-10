// Pulls Mongoose dependency for creating schemas
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

// User Schema for storing users
var UserSchema = new Schema({
    username: { type: String, lowercase: true, trim: true, required: true, index: { unique: true } },
    name: { type: String, required: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0, required: true }
});

// Password requirements
function passwordIsValid(password) {
	if (!password || typeof password !== 'string') {
		return false;
	}

	return password.length > 7;
}

// Hash password before save
UserSchema.pre('save', function (next) {
	// only hash the password if it has been modified (or is new)
	if (!this.isModified('password')) {
		return next();
	}

	// TODO stricter password requirements
	if (!passwordIsValid(this.password)) {
		next(new Error("Password must be at least 8 characters long"));
	}

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(saltErr, salt) {
	    if (saltErr) {
	    	return next(saltErr);
	    }

	    // hash the password along with our new salt
	    bcrypt.hash(this.password, salt, null, function(hashErr, hash) {
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
